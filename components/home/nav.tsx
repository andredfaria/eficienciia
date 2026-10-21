'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { nav } from './content';
import { Container, CtaLink, EASE, Logo, useReduced } from './primitives';

export function Nav() {
  const reduced = useReduced();
  const { scrollY, scrollYProgress } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // depois de 300 px: esconde rolando para baixo, reaparece rolando para cima
    if (y < 300 || y < prev) setHidden(false);
    else if (y > prev + 4) setHidden(true);
  });

  // link da seção visível em destaque
  useEffect(() => {
    const ids = ['hero', ...nav.links.map((l) => l.href.slice(1))];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id === 'hero' ? '' : e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      html.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-brand"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[60] border-b transition-[transform,background-color,border-color] duration-300 ease-expo',
          solid || open ? 'border-ink-line bg-ink/[0.85] backdrop-blur-[12px]' : 'border-transparent bg-transparent',
          hidden && !open && !reduced ? '-translate-y-full' : 'translate-y-0'
        )}
      >
        <Container className="flex h-[68px] items-center justify-between gap-4">
          <a href="#hero" aria-label="Eficienci IA, voltar ao início" className="text-white">
            <Logo />
          </a>

          <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
            {nav.links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'relative flex min-h-[44px] items-center px-3 text-[15px] font-semibold transition-colors duration-200',
                    isActive ? 'text-white' : 'text-subtle-dark hover:text-white'
                  )}
                >
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 bottom-2 h-[2px] rounded-full bg-brand"
                      transition={{ duration: 0.3, ease: EASE }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <CtaLink href={nav.cta.href} location="nav" className="hidden px-5 text-[15px] sm:inline-flex">
              {nav.cta.label}
            </CtaLink>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-ink-line text-white md:hidden"
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[55] flex flex-col bg-ink px-6 pb-10 pt-[100px] md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.15 : 0.3, ease: EASE }}
          >
            <motion.nav
              aria-label="Menu"
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.06, delayChildren: 0.05 } } }}
            >
              {nav.links.map((l) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[60px] items-center border-b border-ink-line font-display text-[30px] font-bold tracking-[-0.02em] text-white"
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
            </motion.nav>
            <CtaLink href={nav.cta.href} location="nav_mobile" size="lg" className="mt-auto w-full" onClick={() => setOpen(false)}>
              {nav.cta.label}
            </CtaLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
