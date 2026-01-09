import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { BlogCard } from '@/components/blog/blog-card';
import { fetchBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog | Eficienci IA",
  description:
    "Artigos sobre IA, automação, tecnologia e inovação. Mantenha-se atualizado com as últimas tendências em inteligência artificial e automação de processos.",
  keywords: [
    'blog IA',
    'artigos inteligência artificial',
    'automação processos',
    'tecnologia inovação',
    'IA empresarial',
    'artigos tecnologia'
  ],
  openGraph: {
    title: 'Blog | Eficienci IA',
    description: 'Artigos sobre IA, automação, tecnologia e inovação.',
    type: 'website',
    url: 'https://eficienciia.com.br/blog',
    siteName: 'Eficienci IA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | Eficienci IA',
    description: 'Artigos sobre IA, automação, tecnologia e inovação.',
  },
  alternates: {
    canonical: 'https://eficienciia.com.br/blog'
  }
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Artigos sobre IA, automação, tecnologia e inovação. Mantenha-se atualizado com as últimas tendências.
            </p>
          </div>

          {!Array.isArray(posts) ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Erro ao carregar posts. Por favor, tente novamente mais tarde.
              </p>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum post encontrado no momento.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
}
