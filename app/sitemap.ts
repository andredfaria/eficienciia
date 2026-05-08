import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com.br'

  const lastModified = new Date()

  const routes = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0
    },
    {
      url: `${siteUrl}/blog`,
      lastModified,
      changeFrequency: 'daily' as const,
      priority: 0.8
    },
    {
      url: `${siteUrl}/valores`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    },
    {
      url: `${siteUrl}/project`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.5
    }
  ]
  
  return routes
}
