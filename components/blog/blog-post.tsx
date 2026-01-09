"use client";

import { BlogPost } from "@/types/blog";
import { formatDate } from "@/lib/blog";
import { Calendar, ExternalLink, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BlogPostProps {
  post: BlogPost;
}

export function BlogPost({ post }: BlogPostProps) {
  const formattedDate = formatDate(post.published_date);

  return (
    <article className="max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" className="mb-6" asChild>
        <Link href="/blog">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar para o blog
        </Link>
      </Button>

      <Card className="border-border">
        <CardHeader className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_date}>{formattedDate}</time>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {post.title}
          </h1>
          {post.url && (
            <div>
              <Button variant="outline" size="sm" asChild>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ler artigo original
                </a>
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div
            className="blog-content text-foreground space-y-6
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4 [&_h1]:text-foreground
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:text-foreground
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-foreground
              [&_p]:text-muted-foreground [&_p]:leading-relaxed [&_p]:mb-4
              [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
              [&_strong]:text-foreground [&_strong]:font-semibold
              [&_code]:text-primary [&_code]:bg-primary/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
              [&_pre]:bg-card [&_pre]:border [&_pre]:border-border [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:my-4
              [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_blockquote]:border-l-4 [&_blockquote]:border-l-primary [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground [&_blockquote]:my-4
              [&_ul]:list-disc [&_ul]:list-inside [&_ul]:text-muted-foreground [&_ul]:space-y-2 [&_ul]:my-4
              [&_ol]:list-decimal [&_ol]:list-inside [&_ol]:text-muted-foreground [&_ol]:space-y-2 [&_ol]:my-4
              [&_li]:text-muted-foreground
              [&_img]:rounded-lg [&_img]:border [&_img]:border-border [&_img]:my-4 [&_img]:max-w-full [&_img]:h-auto"
            dangerouslySetInnerHTML={{ __html: post.raw_content }}
          />
        </CardContent>
      </Card>
    </article>
  );
}
