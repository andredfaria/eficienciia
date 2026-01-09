import { BlogPost } from '@/types/blog';

const API_URL = 'https://n8n.eficienciia.com.br/webhook/list-blog';

/**
 * Valida se um objeto corresponde ao tipo BlogPost
 */
function isValidBlogPost(data: any): data is BlogPost {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.id === 'number' &&
    typeof data.title === 'string' &&
    typeof data.published_date === 'string' &&
    typeof data.raw_content === 'string'
  );
}

/**
 * Busca todos os posts do blog da API
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Revalida a cada 1 hora
      cache: 'default',
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Erro desconhecido');
      throw new Error(
        `Erro ao buscar posts: ${response.status} ${response.statusText}. ${errorText}`
      );
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(
        `Resposta não é JSON. Content-Type: ${contentType}`
      );
    }

    const rawData = await response.json();

    // Verifica se a resposta indica que o workflow foi iniciado (caso comum no n8n)
    if (rawData?.message && rawData.message.includes('Workflow was started')) {
      console.warn('API retornou mensagem de workflow iniciado. Possivelmente workflow assíncrono.');
      return [];
    }

    // Tenta extrair os posts de diferentes formatos de resposta
    let postsArray: any[] = [];

    if (Array.isArray(rawData)) {
      postsArray = rawData;
    } else if (rawData?.posts && Array.isArray(rawData.posts)) {
      postsArray = rawData.posts;
    } else if (rawData?.data && Array.isArray(rawData.data)) {
      postsArray = rawData.data;
    } else if (rawData?.items && Array.isArray(rawData.items)) {
      postsArray = rawData.items;
    } else if (typeof rawData === 'object' && rawData !== null) {
      // Se não encontrou array, mas tem campos esperados, pode ser um único post
      if (isValidBlogPost(rawData)) {
        postsArray = [rawData];
      } else {
        console.warn('Resposta da API não contém posts válidos:', rawData);
        return [];
      }
    } else {
      console.warn('Formato de resposta desconhecido:', rawData);
      return [];
    }

    // Valida e filtra apenas posts válidos
    const validPosts: BlogPost[] = postsArray
      .filter((post) => isValidBlogPost(post))
      .map((post) => ({
        id: post.id,
        title: post.title || '',
        url: post.url || '',
        published_date: post.published_date || '',
        score: post.score || 0,
        content: post.raw_content || '',
        raw_content: post.raw_content || '',
        count: post.count || 0,
        createdAt: post.createdAt || post.published_date || '',
        updatedAt: post.updatedAt || post.published_date || '',
      }));

    return validPosts;
  } catch (error) {
    console.error('Erro ao buscar posts do blog:', error);
    // Em ambiente de desenvolvimento, logar mais detalhes
    if (process.env.NODE_ENV === 'development') {
      console.error('Detalhes do erro:', {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
      });
    }
    return [];
  }
}

/**
 * Formata data para pt-BR
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
}

/**
 * Gera slug a partir do título
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

/**
 * Gera excerpt (resumo) do conteúdo
 */
export function generateExcerpt(content: string, maxLength: number = 200): string {
  // Remove tags HTML e quebras de linha
  const text = content
    .replace(/<[^>]*>/g, '')
    .replace(/\n/g, ' ')
    .trim();

  if (text.length <= maxLength) {
    return text;
  }

  // Encontra o último espaço antes do limite para não cortar palavras
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Busca um post específico pelo slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await fetchBlogPosts();
  return posts.find(post => generateSlug(post.title) === slug) || null;
}

/**
 * Busca todos os slugs dos posts (útil para geração estática)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await fetchBlogPosts();
  return posts.map(post => generateSlug(post.title));
}
