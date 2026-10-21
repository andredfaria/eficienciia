import { Bricolage_Grotesque, Manrope } from 'next/font/google';

// next/font já usa display: swap e faz preload das fontes nas rotas que as importam
export const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  display: 'swap',
});

export const body = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
});

export const fontVars = `${display.variable} ${body.variable}`;
