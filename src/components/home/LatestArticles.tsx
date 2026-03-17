"use client";

import { cn } from "@/lib/utils";

const articles = [
  {
    slug: "top-10-greek-islands-by-ferry",
    title: "Top 10 Greek Islands to Visit by Ferry",
    excerpt:
      "Discover the most stunning Greek islands accessible by ferry, from the iconic Santorini sunsets to the lush greenery of Corfu.",
  },
  {
    slug: "guide-ferry-travel-mediterranean",
    title: "Guide to Ferry Travel in the Mediterranean",
    excerpt:
      "Everything you need to know about traveling by ferry across the Mediterranean, including tips on booking, packing, and onboard amenities.",
  },
  {
    slug: "best-time-book-ferry-tickets",
    title: "Best Time to Book Ferry Tickets to Save Money",
    excerpt:
      "Learn the best strategies for finding affordable ferry tickets, from early booking discounts to last-minute deals.",
  },
];

export default function LatestArticles() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Latest Articles
          </h2>
          <a
            href="/articles"
            className="text-sm font-medium text-[#00BCD4] hover:underline"
          >
            Read more articles
          </a>
        </div>

        {/* Article cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {articles.map((article) => (
            <a
              key={article.slug}
              href={`/articles/${article.slug}`}
              className={cn(
                "group overflow-hidden rounded-xl shadow-sm",
                "transition-shadow hover:shadow-md"
              )}
            >
              {/* Placeholder image */}
              <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300" />

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#00BCD4]">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-gray-600">
                  {article.excerpt}
                </p>
                <span className="mt-3 inline-block text-sm font-medium text-[#00BCD4]">
                  Read more &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
