'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { leaks } from './content';
import { useLead } from './lead-context';
import { Container, CtaLink, EASE, Eyebrow, Stagger, StaggerItem, useIsDesktop, useReduced } from './primitives';

export function Leaks() {
  const desktop = useIsDesktop();
  const reduced = useReduced();
  const scrolly = desktop && !reduced;
  const { marked, toggle } = useLead();
  const [current, setCurrent] = useState(-1);
  const [passed, setPassed] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // item que cruza o centro da tela fica em destaque; o contador sobe conforme os itens passam
  useEffect(() => {
    if (!scrolly) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const i = Number((e.target as HTMLElement).dataset.index);
          setCurrent(i);
          setPassed((p) => Math.max(p, i + 1));
        });
      },
      { rootMargin: '-48% 0px -48% 0px' }
    );
    itemRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [scrolly]);

  const total = leaks.items.length;

  return (
    <section aria-labelledby="leaks-title" className="ef-light ef-section bg-ground">
      <Container className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div className="md:sticky md:top-[120px] md:self-start">
          <Eyebrow>{leaks.eyebrow}</Eyebrow>
          <h2 id="leaks-title" className="ef-h2 text-copy">
            {leaks.title}
          </h2>
          <p className="mt-5 max-w-[440px] text-[17px] text-subtle md:text-[18px]">{leaks.support}</p>
          {scrolly && (
            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-subtle" aria-hidden>
              {leaks.counterLabel}:
              <span className="font-display text-[18px] font-extrabold tabular-nums text-copy">
                {passed}/{total}
              </span>
            </p>
          )}
        </div>

        <div>
          <Stagger as="ol" className="flex flex-col gap-3" amount={0.05}>
            {leaks.items.map((text, i) => {
              const checked = marked.includes(i);
              const focus = !scrolly || current === i || checked;
              return (
                <StaggerItem as="li" key={i}>
                  <div
                    ref={(el) => (itemRefs.current[i] = el)}
                    data-index={i}
                    className={cn('transition-opacity duration-500 ease-expo', focus ? 'opacity-100' : 'opacity-[0.45]')}
                  >
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => toggle(i)}
                      className={cn(
                        'group flex w-full items-start gap-4 rounded-[20px] border bg-surface p-5 text-left transition-[border-color,transform] duration-200 ease-expo hover:-translate-y-1 md:gap-5 md:p-6',
                        checked || (scrolly && current === i) ? 'border-copy' : 'border-line hover:border-brand-ink'
                      )}
                    >
                      <span
                        className={cn(
                          'font-display text-[22px] font-extrabold leading-none tabular-nums transition-colors duration-300',
                          focus ? 'text-brand-ink' : 'text-subtle'
                        )}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="flex-1 text-[16px] leading-[1.5] text-copy md:text-[17px]">{text}</span>
                      <span className="flex shrink-0 flex-col items-center gap-1 pt-0.5">
                        <span
                          className={cn(
                            'flex h-6 w-6 items-center justify-center rounded-[7px] border-2 transition-colors duration-200',
                            checked ? 'border-ink bg-ink text-brand' : 'border-[#94A3B8] text-transparent'
                          )}
                        >
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <span className="sr-only">{leaks.checkHint}</span>
                      </span>
                    </button>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>

          <AnimatePresence>
            {marked.length >= 2 && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : 12 }}
                transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE }}
                className="mt-6 flex flex-col gap-4 rounded-[24px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between md:p-7"
                role="status"
              >
                <p className="font-display text-[22px] font-bold leading-tight tracking-[-0.02em]">{leaks.result(marked.length)}</p>
                <CtaLink href="#contato" location="leaks" arrow className="shrink-0">
                  {leaks.resultCta}
                </CtaLink>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
