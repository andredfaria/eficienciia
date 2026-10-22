'use client';

import { useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from './content-context';
import { Container, Eyebrow, Reveal, Stagger, StaggerItem, useFinePointer, useReduced } from './primitives';

export function Testimonials() {
  const { testimonials } = useContent();
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const items = testimonials.items;

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    if (!card) return;
    setPage(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft - 24, behavior: 'smooth' });
  };

  return (
    <section id="resultados" aria-labelledby="resultados-title" className="ef-light ef-section bg-ground">
      <Container>
        <Reveal className="max-w-[720px]">
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <h2 id="resultados-title" className="ef-h2 text-copy">
            {testimonials.title}
          </h2>
        </Reveal>

        <Stagger amount={0.15}>
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="ef-noscroll -mx-6 mt-12 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0"
          >
            {items.map((t) => (
              <StaggerItem key={t.name} className="w-[86%] shrink-0 snap-start md:w-auto">
                <TiltCard>
                  <Quote className="h-7 w-7 text-brand-ink" strokeWidth={1.75} aria-hidden />
                  <blockquote className="mt-4 flex-1 text-[16px] leading-[1.6] text-copy">“{t.quote}”</blockquote>
                  <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                    {t.photo ? (
                      <Image src={t.photo} alt={`Foto de ${t.name}`} width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-display text-[15px] font-bold text-white" aria-hidden>
                        {t.name
                          .split(' ')
                          .map((p) => p[0])
                          .slice(0, 2)
                          .join('')}
                      </span>
                    )}
                    <span>
                      <span className="block font-bold text-copy">{t.name}</span>
                      <span className="block text-[14px] text-subtle">{t.role}</span>
                    </span>
                  </figcaption>
                </TiltCard>
              </StaggerItem>
            ))}
          </div>
        </Stagger>

        <div className="mt-5 flex justify-center gap-1 md:hidden">
          {items.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Ver depoimento ${i + 1} de ${items.length}`}
              aria-current={page === i ? 'true' : undefined}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={cn('h-2 rounded-full transition-all duration-200', page === i ? 'w-6 bg-ink' : 'w-2 bg-[#94A3B8]')} />
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}

function TiltCard({ children }: { children: ReactNode }) {
  const fine = useFinePointer();
  const reduced = useReduced();
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const tilt = fine && !reduced;

  return (
    <motion.figure
      className="flex h-full flex-col rounded-[24px] border border-line bg-surface p-6 md:p-7"
      style={tilt ? { rotateX: rx, rotateY: ry, transformPerspective: 900 } : undefined}
      onMouseMove={
        tilt
          ? (e) => {
              const r = e.currentTarget.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry.set(px * 8); // ±4°
              rx.set(-py * 8);
            }
          : undefined
      }
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.figure>
  );
}
