'use client';

import { useRef, type CSSProperties } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Calculator } from 'lucide-react';
import { offer, site } from './content';
import { Container, CtaLink, DrawCheck, EASE, Eyebrow, Reveal, Stagger, StaggerItem, useReduced } from './primitives';

export function Offer() {
  const reduced = useReduced();
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const glowOn = useInView(glowRef);
  const { scrollYProgress } = useScroll({ target: gridRef, offset: ['start 85%', 'end 55%'] });
  const path = useTransform(scrollYProgress, [0, 1], [reduced ? 1 : 0, 1]);
  const d = offer.diagnostic;

  return (
    <section id="oferta" aria-labelledby="oferta-title" className="ef-light ef-section bg-ground-2">
      <Container>
        <Reveal className="max-w-[720px]">
          <Eyebrow>{offer.eyebrow}</Eyebrow>
          <h2 id="oferta-title" className="ef-h2 text-copy">
            {offer.title}
          </h2>
          <p className="mt-5 text-[17px] text-subtle md:text-[18px]">{offer.support}</p>
        </Reveal>

        <div ref={gridRef} className="relative mt-12">
          {/* linha que liga os três passos, desenhada com o scroll */}
          <svg aria-hidden className="pointer-events-none absolute left-0 top-[41px] hidden h-[2px] w-full md:block" viewBox="0 0 100 2" preserveAspectRatio="none">
            <motion.path d="M 4 1 L 96 1" stroke="#0E7490" strokeWidth="2" fill="none" style={{ pathLength: path }} />
          </svg>

          <Stagger className="relative grid gap-4 md:grid-cols-3 md:gap-6" amount={0.15}>
            <StaggerItem>
              <div
                ref={glowRef}
                className="ef-glow-border h-full rounded-[24px] p-[1px] text-white"
                style={{ '--glow-state': glowOn ? 'running' : 'paused' } as CSSProperties}
              >
                <div className="flex h-full flex-col rounded-[23px] border border-brand/60 p-6 md:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <StepPill dark>{d.step}</StepPill>
                    <span className="rounded-full bg-brand px-3 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-ink">{d.badge}</span>
                  </div>
                  <h3 className="mt-6 font-display text-[24px] font-bold tracking-[-0.02em]">{d.title}</h3>
                  <p className="mt-3 font-display text-[56px] font-extrabold leading-none tracking-[-0.03em]">{d.price}</p>
                  <p className="mt-2 text-[15px] text-subtle-dark">{d.priceNote}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-3 border-t border-ink-line pt-6">
                    {d.items.map((it, i) => (
                      <li key={it} className="flex gap-3 text-[15px] text-white">
                        <DrawCheck className="mt-0.5 text-brand" delay={i * 0.08} />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <CtaLink href="#contato" location="offer" arrow magnetic className="mt-7 w-full">
                    {d.cta}
                  </CtaLink>
                </div>
              </div>
            </StaggerItem>

            {offer.steps.map((s) => (
              <StaggerItem key={s.title}>
                <div className="flex h-full flex-col rounded-[24px] border border-line bg-surface p-6 transition-[transform,border-color] duration-200 ease-expo hover:-translate-y-1 hover:border-brand-ink md:p-7">
                  <StepPill>{s.step}</StepPill>
                  <h3 className="mt-6 font-display text-[24px] font-bold tracking-[-0.02em] text-copy">{s.title}</h3>
                  <p className="mt-3 font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-brand-ink">{s.highlight}</p>
                  <p className="mt-2 text-[15px] text-subtle">{s.text}</p>
                  <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
                    {s.items.map((it, i) => (
                      <li key={it} className="flex gap-3 text-[15px] text-copy">
                        <DrawCheck className="mt-0.5 text-brand-ink" delay={i * 0.08} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-[1.4fr_1fr] md:gap-6">
          <Reveal>
            <div className="flex h-full gap-5 rounded-[24px] border-2 border-dashed border-[#94A3B8] p-6 md:p-7">
              <ShieldDraw />
              <div>
                <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-copy">{offer.guarantee.title}</h3>
                <p className="mt-2 text-[16px] text-subtle">{offer.guarantee.text}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col justify-between gap-5 rounded-[24px] border border-line bg-surface p-6 md:p-7">
              <p className="flex gap-3 text-[17px] font-semibold text-copy">
                <Calculator className="mt-0.5 h-6 w-6 shrink-0 text-brand-ink" strokeWidth={1.85} aria-hidden />
                {offer.calculator.text}
              </p>
              <CtaLink href={site.calculatorHref} location="offer_calculator" variant="dark" arrow className="self-start">
                {offer.calculator.cta}
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function StepPill({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={
        dark
          ? 'relative z-10 inline-flex rounded-full border border-ink-line bg-ink px-3 py-1 text-[13px] font-bold text-brand-soft'
          : 'relative z-10 inline-flex self-start rounded-full border border-line bg-ground px-3 py-1 text-[13px] font-bold text-brand-ink'
      }
    >
      {children}
    </span>
  );
}

function ShieldDraw() {
  const reduced = useReduced();
  return (
    <svg viewBox="0 0 40 40" fill="none" className="h-11 w-11 shrink-0 text-brand-ink" aria-hidden>
      <path
        d="M20 4l13 5v9.5c0 8.2-5.5 14.6-13 17.5C12.5 33.1 7 26.7 7 18.5V9l13-5z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <motion.path
        d="M14 20l4.2 4.2L26.5 16"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.3, ease: EASE }}
      />
    </svg>
  );
}
