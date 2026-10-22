import type { form, offer, proof, testimonials } from './shared';

export type SolutionAnim = 'clock' | 'followup' | 'table' | 'handoff' | 'funnel' | 'merge';

/** Formato de uma versão da landing page. Todas as versões usam os mesmos componentes. */
export type LandingContent = {
  slug: string;
  path: string;
  seo: { title: string; description: string };
  /** Serviço descrito no JSON-LD da página */
  service: { name: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: { href: string; label: string };
    secondary: { href: string; label: string };
    micro: string[];
    demo: {
      header: string;
      status: string;
      tag: string;
      /** Exatamente 5 mensagens, alternando cliente/agente: cliente, agente, cliente, agente, cliente */
      messages: { from: 'lead' | 'agent'; text: string }[];
      crm: {
        label: string;
        badge: string;
        title: string;
        /** Exatamente 4 campos */
        fields: { key: string; value: string }[];
      };
    };
  };
  proof: typeof proof;
  leaks: {
    eyebrow: string;
    title: string;
    support: string;
    counterLabel: string;
    checkHint: string;
    items: string[];
    /** {n} é trocado pela quantidade marcada */
    result: string;
    resultCta: string;
  };
  method: {
    eyebrow: string;
    titleBefore: string;
    titleScramble: string;
    titleAfter: string;
    support: string;
    loopLabel: string;
    steps: { title: string; text: string }[];
  };
  beforeAfter: {
    title: string;
    tag: string;
    modes: { id: string; label: string; events: { time: string; text: string }[]; status: string; positive: boolean }[];
  };
  solutions: {
    eyebrow: string;
    title: string;
    cards: { title: string; text: string; result: string; anim: SolutionAnim; href?: string; linkLabel?: string }[];
  };
  offer: typeof offer;
  testimonials: typeof testimonials;
  fit: {
    yes: { title: string; items: string[]; sectors: string[] };
    no: { title: string; items: string[] };
  };
  faq: { title: string; items: { q: string; a: string }[] };
  finalCta: {
    title: string;
    support: string;
    checks: string[];
    whatsappLead: string;
    whatsappLink: string;
    form: typeof form;
  };
};
