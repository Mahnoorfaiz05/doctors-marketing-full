"use client";

import { ReactNode, useEffect, useState } from "react";
import { ArrowRight, ChevronDown, Cookie, LockKeyhole, Menu, Search, X } from "lucide-react";
import { mainNav, services, specialties, specialtySlug } from "@/lib/content";
import { Assistant } from "./interactive";
import { cn, tw } from "./tw";

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return (
    <a className={cn("inline-flex shrink-0 items-center gap-3", inverse && "text-white")} href="/" aria-label="Doctors Marketing Agency home">
      <span className="grid size-11 place-items-center rounded-[13px] bg-brand font-black tracking-[-.08em] text-white shadow-[inset_-7px_-7px_0_rgba(255,138,61,.85)]">DM</span>
      <span className="grid leading-none max-[540px]:hidden"><strong className="text-sm">Doctors Marketing</strong><small className={cn("mt-1 text-[.65rem] tracking-[.15em] uppercase", inverse ? "text-slate-400" : "text-muted")}>Agency</small></span>
    </a>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen, searchOpen]);

  return (
    <>
      <a className="fixed top-2 left-2 z-[999] -translate-y-40 rounded-lg bg-deep px-4 py-2 text-sm text-white focus:translate-y-0" href="#main">Skip to content</a>
      <header className="sticky top-0 z-60 h-20 border-b border-line/75 bg-white/92 backdrop-blur-xl max-[820px]:h-[72px]">
        <div className={cn(tw.container, "grid h-full grid-cols-[1fr_auto_1fr] items-center max-[820px]:grid-cols-[1fr_auto]")}>
          <Brand />
          <nav className="flex items-center gap-7 max-[900px]:gap-4 max-[820px]:hidden" aria-label="Primary navigation">
            {mainNav.map((item) => item.label === "Services" ? (
              <button key={item.label} className="inline-flex items-center gap-1 py-3 text-xs font-bold hover:text-brand" onClick={() => setServicesOpen(!servicesOpen)} aria-expanded={servicesOpen}>{item.label}<ChevronDown size={14} /></button>
            ) : <a className="py-3 text-xs font-bold hover:text-brand" key={item.label} href={item.href}>{item.label}</a>)}
          </nav>
          <div className="flex items-center justify-end gap-2.5">
            <button className="grid size-11 place-items-center rounded-xl border border-line bg-white hover:border-brand/40" onClick={() => setSearchOpen(true)} aria-label="Open search"><Search size={19} /></button>
            <a className={cn(tw.button, tw.primary, "min-h-11 max-[1050px]:hidden")} href="/contact">Book a strategy call <ArrowRight size={16} /></a>
            <button className="hidden size-11 place-items-center rounded-xl border border-line bg-white max-[820px]:grid" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={22} /></button>
          </div>
        </div>
        {servicesOpen && (
          <div className="absolute top-20 right-0 left-0 border-y border-line bg-white py-8 shadow-card max-[820px]:hidden">
            <div className={cn(tw.container, "grid grid-cols-[.75fr_2fr] gap-12")}>
              <div><span className={tw.eyebrow}>Connected growth system</span><h3 className="my-5 text-3xl font-extrabold">One partner across brand, growth and technology.</h3><a className={tw.textLink} href="/services">Explore all services <ArrowRight size={16} /></a></div>
              <div className="grid grid-cols-2 gap-x-5">{services.map((service) => <a className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-soft-blue hover:text-brand" href={`/services/${service.slug}`} key={service.slug}><service.icon size={18} /><span className="grid"><strong className="text-sm">{service.title}</strong><small className="text-xs text-muted">{service.short}</small></span></a>)}</div>
            </div>
          </div>
        )}
      </header>

      {mobileOpen && <div className="fixed inset-y-0 right-0 z-[100] flex w-[min(420px,92vw)] flex-col bg-white p-6 shadow-[-20px_0_60px_rgba(7,28,56,.2)]" role="dialog" aria-modal="true" aria-label="Navigation"><div className="mb-10 flex items-center justify-between"><Brand /><button className="grid size-11 place-items-center rounded-xl border border-line" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X size={22} /></button></div><nav className="mb-8 grid">{mainNav.map((item) => <a className="flex items-center justify-between border-b border-line py-4 font-bold" href={item.href} key={item.label}>{item.label}<ArrowRight size={16} /></a>)}<a className="flex items-center justify-between border-b border-line py-4 font-bold" href="/login">Client login <LockKeyhole size={16} /></a></nav><a className={cn(tw.button, tw.primary)} href="/contact">Book a strategy call</a></div>}

      {searchOpen && <div className="fixed inset-0 z-[110] grid place-items-start bg-footer/85 pt-[15vh] backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Site search"><div className="relative w-[min(760px,calc(100%-2.25rem))] rounded-3xl bg-white p-12 shadow-shell max-[540px]:p-6 max-[540px]:pt-12"><button className="absolute top-4 right-4 grid size-11 place-items-center rounded-xl border border-line" onClick={() => setSearchOpen(false)} aria-label="Close search"><X size={22} /></button><span className={tw.eyebrow}>Find the right solution</span><h2 className="my-7 text-4xl font-extrabold">What can we help you improve?</h2><form className="grid grid-cols-[1fr_auto] gap-2.5 max-[540px]:grid-cols-1" action="/search"><label className="flex items-center gap-2 rounded-xl border border-line px-4"><Search size={21} /><input className="min-h-13 w-full border-0 outline-none" name="q" autoFocus placeholder="Search services, specialties or resources" /></label><button className={cn(tw.button, tw.primary)} type="submit">Search</button></form></div></div>}
    </>
  );
}

function Footer() {
  return <footer className="border-t border-white/5 bg-footer pt-20 pb-6 text-white"><div className={cn(tw.container, "grid grid-cols-[1.5fr_1fr_.8fr_1fr] gap-14 pb-14 max-[1000px]:grid-cols-[1.4fr_1fr_1fr] max-[820px]:grid-cols-2 max-[540px]:grid-cols-1")}><div><Brand inverse /><p className="mt-6 text-lg">Helping Doctors Become the First Choice.</p><span className="text-sm text-slate-400">Healthcare growth, brand and technology—connected thoughtfully.</span></div><FooterLinks title="Services" links={services.slice(0, 5).map((service) => [service.title, `/services/${service.slug}`])} /><div className="max-[540px]:hidden"><FooterLinks title="Explore" links={[["About", "/about"], ["Case studies", "/case-studies"], ["Resources", "/resources"], ["FAQ", "/faq"], ["Client login", "/login"]]} /></div><div className="max-[1000px]:hidden"><FooterLinks title="Who we help" links={specialties.slice(0, 5).map((specialty) => [specialty, `/specialties/${specialtySlug(specialty)}`])} /></div></div><div className={cn(tw.container, "flex justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 max-[820px]:flex-col")}><span>© 2026 Doctors Marketing Agency. [FINAL LEGAL ENTITY REQUIRED]</span><div className="flex gap-5"><a href="/privacy-policy">Privacy</a><a href="/terms-of-service">Terms</a><a href="/accessibility">Accessibility</a></div></div></footer>;
}

function FooterLinks({ title, links }: { title: string; links: string[][] }) { return <div className="flex flex-col gap-2.5"><h3 className="mb-1 text-sm font-extrabold">{title}</h3>{links.map(([label, href]) => <a className="text-xs text-slate-400 hover:text-white" href={href} key={href}>{label}</a>)}</div>; }

function CookiePreferences() {
  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(window.localStorage.getItem("dma-cookie-choice") === null), []);
  function choose(value: string) { window.localStorage.setItem("dma-cookie-choice", value); setVisible(false); }
  if (!visible) return null;
  return <div className="fixed bottom-6 left-6 z-75 grid w-[min(610px,calc(100vw-3rem))] grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-card max-[700px]:grid-cols-[auto_1fr] max-[540px]:bottom-3 max-[540px]:left-3 max-[540px]:w-[calc(100vw-1.5rem)]"><Cookie className="text-accent" size={21} /><div><strong>Your privacy choices</strong><p className="mt-1 text-xs text-muted">Essential storage supports this experience. Optional analytics stays off unless you allow it.</p></div><div className="flex gap-2 max-[700px]:col-span-full"><button className={cn(tw.button, tw.ghost, "min-h-10 px-3 text-xs")} onClick={() => choose("essential")}>Essential only</button><button className={cn(tw.button, tw.primary, "min-h-10 px-3 text-xs")} onClick={() => choose("all")}>Allow analytics</button></div></div>;
}

export function SiteShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto mt-6 w-[min(1520px,calc(100%-3rem))] overflow-clip rounded-t-[34px] bg-white shadow-shell max-[820px]:mt-0 max-[820px]:w-full max-[820px]:rounded-none"><Header /><main id="main">{children}</main><Footer /><Assistant /><CookiePreferences /></div>;
}
