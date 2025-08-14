import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://eficienciia.com..br'
  
  // Data de última modificação (atualizada semanalmente)
  const lastModified = new Date()
  
  // Estrutura de páginas com prioridades SEO
  const routes = [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 1.0 // Página principal - máxima prioridade
    }
    // Adicione outras páginas reais aqui quando criadas
    // Exemplo:
    // {
    //   url: `${siteUrl}/servicos`,
    //   lastModified,
    //   changeFrequency: 'weekly' as const,
    //   priority: 0.9
    // }
  ]
  
  return routes
}
