"use client";

import { cn } from "@/lib/utils";
import { BookingForm } from "@/components/booking/BookingForm";
import { brand } from "@/config/brand";

export default function Hero() {
  return (
    <section
      className={cn(
        "relative min-h-[500px] w-full",
        "bg-gradient-to-br from-[#00BCD4] to-[#00838F]",
        "flex flex-col items-center justify-center px-4 pb-32 pt-16 text-white"
      )}
    >
      {/* Heading */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find &amp; Book Ferry Tickets
        </h1>
        <p className="mt-4 text-lg text-white/90 sm:text-xl">
          Compare prices, schedules &amp; book your ferry trip across the
          Mediterranean
        </p>
      </div>

      {/* Booking Form */}
      <div className="mt-8 w-full max-w-4xl">
        <BookingForm />
      </div>

      {/* App Download Banner */}
      <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row">
        <span className="text-sm font-medium text-white/90">
          Download our app
        </span>
        <div className="flex gap-3">
          <a
            href={brand.appDownload.ios}
            className={cn(
              "flex h-10 items-center gap-2 rounded-lg bg-black/30 px-4",
              "text-sm font-medium text-white backdrop-blur-sm",
              "transition-colors hover:bg-black/50"
            )}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a
            href={brand.appDownload.android}
            className={cn(
              "flex h-10 items-center gap-2 rounded-lg bg-black/30 px-4",
              "text-sm font-medium text-white backdrop-blur-sm",
              "transition-colors hover:bg-black/50"
            )}
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M3.18 23.77L14.25 12.7 3.18.63c-.38.39-.18 1.08-.18 1.08L12.73 12.7 3 23.69s-.2.69.18 1.08zM14.25 12.7l3.15-3.15-10.8-6.2 7.65 9.35zM14.25 12.7l-7.65 9.35 10.8-6.2-3.15-3.15zM14.25 12.7l4.34 4.34c.58-.33 4.34-2.5 4.34-2.5s1.03-.57 0-1.15l-4.34-2.5-4.34 4.34.53-.53z" />
            </svg>
            Google Play
          </a>
        </div>
      </div>

      {/* SVG Wave */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block h-16 w-full sm:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6.01,71.1-17.6,105.6-30.9C942.09,37.77,987.5,22.16,1035,14.84c37.1-5.72,75.4-3.42,113,.55V0Z" />
        </svg>
      </div>
    </section>
  );
}
