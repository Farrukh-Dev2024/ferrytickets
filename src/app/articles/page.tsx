"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

function ArticleSkeleton() {
  return (
    <Card>
      <div className="h-48 animate-pulse bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-xl" />
      <CardContent className="space-y-3 pt-2">
        <div className="h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200" />
      </CardContent>
    </Card>
  );
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data = await res.json();
          setArticles(data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-3">
        <BookOpen className="size-8 text-primary" />
        <h1 className="text-3xl font-bold tracking-tight">
          Travel Articles & Guides
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ArticleSkeleton key={i} />
            ))
          : articles.map((article) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group"
              >
                <Card className="h-full transition-shadow hover:shadow-lg">
                  <div className="h-48 rounded-t-xl bg-gradient-to-br from-blue-400 to-cyan-300" />
                  <CardContent className="space-y-3 pt-2">
                    <h2 className="text-lg font-semibold leading-snug group-hover:text-primary">
                      {article.title}
                    </h2>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="size-3.5" />
                        <span>
                          {new Date(article.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-primary">
                        Read more
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
      </div>

      {!loading && articles.length === 0 && (
        <div className="py-16 text-center">
          <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-lg text-muted-foreground">
            No articles available yet. Check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
