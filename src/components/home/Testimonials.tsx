"use client";

import { useCallback } from "react";
import { cn } from "@/lib/utils";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    title: "Smooth sailing to Santorini",
    content:
      "Booked our ferry from Athens to Santorini and the whole process was incredibly easy. Great prices compared to other sites and the e-ticket worked perfectly at the port. Will definitely use again!",
    author: "Sarah M.",
    rating: 5,
    date: "October 2025",
  },
  {
    title: "Best way to island hop",
    content:
      "We used Ferrytickets for our entire Greek island-hopping trip. The schedule comparison feature saved us so much time, and customer support helped us rebook when our plans changed last minute.",
    author: "James K.",
    rating: 5,
    date: "September 2025",
  },
  {
    title: "Great customer service",
    content:
      "Had an issue with a cancelled sailing due to weather and the support team handled everything quickly. Got a full refund within 3 days. Really impressed with how they dealt with it.",
    author: "Maria P.",
    rating: 5,
    date: "August 2025",
  },
  {
    title: "Reliable and affordable",
    content:
      "Traveled from Barcelona to Mallorca with Balearia. The booking was straightforward and the price was the same as booking direct but with much better customer support. Highly recommend.",
    author: "Thomas D.",
    rating: 4,
    date: "July 2025",
  },
  {
    title: "Perfect for family travel",
    content:
      "Booked a cabin on the overnight ferry to Crete for our family of four. The kids loved it! Easy to add vehicle booking and the cabin selection was very clear. Fantastic experience overall.",
    author: "Elena R.",
    rating: 5,
    date: "June 2025",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4",
            i < rating
              ? "fill-[#FFC107] text-[#FFC107]"
              : "fill-gray-200 text-gray-200"
          )}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="bg-[#F5F7FA] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            What our customers say
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < 5
                      ? "fill-[#FFC107] text-[#FFC107]"
                      : "fill-gray-200 text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">4.8</span>
            <span className="text-sm text-gray-500">2,847 reviews</span>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-10">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">
              {reviews.map((review) => (
                <div
                  key={review.author}
                  className={cn(
                    "min-w-0 shrink-0 basis-full sm:basis-1/2 lg:basis-1/3"
                  )}
                >
                  <div className="flex h-full flex-col rounded-xl bg-white p-6 shadow-sm">
                    {/* Quote mark */}
                    <span className="text-4xl leading-none text-[#00BCD4]">
                      &ldquo;
                    </span>

                    {/* Title */}
                    <h3 className="mt-2 font-serif text-lg font-semibold italic text-gray-900">
                      {review.title}
                    </h3>

                    {/* Content */}
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-600">
                      {review.content}
                    </p>

                    {/* Footer */}
                    <div className="mt-4 border-t border-gray-100 pt-4">
                      <p className="font-medium text-gray-900">
                        {review.author}
                      </p>
                      <div className="mt-1 flex items-center justify-between">
                        <StarRating rating={review.rating} />
                        <span className="text-xs text-gray-400">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              onClick={scrollPrev}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-gray-300",
                "text-gray-600 transition-colors hover:border-[#00BCD4] hover:text-[#00BCD4]"
              )}
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={cn(
                    "h-2 w-2 rounded-full transition-colors",
                    "bg-gray-300 hover:bg-[#00BCD4]"
                  )}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              className={cn(
                "flex h-9 w-9 items-center justify-center rounded-full border border-gray-300",
                "text-gray-600 transition-colors hover:border-[#00BCD4] hover:text-[#00BCD4]"
              )}
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
