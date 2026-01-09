"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BlogPost } from "@/types/blog";
import { formatDate, generateSlug, generateExcerpt } from "@/lib/blog";
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const slug = generateSlug(post.title);
  const excerpt = generateExcerpt(post.raw_content, 150);
  const formattedDate = formatDate(post.published_date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="h-full flex flex-col border border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.published_date}>{formattedDate}</time>
          </div>
          <CardTitle className="text-xl font-bold line-clamp-2 hover:text-primary transition-colors">
            <Link href={`/blog/${slug}`} className="hover:underline">
              {post.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <CardDescription className="text-base mb-4 line-clamp-3">
            {excerpt}
          </CardDescription>
          <div className="mt-auto flex gap-2">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/blog/${slug}`}>
                Ler mais
              </Link>
            </Button>
            {post.url && (
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
