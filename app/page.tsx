import { Metadata } from 'next'
import { HeroSection } from '@/components/sections/hero-section';
import { MethodologySection } from '@/components/sections/methodology-section';
import { ProblemSolutionSection } from '@/components/sections/problem-solution-section';
import { ContactSection } from '@/components/sections/contact-section';
import { Footer } from '@/components/sections/footer';
import { Header } from '@/components/header';
import { OrganizationStructuredData } from '@/components/seo/StructuredData'
import { ServicesSection } from '@/components/sections/services-section';

export const metadata: Metadata = {
  title: 'Eficienci IA | Automatize seu negócio com IA',
  description: 'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
  keywords: [
    'agentes de IA',
    'automação com IA',
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
    'processamento de linguagem natural',
    'machine learning empresarial'
  ],
  openGraph: {
    title: 'Eficienci IA | Automatize seu negócio com IA',
    description: 'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
    type: 'website',
    url: 'https://eficienciia.com..br',
    siteName: 'Eficienci IA',
    images: [
      {
        url: '/hero-illustration.png',
        width: 1200,
        height: 630,
        alt: 'Eficienci IA — agentes de IA e automação empresarial'
      }
    ],
    locale: 'pt_BR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eficienci IA | Automatize seu negócio com IA',
    description: 'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
    images: ['/hero-illustration.png']
  },
  alternates: {
    canonical: 'https://eficienciia.com..br'
  }
}

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative">
      {/* Structured Data para organização */}
      <OrganizationStructuredData
        name="Eficienci IA"
        url="https://eficienciia.com..br"
        logo="https://eficienciia.com..br/logo.png"
        description="Especialistas em automação com IA para empresas brasileiras"
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
      
      {/* Tech grid background */}
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-[0.35]" />
      <Header />
      <HeroSection />
      <ServicesSection />
      <MethodologySection />
      <ProblemSolutionSection />
      <ContactSection />
      <Footer />
    </main>
  );
}