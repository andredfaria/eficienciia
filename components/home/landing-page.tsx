import type { Metadata } from 'next';
import { OrganizationStructuredData, FaqStructuredData, ServiceStructuredData } from '@/components/seo/StructuredData';
import { fontVars } from './fonts';
import { site } from './content/shared';
import type { LandingContent } from './content/types';
import { ContentProvider } from './content-context';
import { LeadProvider } from './lead-context';
import { SmoothScroll } from './smooth-scroll';
import { Nav } from './nav';
import { Hero } from './hero';
import { ProofBar } from './proof-bar';
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
} from './lazy-sections';

/** Metadados de uma versão da landing page. */
export function landingMetadata(content: LandingContent): Metadata {
  const url = `${site.url}${content.path === '/' ? '' : content.path}`;
  const { title, description } = content.seo;
  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: 'Eficienci IA',
      images: [{ url: '/hero-illustration.png', width: 1200, height: 630, alt: title }],
      locale: 'pt_BR',
    },
    twitter: { card: 'summary_large_image', title, description, images: ['/hero-illustration.png'] },
    alternates: { canonical: url },
  };
}

/** Todas as versões usam a mesma estrutura; só o conteúdo muda. */
export function LandingPage({ content }: { content: LandingContent }) {
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
        name={content.service.name}
        description={content.service.description}
        url={content.path === '/' ? '/#oferta' : `${content.path}#oferta`}
        price="100"
      />
      <FaqStructuredData questions={content.faq.items.map((i) => ({ question: i.q, answer: i.a }))} />
      {/* sem JS, nada fica escondido esperando animação */}
      <noscript>
        <style>{`.ef [style*="opacity:0"],.ef [style*="opacity: 0"]{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <SmoothScroll />
      <ContentProvider content={content}>
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
      </ContentProvider>
    </div>
  );
}
