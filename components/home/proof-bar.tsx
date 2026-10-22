'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, motion, useInView } from 'framer-motion';
import { useContent } from './content-context';
import { Container, EASE, Stagger, StaggerItem, useReduced } from './primitives';

export function ProofBar() {
  const { proof } = useContent();
  return (
    <section aria-label="Resultados em números" className="bg-ink pb-16 md:pb-20">
      <Container>
        <div className="border-t border-ink-line pt-12 md:pt-14">
          <dl className="grid gap-10 md:grid-cols-3 md:gap-8">
            {proof.stats.map((s) => (
              <div key={s.text}>
                <dt className="font-display text-[48px] font-extrabold leading-none tracking-[-0.03em] text-white md:text-[56px]">
                  {s.static ? <RevealChars text={s.static} /> : <CountUp prefix={s.prefix!} value={s.value!} suffix={s.suffix!} />}
                </dt>
                <dd className="mt-3 max-w-[320px] text-[16px] text-subtle-dark">{s.text}</dd>
              </div>
            ))}
          </dl>

          <Stagger className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-subtle-dark">
            <StaggerItem as="span">{proof.clientsLabel}</StaggerItem>
            {proof.clients.map((c, i) => (
              <StaggerItem as="span" key={c} className="font-display text-[17px] font-bold tracking-[-0.01em] text-white">
                {c}
                {i < proof.clients.length - 1 && <span className="ml-3 font-body font-normal text-ink-line" aria-hidden>·</span>}
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Container>
    </section>
  );
}

function CountUp({ prefix, value, suffix }: { prefix: string; value: number; suffix: string }) {
  const reduced = useReduced();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  // SSR mostra o valor final; o count-up só começa depois de montar
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    if (reduced) return;
    if (!inView && !armed) {
      setN(0);
      setArmed(true);
    }
  }, [reduced, inView, armed]);

  useEffect(() => {
    if (reduced || !inView) return;
    const controls = animate(0, value, { duration: 1.2, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">{`${prefix}${value}${suffix}`}</span>
      <span aria-hidden>
        {prefix}
        {n}
        {suffix}
      </span>
    </span>
  );
}

function RevealChars({ text }: { text: string }) {
  const reduced = useReduced();
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
      variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.12 } } }}
    >
      <span className="sr-only">{text}</span>
      {text.split('').map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: reduced ? 0.15 : 0.5 } } }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}
