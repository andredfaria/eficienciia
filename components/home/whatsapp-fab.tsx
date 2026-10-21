'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { fab, whatsappHref } from './content';
import { EASE, useReduced } from './primitives';
import { track } from './track';

/** Aparece depois que o hero sai da tela e some enquanto o formulário (#contato) está visível. */
export function WhatsAppFab() {
  const reduced = useReduced();
  const [heroVisible, setHeroVisible] = useState(true);
  const [contactVisible, setContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contato');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.target === hero) setHeroVisible(e.isIntersecting);
        if (e.target === contact) setContactVisible(e.isIntersecting);
      });
    });
    if (hero) io.observe(hero);
    if (contact) io.observe(contact);
    return () => io.disconnect();
  }, []);

  const show = !heroVisible && !contactVisible;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="group fixed bottom-5 right-5 z-50 md:bottom-7 md:right-7"
          initial={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: reduced ? 1 : 0.6 }}
          transition={{ duration: reduced ? 0.15 : 0.35, ease: EASE }}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={fab.label}
            onClick={() => track('whatsapp_click', { location: 'fab' })}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink shadow-[0_12px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-expo hover:-translate-y-1"
          >
            <MessageCircle className="h-6 w-6" strokeWidth={2} aria-hidden />
          </a>
          <span
            role="tooltip"
            className="pointer-events-none absolute right-[68px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-[10px] bg-ink px-3 py-2 text-[14px] font-semibold text-white opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100 md:block"
          >
            {fab.tooltip}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
