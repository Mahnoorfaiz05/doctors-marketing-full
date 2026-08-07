/** Cloudflare Worker entry point for the Vinext application. */
import {
  handleImageOptimization,
  DEFAULT_DEVICE_SIZES,
  DEFAULT_IMAGE_SIZES,
} from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface ImageBinding {
  input(stream: ReadableStream): {
    transform(options: Record<string, unknown>): {
      output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
    };
  };
}

interface Env {
  ASSETS?: Fetcher;
  DB?: D1Database;
  IMAGES?: ImageBinding;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

function localImageFallback(request: Request, url: URL) {
  const source = url.searchParams.get("url");
  if (!source || !source.startsWith("/") || source.startsWith("//")) {
    return new Response("Invalid local image URL", { status: 400 });
  }

  // Vite serves public/ files directly in development. Fetching the original
  // path avoids calling Cloudflare bindings that only exist after deployment.
  return fetch(new Request(new URL(source, request.url), request));
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/_vinext/image") {
      if (!env.ASSETS || !env.IMAGES) {
        return localImageFallback(request, url);
      }

      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(
        request,
        {
          fetchAsset: (path) => env.ASSETS!.fetch(new Request(new URL(path, request.url))),
          transformImage: async (body, { width, format, quality }) => {
            const result = await env.IMAGES!
              .input(body)
              .transform(width > 0 ? { width } : {})
              .output({ format, quality });
            return result.response();
          },
        },
        allowedWidths,
      );
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
