'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const NAV_OFFSET = -72;

/** Lenis só no desktop com mouse e sem prefers-reduced-motion. Também cuida dos links âncora (#...). */
export function SmoothScroll() {
  useEffect(() => {
    const desktop = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 768px)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lenis = desktop && !reduced ? new Lenis({ duration: 1.1 }) : null;

    let raf = 0;
    if (lenis) {
      const loop = (t: number) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const id = a.getAttribute('href')!.slice(1);
      const el = id ? document.getElementById(id) : null;
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el, { offset: NAV_OFFSET });
      else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
      history.replaceState(null, '', `#${id}`);
      // leva o foco para a seção para quem navega por teclado
      el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);

  return null;
}
