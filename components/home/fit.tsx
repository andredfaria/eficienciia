'use client';

import { X } from 'lucide-react';
import { useContent } from './content-context';
import { Container, DrawCheck, Stagger, StaggerItem } from './primitives';

export function Fit() {
  const { fit } = useContent();
  return (
    <section aria-label="Para quem é" className="ef-light ef-section border-t border-line bg-ground">
      <Container className="grid gap-4 md:grid-cols-[1.25fr_1fr] md:gap-6">
        <div className="rounded-[24px] border border-line bg-surface p-6 md:p-9">
          <h2 className="font-display text-[28px] font-bold tracking-[-0.025em] text-copy md:text-[34px]">{fit.yes.title}</h2>
          <Stagger as="ul" className="mt-6 flex flex-col gap-4">
            {fit.yes.items.map((it, i) => (
              <StaggerItem as="li" key={it} className="flex gap-3 text-[17px] text-copy">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-brand">
                  <DrawCheck className="h-4 w-4" delay={0.15 + i * 0.08} />
                </span>
                {it}
              </StaggerItem>
            ))}
          </Stagger>
          <Stagger as="ul" className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6" delay={0.2}>
            {fit.yes.sectors.map((s) => (
              <StaggerItem as="li" key={s} className="rounded-full border border-line bg-ground px-3.5 py-1.5 text-[14px] font-semibold text-copy">
                {s}
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <div className="rounded-[24px] border border-[#CBD5E1] p-6 md:p-9">
          <h2 className="font-display text-[28px] font-bold tracking-[-0.025em] text-copy md:text-[34px]">{fit.no.title}</h2>
          <Stagger as="ul" className="mt-6 flex flex-col gap-4">
            {fit.no.items.map((it) => (
              <StaggerItem as="li" key={it} className="flex gap-3 text-[17px] text-subtle">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#CBD5E1] text-subtle">
                  <X className="h-3.5 w-3.5" strokeWidth={2.4} aria-hidden />
                </span>
                {it}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}
