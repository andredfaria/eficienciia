import { Metadata } from 'next';
import { OrganizationStructuredData, FaqStructuredData, ServiceStructuredData } from '@/components/seo/StructuredData';
import { fontVars } from '@/components/home/fonts';
import { faq, seo, site } from '@/components/home/content';
import { LeadProvider } from '@/components/home/lead-context';
import { SmoothScroll } from '@/components/home/smooth-scroll';
import { Nav } from '@/components/home/nav';
import { Hero } from '@/components/home/hero';
import { ProofBar } from '@/components/home/proof-bar';
import {
  BeforeAfter,
  Faq,
  FinalCta,
  Fit,
  Footer,
  Leaks,
  Method,
  Offer,
  Solutions,
  Testimonials,
  WhatsAppFab,
} from '@/components/home/lazy-sections';


export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: 'website',
    url: site.url,
    siteName: 'Eficienci IA',
    images: [{ url: '/hero-illustration.png', width: 1200, height: 630, alt: seo.title }],
    locale: 'pt_BR',
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: ['/hero-illustration.png'],
  },
  alternates: { canonical: site.url },
};

export default function Home() {
  return (
    <div className={`ef ${fontVars}`}>
      <OrganizationStructuredData
        name="Eficienci IA"
        url={site.url}
        logo={`${site.url}/logo.png`}
        description={site.tagline}
        address={{
          streetAddress: 'Rua Assis Figueiredo, 1000',
          addressLocality: 'Poços de Caldas',
          addressRegion: 'MG',
          postalCode: '37701-000',
          addressCountry: 'BR',
        }}
        contactPoint={{ telephone: '+55-35-99140-4064', contactType: 'customer service' }}
      />
      <ServiceStructuredData
        name="Diagnóstico Comercial com IA"
        description="Mapeamento do processo comercial no WhatsApp e no CRM, com relatório dos pontos de perda, retorno estimado e plano de implementação de agentes de IA. Valor 100% abatido na implementação."
        url="/#oferta"
        price="100"
      />
      <FaqStructuredData questions={faq.items.map((i) => ({ question: i.q, answer: i.a }))} />
      {/* sem JS, nada fica escondido esperando animação */}
      <noscript>
        <style>{`.ef [style*="opacity:0"],.ef [style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <SmoothScroll />
      <LeadProvider>
        <Nav />
        <main>
          <Hero />
          <ProofBar />
          <Leaks />
          <Method />
          <BeforeAfter />
          <Solutions />
          <Offer />
          <Testimonials />
          <Fit />
          <Faq />
          <FinalCta />
        </main>
        <Footer />
        <WhatsAppFab />
      </LeadProvider>
    </div>
  );
}
