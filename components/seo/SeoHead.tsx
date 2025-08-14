import Head from 'next/head'
import { ReactNode } from 'react'

interface SeoHeadProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  structuredData?: object
  children?: ReactNode
}

/**
 * Componente SEO reutilizável para otimização de meta tags
 * Implementa best practices para SEO técnico
 */
export function SeoHead({
  title,
  description,
  keywords = [],
  canonical,
  ogImage = '/hero-illustration.png',
  ogType = 'website',
  structuredData,
  children
}: SeoHeadProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com.br'
  const fullTitle = `${title} | Eficienci IA`
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`

  return (
    <Head>
      {/* Meta tags básicas */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content="Eficienci IA" />
      <meta property="og:locale" content="pt_BR" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Preload de recursos críticos */}
      <link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      <link rel="preload" href={fullOgImage} as="image" />
      
      {children}
    </Head>
  )
}
