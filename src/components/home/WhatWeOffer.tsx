"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Best Prices Guaranteed",
    features: [
      "Best price guarantee",
      "No hidden fees",
      "24/7 customer support",
      "Free cancellation on selected routes",
      "Secure payment",
    ],
  },
  {
    title: "Thousands of Routes",
    features: [
      "Over 500 ferry routes",
      "Coverage across the Mediterranean",
      "Island-hopping packages",
      "Seasonal and year-round routes",
      "Connections to remote islands",
    ],
  },
  {
    title: "Easy Booking",
    features: [
      "Simple 3-step booking",
      "Instant confirmation",
      "Mobile e-tickets",
      "Flexible date changes",
      "Group booking discounts",
    ],
  },
  {
    title: "Travel with Confidence",
    features: [
      "Trusted by 2M+ travelers",
      "Licensed travel agency",
      "Real-time schedule updates",
      "Travel insurance options",
      "Verified customer reviews",
    ],
  },
  {
    title: "Premium Support",
    features: [
      "Dedicated support team",
      "Multilingual assistance",
      "Port guidance and tips",
      "Disruption alerts",
      "Post-booking concierge",
    ],
  },
];

export default function WhatWeOffer() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prev = () =>
    setCurrentSlide((s) => (s === 0 ? slides.length - 1 : s - 1));
  const next = () =>
    setCurrentSlide((s) => (s === slides.length - 1 ? 0 : s + 1));

  const slide = slides[currentSlide];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">What we offer</h2>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-500">
              {String(currentSlide + 1).padStart(2, "0")}/
              {String(slides.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prev}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-gray-300",
                  "text-gray-600 transition-colors hover:border-[#00BCD4] hover:text-[#00BCD4]"
                )}
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-gray-300",
                  "text-gray-600 transition-colors hover:border-[#00BCD4] hover:text-[#00BCD4]"
                )}
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {/* Left: Feature list */}
          <div>
            <h3 className="mb-6 text-xl font-semibold text-gray-900">
              {slide.title}
            </h3>
            <ul className="space-y-4">
              {slide.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-[#00BCD4]" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Illustration placeholder */}
          <div className="flex items-center justify-center">
            <div className="h-64 w-full rounded-2xl bg-gray-100 sm:h-80" />
          </div>
        </div>
      </div>
    </section>
  );
}
