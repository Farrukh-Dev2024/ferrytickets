"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image?: string;
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch("/api/articles");
        if (res.ok) {
          const data: Article[] = await res.json();
          const found = data.find((a) => a.slug === slug);
          if (found) {
            setArticle(found);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Failed to fetch article:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="h-6 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-72 w-full animate-pulse rounded-xl bg-gradient-to-br from-gray-200 to-gray-300" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !article) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="mb-4 text-2xl font-bold">Article not found</h1>
        <p className="mb-6 text-muted-foreground">
          The article you are looking for does not exist or has been removed.
        </p>
        <Link href="/articles">
          <Button variant="outline">
            <ArrowLeft className="size-4" />
            Back to Articles
          </Button>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const readingTime = Math.max(
    1,
    Math.ceil(article.content.split(/\s+/).length / 200)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/articles"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Articles
        </Link>

        <h1 className="mb-4 text-3xl font-bold leading-tight lg:text-4xl">
          {article.title}
        </h1>

        <div className="mb-6 flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="size-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>

        <Card className="mb-8 overflow-hidden">
          <div className="h-72 bg-gradient-to-br from-blue-400 to-cyan-300 lg:h-96" />
        </Card>

        <div className="prose prose-lg max-w-none text-foreground">
          {article.content.split("\n").map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-muted-foreground">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t pt-6">
          <Link href="/articles">
            <Button variant="outline">
              <ArrowLeft className="size-4" />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
