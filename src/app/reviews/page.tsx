"use client";

import { useEffect, useState } from "react";
import { Star, MessageSquare, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  userId: string;
  user?: { name: string; avatar: string | null };
  bookingLegId: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
}

function StarRating({
  rating,
  size = "default",
}: {
  rating: number;
  size?: "default" | "large";
}) {
  const sizeClass = size === "large" ? "size-6" : "size-4";
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClass,
            i < Math.round(rating)
              ? "fill-[#FFC107] text-[#FFC107]"
              : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}

function SkeletonCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="flex items-center gap-3">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
          </div>
        </div>
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
      </CardContent>
    </Card>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch("/api/reviews");
        const json = await res.json();
        setReviews(json.data || json || []);
      } catch {
        setReviews([]);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const filteredReviews = filterRating
    ? reviews.filter((r) => Math.round(r.rating) === filterRating)
    : reviews;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => Math.round(r.rating) === star).length,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Passenger Reviews</h1>
        <p className="text-muted-foreground">
          Read honest reviews from real passengers about their ferry travel
          experiences.
        </p>
      </div>

      {/* Overall rating header */}
      {!loading && reviews.length > 0 && (
        <Card className="mb-8">
          <CardContent className="flex flex-wrap items-center gap-8 py-6">
            {/* Overall score */}
            <div className="flex flex-col items-center gap-1">
              <span className="text-5xl font-bold">
                {averageRating.toFixed(1)}
              </span>
              <StarRating rating={averageRating} size="large" />
              <span className="text-sm text-muted-foreground">
                {reviews.length} review{reviews.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Distribution */}
            <div className="flex flex-1 flex-col gap-1.5">
              {ratingDistribution.map(({ star, count }) => {
                const pct =
                  reviews.length > 0
                    ? (count / reviews.length) * 100
                    : 0;
                return (
                  <button
                    key={star}
                    className="flex items-center gap-2 text-sm hover:opacity-70"
                    onClick={() =>
                      setFilterRating(filterRating === star ? null : star)
                    }
                  >
                    <span className="w-3 text-right">{star}</span>
                    <Star className="size-3 fill-[#FFC107] text-[#FFC107]" />
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#FFC107]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="w-8 text-right text-muted-foreground">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filter bar */}
      <div className="mb-6 flex items-center gap-2">
        <Filter className="size-4 text-muted-foreground" />
        <span className="text-sm font-medium">Filter:</span>
        <Button
          variant={filterRating === null ? "default" : "outline"}
          size="sm"
          onClick={() => setFilterRating(null)}
          className={cn(
            filterRating === null && "bg-[#00BCD4] hover:bg-[#00ACC1]"
          )}
        >
          All
        </Button>
        {[5, 4, 3, 2, 1].map((star) => (
          <Button
            key={star}
            variant={filterRating === star ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-1",
              filterRating === star && "bg-[#00BCD4] hover:bg-[#00ACC1]"
            )}
            onClick={() =>
              setFilterRating(filterRating === star ? null : star)
            }
          >
            {star}
            <Star className="size-3 fill-current" />
          </Button>
        ))}
      </div>

      {/* Reviews */}
      {loading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredReviews.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <MessageSquare className="mx-auto mb-3 size-10 text-muted-foreground" />
            <p className="text-lg font-medium">No reviews found</p>
            <p className="text-sm text-muted-foreground">
              {filterRating
                ? `No ${filterRating}-star reviews available. Try a different filter.`
                : "Be the first to leave a review after your trip!"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filteredReviews.map((review) => {
            const userName = review.user?.name || "Anonymous";
            const initial = userName.charAt(0).toUpperCase();
            const date = new Date(review.createdAt).toLocaleDateString(
              "en-GB",
              { day: "numeric", month: "short", year: "numeric" }
            );

            return (
              <Card key={review.id}>
                <CardContent className="flex flex-col gap-3 pt-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-full bg-[#00BCD4] text-sm font-bold text-white">
                        {initial}
                      </div>
                      <div>
                        <p className="font-medium">{userName}</p>
                        <p className="text-xs text-muted-foreground">
                          {date}
                        </p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold">{review.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {review.content}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
