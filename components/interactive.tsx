"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  ArrowRight,
  Calculator,
  Check,
  ChevronDown,
  CircleHelp,
  LoaderCircle,
  Mail,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { audiences, services, specialties, specialtySlug } from "@/lib/content";
import { cn, tw } from "./tw";

export function AudienceSwitcher() {
  const [active, setActive] = useState(0);
  const selected = audiences[active];
  const Icon = selected.icon;

  return (
    <div className="overflow-hidden rounded-3xl border border-line bg-white">
      <div className="grid grid-cols-3 border-b border-line bg-slate-50 max-[620px]:grid-cols-1" role="tablist" aria-label="Audience solutions">
        {audiences.map((audience, index) => (
          <button
            key={audience.title}
            role="tab"
            aria-selected={active === index}
            className={cn("border-b-3 border-transparent px-5 py-5 text-sm font-extrabold transition hover:text-brand", active === index && "border-brand bg-white text-brand")}
            onClick={() => setActive(index)}
          >
            {audience.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-5 p-8 max-[700px]:grid-cols-[auto_1fr] max-[540px]:grid-cols-1" role="tabpanel">
        <span className={tw.icon}><Icon size={24} /></span>
        <div><h3 className={tw.h3}>{selected.title}</h3><p className="mt-2 text-muted">{selected.copy}</p></div>
        <a className={cn(tw.textLink, "max-[700px]:col-start-2 max-[540px]:col-start-auto")} href="/free-audit">Request a tailored audit <ArrowRight size={16} /></a>
      </div>
    </div>
  );
}

export function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!data.get("name") || !String(data.get("email")).includes("@")) {
      setError("Please add your name and a valid business email.");
      return;
    }
    setError("");
    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 650);
  }

  if (status === "sent") {
    return (
      <div className={cn(tw.panel, "flex min-h-80 flex-col items-start justify-center p-10")} role="status">
        <span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={24} /></span>
        <h3 className="mt-6 text-2xl font-extrabold">Your request is ready for delivery.</h3>
        <p className="mt-3 text-muted">This preview does not send data yet. Connect the contact endpoint before launch.</p>
        <button className={cn(tw.button, tw.ghost, "mt-5")} onClick={() => setStatus("idle")}>Send another request</button>
      </div>
    );
  }

  return (
    <form className="rounded-3xl bg-white/95 p-8 shadow-card max-[540px]:p-5" onSubmit={submit} noValidate>
      <div className="grid grid-cols-2 gap-3.5 max-[560px]:grid-cols-1">
        <FormField label="Full name"><input className={tw.field} name="name" autoComplete="name" placeholder="Your full name" /></FormField>
        <FormField label="Business email"><input className={tw.field} name="email" type="email" autoComplete="email" placeholder="you@practice.com" /></FormField>
        <FormField label="Phone"><input className={tw.field} name="phone" type="tel" autoComplete="tel" placeholder="International number" /></FormField>
        <FormField label="Organization"><input className={tw.field} name="organization" autoComplete="organization" placeholder="Clinic or company" /></FormField>
      </div>
      {!compact && <FormField label="What would you like to improve?"><textarea className={tw.field} name="message" rows={4} placeholder="Tell us about your goals, locations and current challenges." /></FormField>}
      {error && <p className="mb-3 text-xs font-semibold text-red-700" role="alert">{error}</p>}
      <button className={cn(tw.button, tw.primary)} type="submit" disabled={status === "sending"}>
        {status === "sending" ? <LoaderCircle className="animate-spin" size={17} /> : <Send size={17} />}
        {status === "sending" ? "Preparing…" : "Request a strategy call"}
      </button>
      <p className="mt-3 text-xs text-muted">Business information only. Please do not include patient or medical data.</p>
    </form>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="mb-3.5 grid gap-1.5"><span className="text-xs font-extrabold">{label}</span>{children}</label>;
}

export function RoiCalculator({ full = false }: { full?: boolean }) {
  const [spend, setSpend] = useState(3000);
  const [leads, setLeads] = useState(60);
  const [conversion, setConversion] = useState(18);
  const [value, setValue] = useState(450);
  const result = useMemo(() => {
    const appointments = leads * (conversion / 100);
    const revenue = appointments * value;
    const low = Math.max(0, Math.round((revenue - spend) * 0.75));
    const high = Math.max(low, Math.round((revenue - spend) * 1.25));
    return { appointments: Math.round(appointments), low, high };
  }, [spend, leads, conversion, value]);

  return (
    <div className={cn(tw.panel, "grid grid-cols-[1.15fr_.85fr] gap-5 p-5 max-[820px]:grid-cols-1", full && "grid-cols-2 max-[980px]:grid-cols-1")}>
      <div className="grid content-center gap-7 p-6">
        <Range label="Monthly marketing spend" value={`$${spend.toLocaleString()}`} min={500} max={20000} step={500} current={spend} onChange={setSpend} />
        <Range label="Monthly qualified inquiries" value={String(leads)} min={5} max={300} step={5} current={leads} onChange={setLeads} />
        {full && <>
          <Range label="Inquiry-to-appointment rate" value={`${conversion}%`} min={5} max={60} step={1} current={conversion} onChange={setConversion} />
          <Range label="Average first-year patient value" value={`$${value}`} min={100} max={5000} step={50} current={value} onChange={setValue} />
        </>}
      </div>
      <div className="flex flex-col items-start justify-center rounded-2xl bg-deep p-9 text-white">
        <span className={tw.icon}><Calculator size={24} /></span>
        <p className="mt-5 mb-1 text-sm text-slate-300">Illustrative monthly contribution range</p>
        <h3 className="text-3xl font-extrabold">${result.low.toLocaleString()} – ${result.high.toLocaleString()}</h3>
        <span className="mt-2 text-xs text-slate-400">Based on roughly {result.appointments} appointments from the inputs shown.</span>
        <a className={cn(tw.button, tw.light, "mt-6")} href="/contact">Discuss the assumptions <ArrowRight size={16} /></a>
      </div>
      <p className="col-span-full px-2 text-xs text-muted">Planning estimate only—not a forecast or guarantee. Results vary by market, capacity, service mix and execution.</p>
    </div>
  );
}

function Range({ label, value, min, max, step, current, onChange }: { label: string; value: string; min: number; max: number; step: number; current: number; onChange: (value: number) => void }) {
  return <label className="grid grid-cols-[1fr_auto] gap-3 text-sm font-bold"><span>{label}</span><strong className="text-brand">{value}</strong><input className="col-span-full w-full accent-brand" type="range" min={min} max={max} step={step} value={current} onChange={(e) => onChange(Number(e.target.value))} /></label>;
}

const faqs = [
  ["Do you work only with individual doctors?", "No. The service model is designed for individual specialists, clinics, hospitals, diagnostic businesses and healthcare technology teams."],
  ["Can you connect marketing with our CRM?", "Yes, after a systems review. We map the required data, consent and handoff boundaries before recommending an integration approach."],
  ["Do you guarantee patient growth or search rankings?", "No. Responsible healthcare growth work should not make guarantees. We define measurable hypotheses, reporting and improvement cycles."],
  ["Can you handle a website and campaigns together?", "Yes. The connected model is designed to align positioning, the website, campaigns, lead follow-up and reporting."],
  ["Is the client portal live?", "The interface in this website is an integration-ready frontend preview. Authentication, persistence and third-party services require backend connection before launch."],
];

export function FAQList({ limit }: { limit?: number }) {
  return <div className="border-t border-line">{faqs.slice(0, limit).map(([question, answer]) => <details className="group border-b border-line" key={question}><summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-6 font-extrabold"><span>{question}</span><ChevronDown className="transition group-open:rotate-180" size={20} /></summary><p className="max-w-3xl pb-6 text-muted">{answer}</p></details>)}</div>;
}

export function SearchExperience() {
  const [query, setQuery] = useState("");
  const results = [...services.map((item) => ({ title: item.title, href: `/services/${item.slug}`, type: "Service" })), ...specialties.map((item) => ({ title: item, href: `/specialties/${specialtySlug(item)}`, type: "Specialty" }))].filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));
  return <div className={cn(tw.panel, "min-h-[500px] p-7")}><label className="flex items-center gap-2.5 rounded-xl border border-line px-4"><Search size={20} /><input className="min-h-13 w-full border-0 bg-transparent outline-none" autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services and specialties" /></label><div className="mt-5 grid gap-2" aria-live="polite">{query && results.length === 0 && <EmptyState />}{query && results.map((item) => <a className="grid grid-cols-[5rem_1fr_auto] items-center gap-3 rounded-xl border border-line p-4 hover:border-brand/40 hover:bg-soft-blue" key={item.href} href={item.href}><span className="text-xs font-bold text-brand">{item.type}</span><strong>{item.title}</strong><ArrowRight size={17} /></a>)}</div></div>;
}

function EmptyState() { return <div className="flex min-h-56 flex-col items-center justify-center text-center text-muted"><CircleHelp size={24} /><h3 className="mt-4 text-lg font-extrabold text-navy">No exact match</h3><p>Try a broader term or tell us what you need.</p></div>; }

export function AuditForm() {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const questions = [
    { label: "What type of organization are you growing?", options: ["Individual practice", "Clinic group", "Hospital", "Healthcare company"] },
    { label: "Where is the clearest gap today?", options: ["Positioning", "Website", "Patient acquisition", "Follow-up and operations"] },
    { label: "What would a useful next step look like?", options: ["A focused audit", "A roadmap", "A website plan", "A software discovery call"] },
  ];
  if (complete) return <div className={cn(tw.panel, "flex min-h-96 flex-col items-start justify-center p-10")}><span className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700"><Check size={24} /></span><h3 className="mt-6 text-2xl font-extrabold">Audit brief prepared.</h3><p className="mt-3 text-muted">Connect the audit endpoint to submit this data and generate a routed follow-up task.</p><a className={cn(tw.button, tw.primary, "mt-5")} href="/contact">Add contact details</a></div>;
  const current = questions[step];
  return <div className={cn(tw.panel, "min-h-[470px] p-9")}><div className="mb-8 h-1 overflow-hidden rounded-full bg-slate-100"><span className="block h-full rounded-full bg-brand transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><span className={tw.eyebrow}>Step {step + 1} of {questions.length}</span><h2 className="my-7 text-3xl font-extrabold">{current.label}</h2><div className="grid gap-2.5">{current.options.map((option) => <button className="flex items-center justify-between rounded-xl border border-line bg-white p-4 text-left font-bold hover:border-brand hover:text-brand" key={option} onClick={() => step === questions.length - 1 ? setComplete(true) : setStep(step + 1)}>{option}<ArrowRight size={17} /></button>)}</div>{step > 0 && <button className="mt-5 text-sm text-muted hover:text-navy" onClick={() => setStep(step - 1)}>Back</button>}</div>;
}

export function AuthForm({ mode }: { mode: string }) {
  const [notice, setNotice] = useState("");
  const title = mode.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
  return <form className={cn(tw.panel, "mx-auto flex w-[min(470px,calc(100%-3rem))] flex-col p-9")} onSubmit={(e) => { e.preventDefault(); setNotice("Preview only — connect the authentication adapter before launch."); }}><span className="grid size-10 place-items-center rounded-xl bg-brand text-xs font-black text-white shadow-[inset_-6px_-6px_0_rgba(255,138,61,.85)]">DM</span><span className={cn(tw.eyebrow, "mt-6")}>Secure client access</span><h1 className="mt-6 text-4xl font-extrabold">{title}</h1><p className="mt-3 mb-6 text-muted">Use your organization account to continue.</p>{!["verify-email", "invitation"].includes(mode) && <><FormField label="Email"><input className={tw.field} type="email" required placeholder="you@organization.com" /></FormField>{!mode.includes("forgot") && <FormField label="Password"><input className={tw.field} type="password" required placeholder="••••••••" /></FormField>}</>}<button className={cn(tw.button, tw.primary)} type="submit">Continue <ArrowRight size={16} /></button>{notice && <p className="mt-4 rounded-lg bg-soft-warm p-3 text-xs" role="status">{notice}</p>}<a className="mt-5 text-center text-sm font-bold text-brand" href="/login">Return to sign in</a></form>;
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const options = ["Improve patient inquiries", "Plan a medical website", "Explore software workflows"];
  return <div className="fixed right-6 bottom-6 z-70 max-[540px]:right-3.5 max-[540px]:bottom-3.5"><button className="flex min-h-12 items-center gap-2 rounded-full border-0 bg-brand px-5 font-extrabold text-white shadow-[0_14px_35px_rgba(13,115,246,.35)]" aria-label={open ? "Close agency assistant" : "Open agency assistant"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <MessageCircle size={22} />}<span className="max-[540px]:hidden">Ask DMA</span></button>{open && <div className="absolute right-0 bottom-15 w-[min(370px,calc(100vw-2rem))] overflow-hidden rounded-3xl border border-line bg-white shadow-shell" role="dialog" aria-label="Agency services assistant"><div className="flex items-center gap-2.5 bg-deep p-4 text-white"><span className="grid size-9 place-items-center rounded-xl bg-brand"><Sparkles size={18} /></span><div className="grid flex-1"><strong>Growth guide</strong><small className="text-slate-400">Frontend preview</small></div><button onClick={() => setOpen(false)} aria-label="Close"><X size={18} /></button></div><div className="max-h-96 overflow-y-auto p-4"><p className="text-sm text-muted">Tell me what you’re planning. I can route you to the most relevant service.</p>{messages.map((message) => <div className="my-2 rounded-xl bg-soft-blue p-3 text-sm" key={message}>{message}</div>)}<div className="grid gap-2">{options.map((option) => <button className="rounded-xl border border-line bg-white p-3 text-left text-sm hover:border-brand hover:text-brand" key={option} onClick={() => setMessages([option, "Thanks — this would be routed to a qualified strategist after the assistant endpoint is connected."])}>{option}</button>)}</div></div><a className="flex items-center justify-center gap-2 border-t border-line p-4 text-sm font-extrabold text-brand" href="/contact"><Mail size={16} /> Talk with a strategist</a></div>}</div>;
}
