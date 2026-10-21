'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { faq } from './content';
import { Container, EASE, Reveal, useReduced } from './primitives';

export function Faq() {
  const reduced = useReduced();
  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  return (
    <section id="faq" aria-labelledby="faq-title" className="ef-light ef-section bg-surface">
      <Container className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
        <Reveal className="md:sticky md:top-[120px] md:self-start">
          <h2 id="faq-title" className="ef-h2 text-copy">
            {faq.title}
          </h2>
        </Reveal>
        <Reveal>
          <div className="border-t border-line">
            {faq.items.map((item, i) => {
              const isOpen = open.includes(i);
              return (
                <div key={item.q} className="border-b border-line">
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => toggle(i)}
                      className="flex min-h-[64px] w-full items-center justify-between gap-6 py-5 text-left font-display text-[19px] font-bold leading-snug tracking-[-0.015em] text-copy md:text-[21px]"
                    >
                      {item.q}
                      <motion.span
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-copy"
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: reduced ? 0 : 0.25, ease: EASE }}
                        aria-hidden
                      >
                        <Plus className="h-4 w-4" strokeWidth={2.2} />
                      </motion.span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: reduced ? 0.15 : 0.35, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[640px] pb-6 pr-12 text-[17px] text-subtle">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
