import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'Eficienci IA',
  title: {
    default: 'Eficienci IA | Automatize seu negócio com IA',
    template: '%s | Eficienci IA'
  },
  description:
    'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
  keywords: [
    'agentes de IA',
    'agente autônomo',
    'automação com IA',
    'assistente virtual',
    'IA no WhatsApp',
    'integração CRM ERP',
    'remarketing automático',
    'coleta de dados',
    'dashboard de performance',
    'RPA',
    'LLM',
    'automação de atendimento',
    'automação de e-mail'
  ],
  authors: [{ name: 'Eficienci IA' }],
  creator: 'Eficienci IA',
  publisher: 'Eficienci IA',
  category: 'technology',
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Eficienci IA',
    title: 'Eficienci IA | Automatize seu negócio com IA',
    description:
      'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
    locale: 'pt_BR',
    images: [
      {
        url: '/hero-illustration.png',
        width: 1200,
        height: 630,
        alt: 'Eficienci IA — agentes de IA e automação empresarial'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eficienci IA | Automatize seu negócio com IA',
    description:
      'Agentes de IA e automações para WhatsApp, e-mail e CRM. Integrações entre CRM e ERP, remarketing, coleta e estruturação de dados, dashboards e atendimento automático 24/7.',
    images: ['/hero-illustration.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1
    }
  },
  alternates: {
    canonical: siteUrl
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark scroll-smooth overflow-x-hidden">
      <body className={`${inter.className} antialiased overflow-x-hidden selection:bg-primary/20 selection:text-foreground`}>
        {children}
        <Toaster />
        <Script
          id="ld-json-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Eficienci IA',
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              sameAs: ['https://linkedin.com']
            })
          }}
        />
        <Script
          id="ld-json-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Eficienci IA',
              url: siteUrl,
              inLanguage: 'pt-BR'
            })
          }}
        />
      </body>
    </html>
  );
}