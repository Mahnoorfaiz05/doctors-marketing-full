export type ApiError = { code: string; message: string; status: number; requestId?: string };
export type ApiResult<T> = { ok: true; data: T; requestId?: string } | { ok: false; error: ApiError };
export type RequestOptions<TBody> = { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: TBody; signal?: AbortSignal; token?: string; timeoutMs?: number; query?: Record<string, string | number | boolean | undefined> };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export async function apiRequest<TResponse, TBody = never>(path: string, options: RequestOptions<TBody> = {}): Promise<ApiResult<TResponse>> {
  if (!API_BASE) return { ok: false, error: { code: "ADAPTER_NOT_CONNECTED", message: "This frontend adapter is not connected yet.", status: 503 } };
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), options.timeoutMs ?? 12000);
  const query = new URLSearchParams();
  Object.entries(options.query || {}).forEach(([key, value]) => value !== undefined && query.set(key, String(value)));
  try {
    const response = await fetch(`${API_BASE}${path}${query.size ? `?${query}` : ""}`, {
      method: options.method || "GET",
      headers: { "Content-Type": "application/json", ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}) },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: options.signal || controller.signal,
    });
    const requestId = response.headers.get("x-request-id") || undefined;
    if (!response.ok) return { ok: false, error: { code: "REQUEST_FAILED", message: "The request could not be completed.", status: response.status, requestId } };
    return { ok: true, data: await response.json() as TResponse, requestId };
  } catch (error) {
    return { ok: false, error: { code: error instanceof DOMException && error.name === "AbortError" ? "TIMEOUT" : "NETWORK_ERROR", message: "The service is temporarily unavailable.", status: 0 } };
  } finally { window.clearTimeout(timeout); }
}

export type LeadPayload = { name: string; email: string; phone?: string; organization?: string; message?: string; source: "contact" | "audit" | "calculator" | "assistant" };
export type LeadResponse = { id: string; status: "received" | "qualified" };
export const leadApi = { create: (payload: LeadPayload, signal?: AbortSignal) => apiRequest<LeadResponse, LeadPayload>("/leads", { method: "POST", body: payload, signal }) };

