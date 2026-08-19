export type AnalyticsEvent =
  | { name: "cta_selected"; label: string; location: string }
  | { name: "form_started"; form: "contact" | "audit" | "calculator" }
  | { name: "assistant_opened" }
  | { name: "search_submitted"; query: string };

export function track(event: AnalyticsEvent) {
  if (typeof window === "undefined" || window.localStorage.getItem("dma-cookie-choice") !== "all") return;
  window.dispatchEvent(new CustomEvent("dma:analytics", { detail: event }));
}

