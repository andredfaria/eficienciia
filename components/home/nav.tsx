'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { landingPages, nav } from './content/shared';
import { Container, CtaLink, EASE, Logo, useReduced } from './primitives';

/**
 * Header único do site. Nas landing pages os links são âncoras da própria página;
 * nas páginas internas (calculadora, blog…) passe anchorBase="/" para apontarem para a home.
 */
export function Nav({ anchorBase = '' }: { anchorBase?: string }) {
  const reduced = useReduced();
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [active, setActive] = useState('');
  const solutionsRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    // depois de 300 px: esconde rolando para baixo, reaparece rolando para cima
    if (y < 300 || y < prev) setHidden(false);
    else if (y > prev + 4) {
      setHidden(true);
      setSolutionsOpen(false);
    }
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
  }, [pathname]);

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

  // fecha o menu "Soluções" ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!solutionsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!solutionsRef.current?.contains(e.target as Node)) setSolutionsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSolutionsOpen(false);
    document.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [solutionsOpen]);

  useEffect(() => {
    setOpen(false);
    setSolutionsOpen(false);
  }, [pathname]);

  const anchor = (href: string) => `${anchorBase}${href}`;

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
          <Link href="/" aria-label="Eficienci IA, página inicial" className="shrink-0">
            <Logo />
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
            <div ref={solutionsRef} className="relative">
              <button
                type="button"
                aria-expanded={solutionsOpen}
                aria-controls="menu-solucoes"
                onClick={() => setSolutionsOpen((o) => !o)}
                className={cn(
                  'flex min-h-[44px] items-center gap-1 px-3 text-[15px] font-semibold transition-colors duration-200',
                  solutionsOpen ? 'text-white' : 'text-subtle-dark hover:text-white'
                )}
              >
                {nav.solutionsLabel}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform duration-200', solutionsOpen && 'rotate-180')}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {solutionsOpen && (
                  <motion.ul
                    id="menu-solucoes"
                    initial={{ opacity: 0, y: reduced ? 0 : -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduced ? 0 : -6 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className="absolute left-0 top-[calc(100%+8px)] w-[340px] rounded-[18px] border border-ink-line bg-ink-2 p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)]"
                  >
                    {landingPages.map((p) => {
                      const current = pathname === p.href;
                      return (
                        <li key={p.href}>
                          <Link
                            href={p.href}
                            aria-current={current ? 'page' : undefined}
                            onClick={() => setSolutionsOpen(false)}
                            className={cn(
                              'block rounded-[12px] px-3.5 py-3 transition-colors duration-200 hover:bg-white/[0.05]',
                              current && 'bg-white/[0.05]'
                            )}
                          >
                            <span className="flex items-center gap-2 text-[15px] font-bold text-white">
                              {p.label}
                              {current && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />}
                            </span>
                            <span className="mt-0.5 block text-[13px] text-subtle-dark">{p.description}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {nav.links.map((l) => {
              const isActive = !anchorBase && active === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={anchor(l.href)}
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
            <CtaLink href={anchor(nav.cta.href)} location="nav" className="hidden px-5 text-[15px] sm:inline-flex">
              {nav.cta.label}
            </CtaLink>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-[12px] border border-ink-line text-white lg:hidden"
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
            className="fixed inset-0 z-[55] flex flex-col overflow-y-auto bg-ink px-6 pb-10 pt-[92px] lg:hidden"
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
              variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.05, delayChildren: 0.05 } } }}
            >
              {nav.links.map((l) => (
                <motion.a
                  key={l.href}
                  href={anchor(l.href)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-[56px] items-center border-b border-ink-line font-display text-[26px] font-bold tracking-[-0.02em] text-white"
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 20 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                  }}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.p
                className="ef-eyebrow mb-2 mt-8"
                variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }}
              >
                {nav.solutionsLabel}
              </motion.p>
              {landingPages.map((p) => (
                <motion.div
                  key={p.href}
                  variants={{
                    hidden: { opacity: 0, y: reduced ? 0 : 16 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
                  }}
                >
                  <Link
                    href={p.href}
                    aria-current={pathname === p.href ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[48px] items-center gap-2 text-[17px] font-semibold text-subtle-dark aria-[current=page]:text-white"
                  >
                    {p.label}
                    {pathname === p.href && <span className="h-1.5 w-1.5 rounded-full bg-brand" aria-hidden />}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
            <CtaLink
              href={anchor(nav.cta.href)}
              location="nav_mobile"
              size="lg"
              className="mt-10 w-full"
              onClick={() => setOpen(false)}
            >
              {nav.cta.label}
            </CtaLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
