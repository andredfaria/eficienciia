import Script from 'next/script'

interface ServiceStructuredDataProps {
  name: string
  description: string
  url: string
  image?: string
  price?: string
  priceCurrency?: string
}

interface FaqStructuredDataProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

interface OrganizationStructuredDataProps {
  name: string
  url: string
  logo: string
  description: string
  address?: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  contactPoint?: {
    telephone: string
    contactType: string
  }
}

/**
 * Componente para structured data de serviços
 * Implementa schema.org Service para rich snippets
 */
export function ServiceStructuredData({
  name,
  description,
  url,
  image = '/hero-illustration.png',
  price,
  priceCurrency = 'BRL'
}: ServiceStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com.br'
  const fullImage = image.startsWith('http') ? image : `${siteUrl}${image}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Eficienci IA',
      url: siteUrl
    },
    image: fullImage,
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency,
        availability: 'https://schema.org/InStock'
      }
    })
  }

  return (
    <Script
      id={`service-${name.toLowerCase().replace(/\s+/g, '-')}`}
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Componente para structured data de FAQ
 * Implementa schema.org FAQPage para rich snippets
 */
export function FaqStructuredData({ questions }: FaqStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer
      }
    }))
  }

  return (
    <Script
      id="faq-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}

/**
 * Componente para structured data de organização
 * Implementa schema.org Organization para rich snippets
 */
export function OrganizationStructuredData({
  name,
  url,
  logo,
  description,
  address,
  contactPoint
}: OrganizationStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        ...address
      }
    }),
    ...(contactPoint && {
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint
      }
    }),
    sameAs: [
      'https://www.linkedin.com/in/andre-de-faria/',
      'https://www.instagram.com/eficienci.ia/'
    ]
  }

  return (
    <Script
      id="organization-structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  )
}
