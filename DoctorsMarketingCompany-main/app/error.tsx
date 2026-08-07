"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-soft-blue px-5 text-center text-navy"><span className="font-display text-3xl italic text-brand">Something changed</span><h1 className="my-5 text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-.045em]">We couldn’t load this view.</h1><p className="text-muted">Try the request again. If the problem continues, return to the main site.</p><button className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-extrabold text-white hover:bg-brand-dark" onClick={reset}>Try again</button></main>;
}
