'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleCheck, CircleX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from './content-context';
import { Container, EASE, Reveal, useReduced } from './primitives';

export function BeforeAfter() {
  const { beforeAfter } = useContent();
  const reduced = useReduced();
  const [modeId, setModeId] = useState(beforeAfter.modes[0].id);
  const mode = beforeAfter.modes.find((m) => m.id === modeId)!;

  return (
    <section aria-labelledby="ba-title" className="ef-light ef-section bg-ground">
      <Container>
        <Reveal className="mx-auto max-w-[760px] text-center">
          <h2 id="ba-title" className="ef-h2 text-copy">
            {beforeAfter.title}
          </h2>
        </Reveal>

        <Reveal className="mx-auto mt-10 max-w-[760px]">
          <div className="flex justify-center">
            <div role="tablist" aria-label="Comparar cenários" className="relative inline-flex rounded-[16px] border border-line bg-surface p-1.5">
              {beforeAfter.modes.map((m) => {
                const selected = m.id === modeId;
                return (
                  <button
                    key={m.id}
                    role="tab"
                    id={`tab-${m.id}`}
                    aria-selected={selected}
                    aria-controls="ba-panel"
                    onClick={() => setModeId(m.id)}
                    className={cn(
                      'relative min-h-[44px] rounded-[12px] px-4 text-[15px] font-bold transition-colors duration-200 sm:px-6',
                      selected ? 'text-white' : 'text-subtle hover:text-copy'
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="ba-indicator"
                        className="absolute inset-0 rounded-[12px] bg-ink"
                        transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                      />
                    )}
                    <span className="relative">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="ba-panel"
            role="tabpanel"
            aria-labelledby={`tab-${modeId}`}
            className="relative mt-8 rounded-[24px] border border-line bg-surface p-6 md:p-10"
          >
            <div className="mb-6 flex justify-end">
              <span className="rounded-full border border-line px-2.5 py-0.5 text-[12px] font-semibold text-subtle">{beforeAfter.tag}</span>
            </div>
            {/* altura mínima evita salto ao trocar entre 3 e 4 eventos */}
            <div className="min-h-[300px] md:min-h-[320px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mode.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    show: { transition: { staggerChildren: reduced ? 0 : 0.09 } },
                    exit: { opacity: 0, transition: { duration: 0.15 } },
                  }}
                >
                  <ol className="relative">
                    {mode.events.map((ev, i) => (
                      <motion.li
                        key={i}
                        className="relative flex gap-5 pb-6 last:pb-0"
                        variants={{
                          hidden: { opacity: 0, x: reduced ? 0 : -16 },
                          show: { opacity: 1, x: 0, transition: { duration: reduced ? 0.15 : 0.45, ease: EASE } },
                        }}
                      >
                        <span className="relative flex w-3 shrink-0 justify-center pt-[7px]" aria-hidden>
                          <span className={cn('h-3 w-3 rounded-full', mode.positive ? 'bg-brand-ink' : 'bg-[#94A3B8]')} />
                          {i < mode.events.length - 1 && <span className="absolute bottom-[-24px] top-[22px] w-px bg-line" />}
                        </span>
                        <p className="text-[16px] md:text-[17px]">
                          <span className="font-bold tabular-nums text-copy">{ev.time}</span>
                          <span className="text-subtle">: {ev.text}</span>
                        </p>
                      </motion.li>
                    ))}
                  </ol>
                  <motion.p
                    className={cn(
                      'mt-8 inline-flex items-center gap-2 rounded-full px-4 py-2 font-display text-[18px] font-bold tracking-[-0.01em]',
                      mode.positive ? 'bg-[#ECFEFF] text-brand-ink' : 'bg-ground-2 text-subtle'
                    )}
                    variants={{
                      hidden: { opacity: 0, y: reduced ? 0 : 10 },
                      show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : 0.45, ease: EASE } },
                    }}
                  >
                    {mode.positive ? <CircleCheck className="h-5 w-5" strokeWidth={2} aria-hidden /> : <CircleX className="h-5 w-5" strokeWidth={2} aria-hidden />}
                    {mode.status}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
