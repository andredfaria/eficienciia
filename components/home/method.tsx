'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, Compass, Ear, RefreshCw, TrendingUp, Workflow, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from './content-context';
import { Container, EASE, Eyebrow, Stagger, StaggerItem, useMediaQuery, useReduced } from './primitives';

const ICONS: LucideIcon[] = [Ear, Compass, Workflow, TrendingUp];

export function Method() {
  const reduced = useReduced();
  // pinning só em telas largas e altas o bastante para caber a seção inteira
  const canPin = useMediaQuery('(min-width: 768px) and (min-height: 640px)');
  const pinned = canPin && !reduced;

  return (
    <section id="metodo" aria-labelledby="metodo-title" className="bg-ink text-white">
      {pinned ? <PinnedSteps /> : <StaticSteps animated={!reduced} />}
    </section>
  );
}

function Header({ compact = false }: { compact?: boolean }) {
  const { method } = useContent();
  return (
    <div className={cn('grid gap-6', compact && 'md:grid-cols-[1.1fr_0.9fr] md:items-end md:gap-12')}>
      <div>
        <Eyebrow>{method.eyebrow}</Eyebrow>
        <h2 id="metodo-title" className="ef-h2 max-w-[640px]">
          {method.titleBefore}
          <Scramble word={method.titleScramble} />
          {method.titleAfter}
        </h2>
      </div>
      <p className="max-w-[520px] text-[17px] text-subtle-dark">{method.support}</p>
    </div>
  );
}

/* ---------------- desktop: seção fixada, linha ligada ao scroll ---------------- */

function PinnedSteps() {
  const { method } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const line = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);
  const [lit, setLit] = useState(0);
  const [loop, setLoop] = useState(false);

  // escuta o progresso bruto: a linha satura em 1 e deixaria de emitir eventos
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const v = line.get();
    setLit(p < 0.04 ? 0 : Math.min(4, Math.floor(v * 3 + 0.001) + 1));
    setLoop(p > 0.86);
  });

  return (
    <div ref={ref} className="relative" style={{ height: '350vh' }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-[68px]">
        <Container>
          <Header compact />
          <div className="relative mt-14 lg:mt-16">
            <div aria-hidden className="absolute left-[22px] right-[calc((100%-72px)/4-22px)] top-[21px] h-[2px] bg-ink-line">
              <motion.div className="h-full origin-left bg-brand" style={{ scaleX: line }} />
            </div>
            <ol className="relative grid grid-cols-4 gap-6">
              {method.steps.map((s, i) => (
                <PinnedStep key={s.title} index={i} title={s.title} text={s.text} on={lit > i} />
              ))}
            </ol>
            <LoopArrow show={loop} />
          </div>
        </Container>
      </div>
    </div>
  );
}

function PinnedStep({ index, title, text, on }: { index: number; title: string; text: string; on: boolean }) {
  const Icon = ICONS[index];
  return (
    <li>
      <span
        className={cn(
          'relative flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 ease-expo',
          on ? 'border-brand bg-brand text-ink' : 'border-ink-line bg-ink text-subtle-dark'
        )}
      >
        <Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden />
      </span>
      <motion.div
        className="mt-5 rounded-[20px] border border-ink-line bg-ink-2 p-5 lg:p-6"
        initial={false}
        animate={{ y: on ? 0 : 16, opacity: on ? 1 : 0.5 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <p className="text-[13px] font-bold tabular-nums text-brand-soft">{String(index + 1).padStart(2, '0')}</p>
        <h3 className="mt-1 font-display text-[26px] font-bold tracking-[-0.02em]">{title}</h3>
        <motion.p
          className="mt-2 text-[15px] leading-[1.55] text-subtle-dark"
          initial={false}
          animate={{ opacity: on ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: on ? 0.1 : 0 }}
        >
          {text}
        </motion.p>
      </motion.div>
    </li>
  );
}

function LoopArrow({ show }: { show: boolean }) {
  const { method } = useContent();
  return (
    <div className="relative mt-4 h-[64px]" aria-hidden>
      <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 1000 64" preserveAspectRatio="none" fill="none">
        <motion.path
          d="M 880 0 C 880 46, 862 56, 820 56 L 120 56 C 78 56, 60 46, 60 8"
          stroke="#22D3EE"
          strokeWidth="2"
         
          initial={false}
          animate={{ pathLength: show ? 1 : 0, opacity: show ? 1 : 0 }}
          transition={{ duration: 0.9, ease: EASE }}
        />
      </svg>
      <motion.span
        className="absolute left-[6%] top-[-6px] -translate-x-1/2 text-brand"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.3, delay: show ? 0.7 : 0 }}
      >
        <ArrowUp className="h-4 w-4" strokeWidth={2.2} />
      </motion.span>
      <motion.span
        className="absolute left-1/2 top-[56px] flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border border-ink-line bg-ink px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-soft"
        initial={false}
        animate={{ opacity: show ? 1 : 0 }}
        transition={{ duration: 0.4, delay: show ? 0.4 : 0 }}
      >
        <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} />
        {method.loopLabel}
      </motion.span>
    </div>
  );
}

/* ---------------- mobile / reduced motion: timeline vertical ---------------- */

function StaticSteps({ animated }: { animated: boolean }) {
  const { method } = useContent();
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] });

  return (
    <Container className="ef-section">
      <Header />
      <div className="relative mt-12">
        <div aria-hidden className="absolute bottom-3 left-[21px] top-3 w-[2px] bg-ink-line md:hidden">
          <motion.div className="h-full w-full origin-top bg-brand" style={{ scaleY: animated ? scrollYProgress : 1 }} />
        </div>
      <ol ref={listRef} className="relative flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-6">
        {method.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Stagger as="li" key={s.title} className="relative flex gap-5 md:block" amount={0.4}>
              <StaggerItem>
                <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand bg-brand text-ink">
                  <Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden />
                </span>
              </StaggerItem>
              <StaggerItem className="flex-1 md:mt-5">
                <p className="text-[13px] font-bold tabular-nums text-brand-soft">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="mt-1 font-display text-[24px] font-bold tracking-[-0.02em]">{s.title}</h3>
                <p className="mt-2 text-[16px] leading-[1.55] text-subtle-dark">{s.text}</p>
              </StaggerItem>
            </Stagger>
          );
        })}
      </ol>
      </div>
      <p className="mt-10 inline-flex items-center gap-2 rounded-full border border-ink-line px-3.5 py-1.5 text-[13px] font-bold uppercase tracking-[0.1em] text-brand-soft">
        <RefreshCw className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
        {method.loopLabel}
      </p>
    </Container>
  );
}

/* ---------------- "bagunçado" embaralha e se organiza ---------------- */

const GLYPHS = 'abcdefghijklmnopqrstuvwxyzç#%&*';

function Scramble({ word }: { word: string }) {
  const reduced = useReduced();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 1 });
  const [text, setText] = useState(word);

  useEffect(() => {
    if (!inView || reduced) return;
    const start = performance.now();
    const id = setInterval(() => {
      const t = Math.min(1, (performance.now() - start) / 600);
      const settled = Math.floor(t * word.length);
      setText(
        word
          .split('')
          .map((ch, i) => (i < settled ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
      );
      if (t >= 1) {
        clearInterval(id);
        setText(word);
      }
    }, 40);
    return () => clearInterval(id);
  }, [inView, reduced, word]);

  return (
    <span ref={ref} className="relative inline-block whitespace-nowrap text-brand">
      <span className="invisible">{word}</span>
      <span aria-hidden className="absolute inset-0">
        {text}
      </span>
      <span className="sr-only">{word}</span>
    </span>
  );
}
