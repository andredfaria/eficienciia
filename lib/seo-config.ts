/**
 * Configuração centralizada para SEO e performance
 * Centraliza todas as configurações relacionadas ao SEO
 */

export const SEO_CONFIG = {
  // Configurações básicas do site
  site: {
    name: 'Eficienci IA',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com..br',
    description: 'Especialistas em automação com IA para empresas brasileiras',
    locale: 'pt-BR',
    type: 'website'
  },

  // Configurações de redes sociais
  social: {
    twitter: {
      handle: '@eficienciia',
      site: '@eficienciia'
    },
    facebook: {
      appId: '123456789'
    },
    linkedin: {
      company: 'eficienci-ia'
    }
  },

  // Configurações de analytics
  analytics: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'
    },
    googleTagManager: {
      containerId: process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'
    }
  },

  // Configurações de performance
  performance: {
    // Tempo máximo de carregamento (em segundos)
    maxLoadTime: 3,
    
    // Configurações de cache
    cache: {
      static: 'public, max-age=31536000, immutable',
      dynamic: 'public, max-age=3600, s-maxage=86400',
      api: 'public, max-age=300, s-maxage=3600'
    },
    
    // Configurações de compressão
    compression: {
      gzip: true,
      brotli: true
    }
  },

  // Configurações de imagens
  images: {
    formats: ['image/webp', 'image/avif'],
    sizes: {
      thumbnail: '(max-width: 768px) 50vw, 25vw',
      hero: '100vw',
      content: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    },
    quality: {
      hero: 90,
      content: 85,
      thumbnail: 75
    }
  },

  // Configurações de structured data
  structuredData: {
    organization: {
      name: 'Eficienci IA',
      url: 'https://eficienciia.com.br',
      logo: 'https://eficienciia.com.br/logo.png',
      description: 'Especialistas em automação com IA para empresas brasileiras',
      address: {
        streetAddress: 'Rua das Inovações, 123',
        addressLocality: 'São Paulo',
        addressRegion: 'SP',
        postalCode: '01234-567',
        addressCountry: 'BR'
      },
      contactPoint: {
        telephone: '+55-11-99999-9999',
        contactType: 'customer service'
      },
      sameAs: [
        'https://www.linkedin.com/in/andre-de-faria/',
        'https://www.instagram.com/eficienci.ia/'
      ]
    }
  },

  // Configurações de sitemap
  sitemap: {
    // Páginas principais com prioridades
    pages: [
      { url: '/', priority: 1.0, changeFreq: 'weekly' }
    ]
  },

  // Configurações de robots.txt
  robots: {
    userAgent: '*',
    allow: ['/'],
    disallow: [
      '/api/',
      '/admin/',
      '/_next/',
      '/private/',
      '/*.json$',
      '/*.xml$',
      '/search?'
    ],
    sitemap: 'https://eficienciia.com.br/sitemap.xml',
    crawlDelay: 1
  },

  // Configurações de segurança
  security: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
}

/**
 * Função para gerar meta tags dinâmicas
 */
export function generateMetaTags(page: {
  title: string
  description: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
}) {
  const siteUrl = SEO_CONFIG.site.url
  const fullTitle = `${page.title} | ${SEO_CONFIG.site.name}`
  const fullUrl = page.url ? `${siteUrl}${page.url}` : siteUrl
  const fullImage = page.image ? `${siteUrl}${page.image}` : `${siteUrl}/hero-illustration.png`

  return {
    title: fullTitle,
    description: page.description,
    keywords: page.keywords?.join(', '),
    canonical: fullUrl,
    openGraph: {
      title: fullTitle,
      description: page.description,
      type: page.type || 'website',
      url: fullUrl,
      siteName: SEO_CONFIG.site.name,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: page.title
        }
      ],
      locale: SEO_CONFIG.site.locale
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: page.description,
      images: [fullImage],
      creator: SEO_CONFIG.social.twitter.handle,
      site: SEO_CONFIG.social.twitter.site
    }
  }
}

/**
 * Função para gerar structured data de serviço
 */
export function generateServiceStructuredData(service: {
  name: string
  description: string
  url: string
  image?: string
  price?: string
  priceCurrency?: string
}) {
  const siteUrl = SEO_CONFIG.site.url
  const fullImage = service.image ? `${siteUrl}${service.image}` : `${siteUrl}/hero-illustration.png`

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: `${siteUrl}${service.url}`,
    provider: {
      '@type': 'Organization',
      name: SEO_CONFIG.structuredData.organization.name,
      url: SEO_CONFIG.structuredData.organization.url
    },
    image: fullImage,
    ...(service.price && {
      offers: {
        '@type': 'Offer',
        price: service.price,
        priceCurrency: service.priceCurrency || 'BRL',
        availability: 'https://schema.org/InStock'
      }
    })
  }
}

/**
 * Função para gerar structured data de FAQ
 */
export function generateFaqStructuredData(questions: Array<{
  question: string
  answer: string
}>) {
  return {
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
}
