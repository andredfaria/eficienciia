import { Header } from '@/components/header';
import { Footer } from '@/components/sections/footer';
import { BlogPost } from '@/components/blog/blog-post';
import { getPostBySlug, generateSlug, getAllPostSlugs } from '@/lib/blog';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post não encontrado | Eficienci IA',
    };
  }

  const excerpt = post.content?.substring(0, 160) || post.raw_content?.substring(0, 160) || '';

  return {
    title: `${post.title} | Eficienci IA`,
    description: excerpt,
    keywords: [
      'IA',
      'inteligência artificial',
      'automação',
      'tecnologia',
      'inovação'
    ],
    openGraph: {
      title: post.title,
      description: excerpt,
      type: 'article',
      publishedTime: post.published_date,
      modifiedTime: post.updatedAt,
      url: `https://eficienciia.com.br/blog/${params.slug}`,
      siteName: 'Eficienci IA',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: excerpt,
    },
    alternates: {
      canonical: `https://eficienciia.com.br/blog/${params.slug}`
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.published_date).toISOString();

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <BlogPost post={post} />
        </div>
      </div>
      
      {/* Structured Data para BlogPosting */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.content?.substring(0, 200) || post.raw_content?.substring(0, 200) || '',
            image: post.url,
            datePublished: formattedDate,
            dateModified: new Date(post.updatedAt).toISOString(),
            author: {
              '@type': 'Organization',
              name: 'Eficienci IA',
              url: 'https://eficienciia.com.br'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Eficienci IA',
              url: 'https://eficienciia.com.br',
              logo: {
                '@type': 'ImageObject',
                url: 'https://eficienciia.com.br/logo.png'
              }
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://eficienciia.com.br/blog/${params.slug}`
            },
            url: `https://eficienciia.com.br/blog/${params.slug}`
          })
        }}
      />
      
      <Footer />
    </main>
  );
}
