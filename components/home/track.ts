// Eventos de conversão. GA4 e Meta Pixel são carregados no layout a partir de variáveis de ambiente.
type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export function track(event: 'cta_click' | 'calculator_click' | 'whatsapp_click' | 'generate_lead', params: Params = {}) {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', event, params);
  if (event === 'generate_lead') window.fbq?.('track', 'Lead', params);
  else window.fbq?.('trackCustom', event, params);
}

/** Escolhe o evento certo a partir do destino do link. */
export function trackLink(href: string, location: string) {
  if (href.includes('wa.me')) track('whatsapp_click', { location });
  else if (href.includes('/calculadora')) track('calculator_click', { location });
  else track('cta_click', { location });
}
