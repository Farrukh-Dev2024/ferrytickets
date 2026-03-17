"use client";

import { cn } from "@/lib/utils";

const destinations = [
  { country: "Greece", flag: "\u{1F1EC}\u{1F1F7}", routes: 45 },
  { country: "France", flag: "\u{1F1EB}\u{1F1F7}", routes: 32 },
  { country: "Italy", flag: "\u{1F1EE}\u{1F1F9}", routes: 38 },
  { country: "Morocco", flag: "\u{1F1F2}\u{1F1E6}", routes: 15 },
  { country: "England", flag: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}", routes: 22 },
  { country: "Croatia", flag: "\u{1F1ED}\u{1F1F7}", routes: 18 },
  { country: "Spain", flag: "\u{1F1EA}\u{1F1F8}", routes: 28 },
  { country: "Turkey", flag: "\u{1F1F9}\u{1F1F7}", routes: 20 },
];

export default function PopularDestinations() {
  return (
    <section className="bg-[#F5F7FA] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">
            Popular Destinations
          </h2>
          <a
            href="/destinations"
            className="text-sm font-medium text-[#00BCD4] hover:underline"
          >
            View all destinations
          </a>
        </div>

        {/* Scrollable cards */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          {destinations.map((dest) => (
            <a
              key={dest.country}
              href={`/destinations?country=${dest.country.toLowerCase()}`}
              className={cn(
                "group relative shrink-0 snap-start",
                "h-[280px] w-[200px] overflow-hidden rounded-xl",
                "bg-gradient-to-br from-teal-400 to-teal-700",
                "transition-transform hover:scale-[1.02]"
              )}
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <span className="text-2xl">{dest.flag}</span>
                <h3 className="mt-1 text-lg font-semibold">{dest.country}</h3>
                <p className="text-sm text-white/80">{dest.routes} routes</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
