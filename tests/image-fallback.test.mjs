import assert from "node:assert/strict";
import test from "node:test";

test("serves the original local image when Cloudflare image bindings are absent", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("image-fallback-test", String(Date.now()));
  const { default: worker } = await import(workerUrl.href);
  const originalFetch = globalThis.fetch;
  let requestedUrl = "";

  globalThis.fetch = async (request) => {
    requestedUrl = typeof request === "string" ? request : request.url;
    return new Response(new Uint8Array([137, 80, 78, 71]), {
      status: 200,
      headers: { "content-type": "image/png" },
    });
  };

  try {
    const response = await worker.fetch(
      new Request("http://localhost/_vinext/image?url=%2Fimages%2Fdoctor-hero.png&w=640&q=75"),
      {},
      { waitUntil() {}, passThroughOnException() {} },
    );

    assert.equal(response.status, 200);
    assert.equal(response.headers.get("content-type"), "image/png");
    assert.equal(requestedUrl, "http://localhost/images/doctor-hero.png");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

