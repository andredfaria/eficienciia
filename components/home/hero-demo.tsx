'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useTransform, type MotionValue } from 'framer-motion';
import { Database } from 'lucide-react';
import { cn } from '@/lib/utils';
import { hero } from './content';
import { EASE, useReduced } from './primitives';

const demo = hero.demo;

/*
  Linha do tempo da demonstração (≈7 s). Cada passo espera DELAYS[passo] antes de avançar.
  0 vazio · 1 msg0 · 2 digitando · 3 msg1 · 4 msg2 · 5 digitando · 6 msg3 · 7 msg4 · 8 CRM · 9–12 campos
*/
const MSG_STEP = [1, 3, 4, 6, 7];
const TYPING_STEP: Record<number, number> = { 1: 2, 3: 5 };
const CRM_STEP = 8;
const FIELD_STEP = 9;
const LAST = 12;
const DELAYS = [900, 700, 1000, 700, 600, 1000, 700, 600, 450, 380, 380, 380, 4400];

export function HeroDemo({ mx, my, scrollProgress }: { mx: MotionValue<number>; my: MotionValue<number>; scrollProgress: MotionValue<number> }) {
  const reduced = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  const current = reduced ? LAST : step;

  // avança a sequência só enquanto o hero está visível; ao sair, pausa onde estava
  useEffect(() => {
    if (reduced || !inView) return;
    const t = setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), DELAYS[step]);
    return () => clearTimeout(t);
  }, [step, inView, reduced]);

  const chatX = useTransform(mx, (v) => v * 8);
  const chatY = useTransform(my, (v) => v * 8);
  const crmX = useTransform(mx, (v) => v * 14);
  const crmY = useTransform(my, (v) => v * 14);
  const scrollY = useTransform(scrollProgress, [0, 1], [0, reduced ? 0 : 140]);
  const fade = useTransform(scrollProgress, [0, 0.75], [1, reduced ? 1 : 0]);

  return (
    <motion.div ref={ref} style={{ y: scrollY, opacity: fade }} className="relative mx-auto w-full max-w-[460px]">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(34,211,238,0.10),transparent)]"
      />
      <p className="sr-only">
        Exemplo de conversa em que o agente de IA atende uma lead no WhatsApp, qualifica o interesse, agenda a visita e
        registra tudo no CRM.
      </p>

      <motion.div
        aria-hidden
        style={{ x: chatX, y: chatY }}
        className="relative rounded-[22px] bg-surface p-4 text-copy shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55)] md:mr-8"
      >
        <div className="flex items-center gap-3 border-b border-line pb-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-[13px] font-bold text-brand">SE</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[14px] font-bold leading-tight">{demo.header}</p>
            <p className="flex items-center gap-1.5 text-[12px] text-subtle">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {demo.status}
            </p>
          </div>
          <span className="rounded-full border border-line px-2 py-0.5 text-[11px] font-semibold text-subtle">{demo.tag}</span>
        </div>

        <div className="flex flex-col gap-2.5 pb-12 pt-3.5">
          {demo.messages.map((m, i) => {
            const visible = current >= MSG_STEP[i];
            const typing = TYPING_STEP[i] !== undefined && current === TYPING_STEP[i];
            const agent = m.from === 'agent';
            return (
              <div key={i} className={cn('relative flex', agent ? 'justify-end' : 'justify-start')}>
                <motion.p
                  initial={false}
                  animate={{ opacity: visible ? 1 : 0, y: visible || reduced ? 0 : 10 }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className={cn(
                    'max-w-[85%] rounded-[16px] px-3.5 py-2 text-[14px] leading-snug',
                    agent ? 'rounded-br-[5px] bg-ink text-white' : 'rounded-bl-[5px] bg-[#EEF2F6] text-copy'
                  )}
                >
                  {m.text}
                </motion.p>
                {agent && (
                  <motion.span
                    initial={false}
                    animate={{ opacity: typing ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ef-typing absolute right-0 top-0 flex items-center gap-1 rounded-[16px] rounded-br-[5px] bg-ink px-3.5 py-3"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </motion.span>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div aria-hidden style={{ x: crmX, y: crmY }} className="relative z-10 -mt-8 ml-6 md:ml-14">
        <motion.div
          initial={false}
          animate={{ opacity: current >= CRM_STEP ? 1 : 0, y: current >= CRM_STEP || reduced ? 0 : 28 }}
          transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          className="rounded-[20px] border border-ink-line bg-ink-2 p-4 text-white shadow-[0_30px_70px_-20px_rgba(0,0,0,0.7)] md:p-5"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-brand-soft">
              <Database className="h-3.5 w-3.5" strokeWidth={2} />
              {demo.crm.label}
            </span>
            <span className="rounded-full bg-brand/15 px-2.5 py-0.5 text-[11px] font-bold text-brand-soft">{demo.crm.badge}</span>
          </div>
          <p className="mt-2 font-display text-[17px] font-bold tracking-[-0.01em]">{demo.crm.title}</p>
          <dl className="mt-3 grid gap-0 text-[13.5px]">
            {demo.crm.fields.map((f, i) => (
              <div key={f.key} className="flex gap-2 border-t border-ink-line py-1.5">
                <dt className="w-[86px] shrink-0 text-subtle-dark">{f.key}</dt>
                <dd className="font-semibold">
                  <TypeText text={f.value} active={current >= FIELD_STEP + i} instant={reduced} />
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Digitação rápida; reserva a largura final para não mexer no layout. */
function TypeText({ text, active, instant }: { text: string; active: boolean; instant: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) {
      setN(0);
      return;
    }
    if (instant) {
      setN(text.length);
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) clearInterval(id);
    }, Math.max(14, 300 / text.length));
    return () => clearInterval(id);
  }, [active, instant, text]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{text}</span>
      <span className="absolute inset-0 whitespace-nowrap">{text.slice(0, n)}</span>
    </span>
  );
}
