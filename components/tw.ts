export const tw = {
  container: "mx-auto w-[min(1240px,calc(100%-6rem))] max-[820px]:w-[calc(100%-2.5rem)] max-[540px]:w-[calc(100%-2rem)]",
  section: "py-28 max-[820px]:py-20 max-[540px]:py-16",
  eyebrow: "inline-flex w-fit items-center rounded-full border border-line/80 bg-white/85 px-3.5 py-2 text-[0.72rem] font-extrabold tracking-wide",
  eyebrowDark: "inline-flex w-fit items-center rounded-full border border-white/15 bg-white/10 px-3.5 py-2 text-[0.72rem] font-extrabold tracking-wide text-blue-100",
  h1: "text-[clamp(3rem,5.8vw,5.8rem)] leading-[1.03] font-extrabold",
  h2: "text-[clamp(2.25rem,4.2vw,4.35rem)] leading-[1.06] font-extrabold",
  h3: "text-xl leading-tight font-extrabold",
  display: "font-display font-normal italic text-brand",
  muted: "text-muted",
  button: "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-transparent px-5 text-sm font-extrabold transition hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60",
  primary: "bg-brand text-white shadow-[0_8px_20px_rgba(13,115,246,.2)] hover:bg-brand-dark",
  secondary: "bg-accent text-white shadow-[0_8px_20px_rgba(255,138,61,.18)] hover:bg-accent-dark",
  ghost: "border-line bg-white text-navy hover:border-brand/40",
  dark: "bg-deep text-white hover:bg-navy",
  light: "bg-white text-deep hover:bg-blue-50",
  textLink: "inline-flex items-center gap-1.5 text-sm font-extrabold text-brand hover:text-brand-dark",
  icon: "inline-grid size-12 shrink-0 place-items-center rounded-2xl bg-soft-blue text-brand",
  panel: "rounded-[1.75rem] border border-line bg-white shadow-card",
  field: "min-h-12 w-full rounded-xl border border-line bg-white px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-brand focus:ring-3 focus:ring-brand/10",
};

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
