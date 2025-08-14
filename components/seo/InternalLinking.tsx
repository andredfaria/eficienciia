import Link from 'next/link'

interface InternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  title?: string
  isActive?: boolean
}

interface RelatedLinksProps {
  currentPage: string
  links: Array<{
    href: string
    title: string
    description: string
  }>
}

/**
 * Componente de link interno otimizado para SEO
 * Implementa best practices para internal linking
 */
export function InternalLink({
  href,
  children,
  className = '',
  title,
  isActive = false
}: InternalLinkProps) {
  return (
    <Link
      href={href}
      className={`transition-colors duration-200 hover:text-blue-600 ${
        isActive ? 'text-blue-600 font-semibold' : 'text-slate-600 dark:text-slate-300'
      } ${className}`}
      title={title}
    >
      {children}
    </Link>
  )
}

/**
 * Componente de links relacionados para SEO
 * Melhora a navegação interna e distribuição de PageRank
 */
export function RelatedLinks({ currentPage, links }: RelatedLinksProps) {
  return (
    <section className="py-12 bg-slate-50 dark:bg-slate-800">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Páginas Relacionadas
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="block bg-white dark:bg-slate-700 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {link.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Componente de breadcrumb otimizado para SEO
 * Melhora a navegação e estrutura do site
 */
export function Breadcrumb({ items }: { items: Array<{ label: string; href?: string }> }) {
  return (
    <nav className="py-4 text-sm text-slate-600 dark:text-slate-400">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-slate-900 dark:text-white font-medium">
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}

/**
 * Componente de sitemap footer para SEO
 * Melhora a indexação e navegação do site
 */
export function SitemapFooter() {
  const sitemapLinks = {
    'Serviços': [
      { href: '/servicos', label: 'Todos os Serviços' },
      { href: '/agentes-ia', label: 'Agentes de IA' },
      { href: '/automacao-whatsapp', label: 'Automação WhatsApp' },
      { href: '/integracao-crm-erp', label: 'Integração CRM/ERP' },
      { href: '/dashboards', label: 'Dashboards' }
    ],
    'Empresa': [
      { href: '/sobre', label: 'Sobre Nós' },
      { href: '/valores', label: 'Valores' },
      { href: '/contato', label: 'Contato' }
    ],
    'Recursos': [
      { href: '/blog', label: 'Blog' },
      { href: '/casos-de-uso', label: 'Casos de Uso' },
      { href: '/faq', label: 'FAQ' }
    ]
  }

  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {Object.entries(sitemapLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-300 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; 2025 Eficienci IA. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
