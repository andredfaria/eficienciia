import { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { Calculator } from '@/components/calculator/calculator';

export const metadata: Metadata = {
  title: 'Calculadora de Eficiência | Eficienci IA',
  description:
    'Descubra em 2 minutos quanto sua operação pode economizar com automação: estimativa de horas, custo e ROI, com a recomendação certa para o seu momento.',
  alternates: { canonical: 'https://eficienciia.com.br/calculadora' },
};

export default function CalculadoraPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen bg-background py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.16]" />
        <div className="container relative mx-auto px-4">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-2xl md:text-4xl font-bold">
              Quanto sua operação pode economizar com automação?
            </h1>
            <p className="mx-auto max-w-2xl text-sm md:text-lg text-muted-foreground">
              Responda 7 perguntas rápidas e receba uma estimativa de economia de tempo,
              custo e ROI — com a recomendação certa para o seu momento.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">≈ 2 minutos · sem compromisso</p>
          </div>
          <Calculator />
        </div>
      </main>
      <Footer />
    </>
  );
}
