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
import { OrganizationStructuredData, FaqStructuredData } from '@/components/seo/StructuredData'

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

      <FaqStructuredData questions={[
        {
          question: 'O que é um agente de IA e como ele pode ajudar minha empresa?',
          answer: 'Um agente de IA é um software autônomo que executa tarefas repetitivas — como responder clientes no WhatsApp, qualificar leads, enviar e-mails e atualizar seu CRM — sem intervenção humana. Ele funciona 24 horas por dia, 7 dias por semana, com consistência e velocidade superiores ao trabalho manual.'
        },
        {
          question: 'Quanto custa implementar automação com IA em uma empresa?',
          answer: 'O investimento varia conforme a complexidade dos processos. Na Eficienci IA, iniciamos com um diagnóstico gratuito para mapear onde a IA gera mais impacto no seu negócio, e então apresentamos uma proposta personalizada. A maioria dos clientes vê retorno sobre o investimento já nos primeiros 60 a 90 dias.'
        },
        {
          question: 'Quanto tempo leva para implementar uma automação com IA?',
          answer: 'Automatizações simples, como atendimento automático no WhatsApp, podem ser implementadas em 1 a 2 semanas. Projetos mais complexos com integrações entre CRM, ERP e múltiplos canais levam de 4 a 8 semanas. Trabalhamos com entregas incrementais para que você veja resultados rapidamente.'
        },
        {
          question: 'A Eficienci IA atende pequenas e médias empresas?',
          answer: 'Sim. Atendemos empresas de todos os portes no Brasil. Pequenas e médias empresas são nosso foco principal — o objetivo é colocar tecnologia de ponta ao alcance de negócios que não têm time de TI próprio, com soluções práticas e ROI mensurável.'
        },
        {
          question: 'É possível automatizar o atendimento no WhatsApp sem perder o toque humano?',
          answer: 'Sim. Nossos agentes de IA são treinados com a linguagem e os valores da sua empresa. Eles resolvem as demandas rotineiras automaticamente e transferem para um atendente humano apenas quando necessário — preservando a experiência do cliente e liberando sua equipe para casos que realmente exigem atenção humana.'
        }
      ]} />

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
