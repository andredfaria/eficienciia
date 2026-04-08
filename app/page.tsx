import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section';
import { ServicesSection } from '@/components/sections/services-section';
import { SectorsSection } from '@/components/sections/sectors-section';
import { MethodologySection } from '@/components/sections/methodology-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/header';
import { OrganizationStructuredData } from '@/components/seo/StructuredData'

export const metadata: Metadata = {
  title: 'Eficienci IA | Consultoria Especializada em IA',
  description: 'Consultoria especializada em IA: do diagnóstico à operação. Automação de processos, agentes de IA e integrações para WhatsApp, CRM e ERP com foco em eficiência, escala e ROI mensurável.',
  keywords: [
    'consultoria em IA',
    'consultoria inteligência artificial',
    'automação com IA',
    'agentes de IA',
    'automação WhatsApp',
    'integração CRM ERP',
    'dashboard de performance',
    'atendimento automático',
    'RPA com IA',
    'automação de processos',
    'inteligência artificial empresarial',
    'solução de IA para empresas',
    'automação de vendas',
    'chatbot inteligente',
  ],
  openGraph: {
    title: 'Eficienci IA | Consultoria Especializada em IA',
    description: 'Do diagnóstico à operação: identificamos onde a IA gera mais impacto no seu negócio e implementamos com foco em eficiência, escala e ROI mensurável.',
    type: 'website',
    url: 'https://eficienciia.com.br',
    siteName: 'Eficienci IA',
    images: [
      {
        url: '/hero-illustration.png',
        width: 1200,
        height: 630,
        alt: 'Eficienci IA — Consultoria especializada em IA'
      }
    ],
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eficienci IA | Consultoria Especializada em IA',
    description: 'Do diagnóstico à operação: IA que gera resultado real para o seu negócio.',
    images: ['/hero-illustration.png']
  },
  alternates: {
    canonical: 'https://eficienciia.com.br'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      <OrganizationStructuredData
        name="Eficienci IA"
        url="https://eficienciia.com.br"
        logo="https://eficienciia.com.br/logo.png"
        description="Consultoria especializada em IA para empresas brasileiras — do diagnóstico à operação"
        address={{
          streetAddress: "Rua Assis Figueiredo, 1000",
          addressLocality: "Poços de Caldas",
          addressRegion: "MG",
          postalCode: "37701-000",
          addressCountry: "BR"
        }}
        contactPoint={{
          telephone: "+55-35-99140-4064",
          contactType: "customer service"
        }}
      />

      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />
      <Header />
      <HeroSection />
      <ServicesSection />
      <SectorsSection />
      <MethodologySection />
      <ProblemSolutionSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
