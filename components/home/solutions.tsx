'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { track } from './track';
import { cn } from '@/lib/utils';
import { useContent } from './content-context';
import type { SolutionAnim } from './content/types';
import { Container, EASE, Eyebrow, Reveal, Stagger, StaggerItem, useFinePointer, useReduced } from './primitives';

export function Solutions() {
  const { solutions } = useContent();
  return (
    <section aria-labelledby="solutions-title" className="ef-light ef-section border-t border-line bg-ground">
      <Container>
        <Reveal className="max-w-[720px]">
          <Eyebrow>{solutions.eyebrow}</Eyebrow>
          <h2 id="solutions-title" className="ef-h2 text-copy">
            {solutions.title}
          </h2>
        </Reveal>
        <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4" amount={0.1}>
          {solutions.cards.map((c, i) => (
            <StaggerItem key={c.title} className={cn((i === 0 || i === solutions.cards.length - 1) && 'md:col-span-2')}>
              <SolutionCard {...c} />
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  );
}

function SolutionCard({
  title,
  text,
  result,
  anim,
  href,
  linkLabel,
}: {
  title: string;
  text: string;
  result: string;
  anim: SolutionAnim;
  href?: string;
  linkLabel?: string;
}) {
  const fine = useFinePointer();
  const reduced = useReduced();
  // a micro-animação roda ao entrar na tela e de novo a cada hover (remontando pela key)
  const [play, setPlay] = useState(0);

  return (
    <motion.article
      className="group relative flex h-full flex-col overflow-hidden rounded-[22px] border border-line bg-surface p-6 transition-[transform,border-color] duration-200 ease-expo hover:-translate-y-1 hover:border-brand-ink md:p-7"
      onViewportEnter={() => setPlay((p) => (p === 0 ? 1 : p))}
      viewport={{ once: true, amount: 0.5 }}
      onMouseEnter={() => !reduced && setPlay((p) => p + 1)}
      onMouseMove={
        fine
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
              e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
            }
          : undefined
      }
    >
      {fine && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          style={{ background: 'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(14,116,144,0.08), transparent 65%)' }}
        />
      )}
      <div className="relative mb-6 flex h-[108px] items-center rounded-[16px] bg-ground px-5" aria-hidden>
        <Anim key={play} kind={anim} play={play > 0} reduced={reduced} />
      </div>
      <h3 className="relative font-display text-[22px] font-bold leading-tight tracking-[-0.02em] text-copy">{title}</h3>
      <p className="relative mt-2 flex-1 text-[16px] text-subtle">{text}</p>
      <p className="relative mt-5 border-t border-line pt-4 text-[15px] font-bold text-copy">{result}</p>
      {href && (
        <Link
          href={href}
          onClick={() => track('cta_click', { location: `solutions_${anim}` })}
          className="relative mt-3 inline-flex min-h-[44px] items-center gap-1.5 self-start text-[15px] font-bold text-brand-ink underline-offset-4 hover:underline"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2} aria-hidden />
        </Link>
      )}
    </motion.article>
  );
}

