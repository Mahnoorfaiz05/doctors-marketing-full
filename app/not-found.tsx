export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center bg-soft-blue px-5 text-center text-navy"><span className="font-display text-3xl italic text-brand">404</span><h1 className="my-5 text-[clamp(3rem,6vw,5.5rem)] leading-none font-extrabold tracking-[-.045em]">This page needs a better handoff.</h1><p className="text-muted">The requested route may have moved or is not yet published.</p><a className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-5 text-sm font-extrabold text-white hover:bg-brand-dark" href="/">Return home</a></main>;
}

