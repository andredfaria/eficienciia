'use client';

import dynamic from 'next/dynamic';

// seções abaixo da dobra em chunks separados (continuam renderizadas no servidor)
export const Leaks = dynamic(() => import('./leaks').then((m) => m.Leaks));
export const Method = dynamic(() => import('./method').then((m) => m.Method));
export const BeforeAfter = dynamic(() => import('./before-after').then((m) => m.BeforeAfter));
export const Solutions = dynamic(() => import('./solutions').then((m) => m.Solutions));
export const Offer = dynamic(() => import('./offer').then((m) => m.Offer));
export const Testimonials = dynamic(() => import('./testimonials').then((m) => m.Testimonials));
export const Fit = dynamic(() => import('./fit').then((m) => m.Fit));
export const Faq = dynamic(() => import('./faq').then((m) => m.Faq));
export const FinalCta = dynamic(() => import('./final-cta').then((m) => m.FinalCta));
export const Footer = dynamic(() => import('./footer').then((m) => m.Footer));
export const WhatsAppFab = dynamic(() => import('./whatsapp-fab').then((m) => m.WhatsAppFab), { ssr: false });
