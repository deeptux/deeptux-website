import type { ReactNode } from "react";
import { HeroScrollCue } from "@/components/sections/HeroScrollCue";
import {
  about,
  bespokeClients,
  brand,
  cctvProjects,
  contact,
  founder,
  heroLead,
  liveDemos,
  liveWebsites,
  services,
} from "@/lib/portfolio-data";

function Panel({
  id,
  children,
  className = "",
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`pointer-events-auto flex min-h-[100dvh] flex-col justify-center px-5 py-16 sm:px-8 md:px-12 md:py-20 ${className}`}
    >
      <div className="mx-auto w-full max-w-3xl rounded-2xl border border-white/10 bg-black/45 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:p-8 md:max-w-4xl">
        {children}
      </div>
    </section>
  );
}

export function HomeSections() {
  const heroTaglineLines = ["Tailored Tech.", "Professional Depth.", "Solutions that fit."];

  return (
    <>
      {/* Left-aligned hero: text column only — right stays open so WebGL reads through */}
      <section
        id="hero"
        className="pointer-events-auto relative flex min-h-[100dvh] flex-col justify-center px-5 pb-24 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-8 md:px-12 md:pb-28 md:pt-32"
      >
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="relative z-[1] max-w-xl text-left lg:col-span-6 lg:max-w-2xl xl:col-span-5 xl:max-w-xl">
            <div
              className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-black/50 via-black/25 to-transparent blur-2xl md:-inset-8 md:from-black/55"
              aria-hidden
            />
            <div className="relative">
              <span
                className="absolute -left-3 top-1 bottom-1 w-1 rounded-full bg-deeptux-red/90 shadow-[0_0_20px_rgba(209,33,39,0.45)] md:-left-4 md:top-2 md:bottom-2"
                aria-hidden
              />
              <h1 className="pl-2 text-balance text-3xl font-bold uppercase leading-[1.12] tracking-tight text-white [text-shadow:0_2px_32px_rgba(0,0,0,0.85)] sm:pl-3 sm:text-4xl md:text-5xl lg:text-[2.75rem] lg:leading-[1.1]">
                {brand.name}
              </h1>
            </div>
            <h2 className="mt-6 max-w-md font-bold text-white [text-shadow:0_1px_20px_rgba(0,0,0,0.8)] max-[359px]:max-w-none max-[359px]:whitespace-nowrap max-[359px]:text-[clamp(10px,1.9vw+0.28rem,10.75px)] max-[359px]:leading-tight max-[359px]:tracking-[-0.025em] min-[360px]:max-[479px]:text-sm min-[360px]:max-[479px]:leading-snug min-[480px]:max-[639px]:text-base min-[480px]:max-[639px]:leading-snug sm:mt-7 sm:text-2xl sm:leading-snug">
              <span className="md:hidden">{brand.tagline}</span>
              <span className="hidden md:block">
                {heroTaglineLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </h2>
            <p className="mt-4 max-w-prose rounded-xl border border-white/10 bg-black/45 px-3 py-2 text-sm font-normal leading-relaxed text-white/80 [text-shadow:0_1px_14px_rgba(0,0,0,0.75)] backdrop-blur-[1px] sm:mt-5 sm:px-4 sm:py-2.5 sm:text-base">
              {heroLead}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-deeptux-red px-7 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Email us
              </a>
              <a
                href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-white/30 bg-black/20 px-7 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/55 hover:bg-white/10"
              >
                Call now
              </a>
            </div>
          </div>
          <div
            className="hidden min-h-[min(42dvh,380px)] lg:col-span-6 lg:block xl:col-span-7"
            aria-hidden
          />
        </div>
        <HeroScrollCue />
      </section>

      <Panel id="story">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Who we are
        </h2>
        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-deeptux-red">
              DeepTux
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Established {brand.founded}. We partner with organizations to ship
              business solutions through technology—focused on the Philippines,
              closing the advancement gap and bringing overseas-caliber delivery
              home.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-deeptux-red">
              Lead engineer
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              {founder.title}. {founder.summary}
            </p>
            <p className="mt-3 text-xs text-white/50">
              {founder.stack.join(" · ")}
            </p>
            <ul className="mt-3 list-inside list-disc text-xs text-white/60">
              {founder.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      </Panel>

      <Panel id="about">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          About us
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/75">
          {about.background}
        </p>
        <p className="mt-2 text-xs text-white/45">{brand.location}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-deeptux-red/40 bg-deeptux-red/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-deeptux-red">
              Vision
            </h3>
            <p className="mt-2 text-sm text-white/85">{about.vision}</p>
          </div>
          <div className="rounded-xl border border-deeptux-red/40 bg-deeptux-red/10 p-4">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-deeptux-red">
              Mission
            </h3>
            <p className="mt-2 text-sm text-white/85">{about.mission}</p>
          </div>
        </div>
      </Panel>

      <Panel id="services">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Our services
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.id}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {s.body}
              </p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel id="work-web">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Live websites &amp; e-commerce
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Selected public launches, open in a new tab upon visit.
        </p>
        <ul className="mt-6 space-y-3">
          {liveWebsites.map((w) => (
            <li key={w.href}>
              <a
                href={w.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white transition hover:border-deeptux-red/50 hover:text-deeptux-red"
              >
                <span>{w.name}</span>
                <span className="text-xs text-white/40">Visit →</span>
              </a>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="work-demos">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Live demo apps
        </h2>
        <ul className="mt-6 space-y-3">
          {liveDemos.map((d) => (
            <li key={d.href}>
              <a
                href={d.href}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 transition hover:border-deeptux-red/50"
              >
                <div className="text-sm font-semibold text-white">{d.name}</div>
                <div className="text-xs text-white/55">{d.role}</div>
              </a>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="work-bespoke">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Bespoke systems &amp; apps
        </h2>
        <p className="mt-2 text-sm text-white/60">
          Representative engagements (subject to NDAs).
        </p>
        <ul className="mt-6 columns-1 gap-x-8 text-sm text-white/75 sm:columns-2">
          {bespokeClients.map((name) => (
            <li key={name} className="break-inside-avoid py-1">
              {name}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="work-cctv">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          CCTV &amp; field security
        </h2>
        <p className="mt-2 text-sm text-white/60">
          On-site delivery, control-room commissioning, and live monitoring
          ecosystems.
        </p>
        <div className="mt-6 space-y-4">
          {cctvProjects.map((p) => (
            <article
              key={p.name}
              className="rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <h3 className="text-sm font-semibold text-white">{p.name}</h3>
              <p className="text-xs uppercase tracking-wide text-deeptux-red">
                {p.place}
              </p>
              <p className="mt-2 text-sm text-white/70">{p.caption}</p>
            </article>
          ))}
        </div>
      </Panel>

      <Panel id="contact" className="pb-28 md:pb-20">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">
          Contact
        </h2>
        <p className="mt-2 text-sm text-white/60">
          New business and project inquiries.
        </p>
        <div className="mt-6 space-y-4 text-sm">
          {contact.phones.map((p) => (
            <a
              key={p}
              href={`tel:${p.replace(/\s/g, "")}`}
              className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-medium text-white transition hover:border-deeptux-red/50"
            >
              {p}
            </a>
          ))}
          <a
            href={`mailto:${contact.email}`}
            className="block rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-medium text-white transition hover:border-deeptux-red/50"
          >
            {contact.email}
          </a>
        </div>
      </Panel>
    </>
  );
}
