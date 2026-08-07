import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) }, IMAGES: { input: () => ({ transform: () => ({ output: async () => ({ response: () => new Response("", { status: 404 }) }) }) }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("renders the finished homepage with brand, primary CTA and integrity placeholders", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Doctors Marketing Agency/i);
  assert.match(html, /Become the first choice/i);
  assert.match(html, /Book a free strategy call/i);
  assert.match(html, /VERIFIED TESTIMONIAL REQUIRED/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("renders service and calculator routes", async () => {
  const [serviceResponse, calculatorResponse] = await Promise.all([render("/services/medical-seo"), render("/roi-calculator")]);
  assert.equal(serviceResponse.status, 200);
  assert.equal(calculatorResponse.status, 200);
  assert.match(await serviceResponse.text(), /Medical SEO/i);
  assert.match(await calculatorResponse.text(), /Calculate your growth potential/i);
});