function Anim({ kind, play, reduced }: { kind: SolutionAnim; play: boolean; reduced: boolean }) {
  // reduced motion: estado final direto
  const go = play || reduced;
  const t = (delay = 0, duration = 0.6) => ({ duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE });

  switch (kind) {
    case 'clock':
      return (
        <div className="flex items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="27" stroke="#0B1220" strokeWidth="2.5" />
            <circle cx="32" cy="32" r="2.5" fill="#0B1220" />
            <line x1="32" y1="32" x2="32" y2="18" stroke="#0B1220" strokeWidth="2.5" strokeLinecap="round" />
            <motion.line
              x1="32"
              y1="32"
              x2="32"
              y2="11"
              stroke="#0E7490"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ transformOrigin: '32px 32px', transformBox: 'view-box' }}
              initial={{ rotate: 0 }}
              animate={{ rotate: go ? 360 : 0 }}
              transition={t(0, 0.9)}
            />
          </svg>
          <motion.span
            className="flex items-center gap-1.5 rounded-[14px] rounded-bl-[4px] bg-ink px-3 py-2 text-[13px] font-bold text-white"
            initial={{ opacity: 0, scale: 0.85, y: 6 }}
            animate={go ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={t(0.75, 0.45)}
          >
            <Check className="h-3.5 w-3.5 text-brand" strokeWidth={3} />
            respondido
          </motion.span>
        </div>
      );
    case 'followup':
      return (
        <div className="flex w-full flex-col gap-2">
          {['D+1', 'D+3', 'D+7'].map((d, i) => (
            <motion.div
              key={d}
              className="flex items-center gap-2.5"
              initial={{ opacity: 0, x: -14 }}
              animate={go ? { opacity: 1, x: 0 } : {}}
              transition={t(i * 0.18, 0.45)}
            >
              <span className="w-10 rounded-[6px] bg-ink py-0.5 text-center text-[11px] font-bold text-white">{d}</span>
              <span className="h-2 rounded-full bg-[#CBD5E1]" style={{ width: `${70 - i * 14}%` }} />
            </motion.div>
          ))}
        </div>
      );
    case 'table':
      return (
        <div className="grid w-full gap-2">
          {[0, 1, 2].map((r) => (
            <div key={r} className="grid grid-cols-[1fr_1.3fr_0.8fr] gap-2 border-b border-line pb-2 last:border-0 last:pb-0">
              {[0, 1, 2].map((c) => (
                <motion.span
                  key={c}
                  className={cn('h-2 origin-left rounded-full', c === 0 ? 'bg-ink' : c === 2 ? 'bg-brand-ink' : 'bg-[#94A3B8]')}
                  initial={{ scaleX: 0 }}
                  animate={go ? { scaleX: 1 } : {}}
                  transition={t(r * 0.2 + c * 0.08, 0.4)}
                />
              ))}
            </div>
          ))}
        </div>
      );
    case 'handoff':
      return (
        <div className="flex w-full items-center justify-end gap-3">
          <motion.div
            className="w-[120px] rounded-[10px] border border-line bg-surface p-2.5"
            initial={{ opacity: 0, x: -60 }}
            animate={go ? { opacity: 1, x: 0 } : {}}
            transition={t(0, 0.7)}
          >
            <span className="block h-2 w-3/4 rounded-full bg-ink" />
            <span className="mt-1.5 block h-1.5 w-full rounded-full bg-[#CBD5E1]" />
            <span className="mt-1 block h-1.5 w-2/3 rounded-full bg-[#CBD5E1]" />
          </motion.div>
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-ink font-display text-[14px] font-bold text-white">
            VD
            <motion.span
              className="absolute inset-[-4px] rounded-full border-2 border-brand-ink"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={go ? { opacity: 1, scale: 1 } : {}}
              transition={t(0.6, 0.4)}
            />
          </span>
        </div>
      );
    case 'funnel':
      return (
        <div className="flex w-full flex-col gap-1.5">
          {[100, 74, 50, 28].map((w, i) => (
            <motion.span
              key={w}
              className={cn('block h-3.5 origin-left rounded-[4px]', i === 3 ? 'bg-brand-ink' : 'bg-ink')}
              style={{ width: `${w}%`, opacity: 1 - i * 0.12 }}
              initial={{ scaleX: 0 }}
              animate={go ? { scaleX: 1 } : {}}
              transition={t(i * 0.12, 0.55)}
            />
          ))}
        </div>
      );
    case 'merge':
      return (
        <div className="relative mx-auto h-[76px] w-[76px]">
          {[
            [-26, -26],
            [26, -26],
            [-26, 26],
            [26, 26],
          ].map(([x, y], i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 top-1/2 -ml-[11px] -mt-[11px] h-[22px] w-[22px] rounded-[6px] bg-[#94A3B8]"
              initial={{ x, y, opacity: 1 }}
              animate={go ? { x: 0, y: 0, opacity: 0 } : {}}
              transition={t(0, 0.7)}
            />
          ))}
          <motion.span
            className="absolute left-1/2 top-1/2 -ml-[20px] -mt-[20px] h-10 w-10 rounded-[10px] bg-brand-ink"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={go ? { opacity: 1, scale: 1 } : {}}
            transition={t(0.55, 0.45)}
          />
        </div>
      );
  }
}
