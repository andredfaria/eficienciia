'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { trackLink } from './track';

export const EASE = [0.22, 1, 0.36, 1] as const;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [query]);
  return matches;
}

export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)');
export const useReduced = () => useReducedMotion() ?? false;

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1228px] px-6', className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn('ef-eyebrow mb-4', className)}>{children}</p>;
}

/* ---------------- revelação ao entrar na tela ---------------- */

type Tag = 'div' | 'ul' | 'ol' | 'li' | 'p' | 'span';

export function Stagger({
  as = 'div',
  className,
  children,
  delay = 0,
  amount = 0.2,
}: {
  as?: Tag;
  className?: string;
  children: ReactNode;
  delay?: number;
  amount?: number;
}) {
  const reduced = useReduced();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({ as = 'div', className, children }: { as?: Tag; className?: string; children: ReactNode }) {
  const reduced = useReduced();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: reduced ? 0.15 : 0.6, ease: EASE } },
      }}
    >
      {children}
    </Comp>
  );
}

export function Reveal({ as = 'div', className, children, delay = 0 }: { as?: Tag; className?: string; children: ReactNode; delay?: number }) {
  return (
    <Stagger as={as} className={className} delay={delay}>
      <StaggerItem>{children}</StaggerItem>
    </Stagger>
  );
}

/* ---------------- botões / CTAs ---------------- */

const variants = {
  primary: 'bg-brand text-ink hover:bg-[#67E8F9]',
  ghostDark: 'border border-ink-line text-white hover:border-brand/70 hover:bg-white/[0.04]',
  dark: 'bg-ink text-white hover:bg-ink-2',
  outlineLight: 'border border-line bg-surface text-copy hover:border-brand-ink',
};

export function CtaLink({
  href,
  children,
  location,
  variant = 'primary',
  size = 'md',
  arrow = false,
  magnetic = false,
  className,
  onClick,
}: {
  href: string;
  children: ReactNode;
  location: string;
  variant?: keyof typeof variants;
  size?: 'md' | 'lg';
  arrow?: boolean;
  magnetic?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const fine = useFinePointer();
  const reduced = useReduced();
  const isMagnetic = magnetic && fine && !reduced;
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const ref = useRef<HTMLSpanElement>(null);

  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-[14px] px-6 text-center text-[16px] font-bold leading-tight transition-colors duration-200',
    size === 'lg' ? 'min-h-[54px] px-7' : 'min-h-[48px]',
    variants[variant],
    className
  );

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight
          className="h-[18px] w-[18px] shrink-0 transition-transform duration-200 ease-expo group-hover:translate-x-1"
          strokeWidth={2}
          aria-hidden
        />
      )}
    </>
  );

  const handleClick = () => {
    trackLink(href, location);
    onClick?.();
  };

  const external = href.startsWith('http');
  const link = href.startsWith('/') ? (
    <Link href={href} className={classes} onClick={handleClick}>
      {content}
    </Link>
  ) : (
    <a
      href={href}
      className={classes}
      onClick={handleClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  );

  if (!isMagnetic) return link;

  return (
    <motion.span
      ref={ref}
      className="inline-flex"
      style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        x.set(Math.max(-1, Math.min(1, dx)) * 6);
        y.set(Math.max(-1, Math.min(1, dy)) * 6);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {link}
    </motion.span>
  );
}

/* ---------------- ícones ---------------- */

/** Logo da marca: o wordmark em degradê ciano → azul-acinzentado com brilho, igual ao site anterior. */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn('inline-block text-[24px] font-bold leading-none tracking-[-0.02em]', className)}
      style={{
        fontFamily: 'var(--font-inter), system-ui, sans-serif',
        textShadow: '0 0 6px hsl(190 95% 62% / 0.8), 0 0 14px hsl(190 95% 62% / 0.45), 0 0 28px hsl(190 95% 62% / 0.25)',
      }}
    >
      <span className="bg-gradient-to-r from-[hsl(190,95%,62%)] to-[hsl(198,32%,78%)] bg-clip-text text-transparent">Eficienci IA</span>
    </span>
  );
}

/** Check que se desenha (pathLength) ao entrar na tela. */
export function DrawCheck({ className, delay = 0 }: { className?: string; delay?: number }) {
  const reduced = useReduced();
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('h-5 w-5 shrink-0', className)} aria-hidden>
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduced ? 1 : 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      />
    </svg>
  );
}
