'use client';

import { Fragment, useRef, type CSSProperties } from 'react';
import { useMotionValue, useScroll, useSpring } from 'framer-motion';
import { useContent } from './content-context';
import { HeroDemo } from './hero-demo';
import { Container, CtaLink, useFinePointer, useReduced } from './primitives';

export function Hero() {
  const { hero } = useContent();
  const ref = useRef<HTMLElement>(null);
  const fine = useFinePointer();
  const reduced = useReduced();
  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const parallax = fine && !reduced;

  const words = hero.title.split(' ');

  return (
    <section
      ref={ref}
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-ink pb-16 pt-[112px] md:pb-24 md:pt-[136px]"
      onMouseMove={
        parallax
          ? (e) => {
              mx.set((e.clientX / window.innerWidth) * 2 - 1);
              my.set((e.clientY / window.innerHeight) * 2 - 1);
            }
          : undefined
      }
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
    >
      <div aria-hidden className="ef-dots pointer-events-none absolute inset-0" />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12">
        <div>
          <p className="ef-rise mb-7 inline-flex items-center gap-2.5 rounded-full border border-ink-line bg-ink-2 px-3.5 py-2 text-[12px] font-bold uppercase leading-tight tracking-[0.08em] text-brand-soft sm:text-[13px]">
            <span className="ef-pulse relative h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden />
            {hero.eyebrow}
          </p>
          <h1 id="hero-title" className="ef-h1 text-white">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="ef-word" style={{ '--i': i } as CSSProperties}>
                  {w}
                </span>
                {i < words.length - 1 ? ' ' : ''}
              </Fragment>
            ))}
          </h1>
          <p className="ef-rise mt-6 max-w-[580px] text-[18px] leading-[1.55] text-subtle-dark md:text-[19px]" style={{ '--d': '480ms' } as CSSProperties}>
            {hero.subtitle}
          </p>
          <div className="ef-rise mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ '--d': '600ms' } as CSSProperties}>
            <CtaLink href={hero.primary.href} location="hero" size="lg" arrow magnetic>
              {hero.primary.label}
            </CtaLink>
            <CtaLink href={hero.secondary.href} location="hero" size="lg" variant="ghostDark">
              {hero.secondary.label}
            </CtaLink>
          </div>
          <p className="ef-rise mt-5 text-[14px] leading-relaxed text-subtle-dark" style={{ '--d': '700ms' } as CSSProperties}>
            {hero.micro.join(' · ')}
          </p>
        </div>

        <div className="ef-rise" style={{ '--d': '820ms' } as CSSProperties}>
          <HeroDemo mx={mx} my={my} scrollProgress={scrollYProgress} />
        </div>
      </Container>
    </section>
  );
}
