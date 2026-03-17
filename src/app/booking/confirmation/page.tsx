"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle, Copy, Download, CalendarPlus, Ship } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function generateBookingRef(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FT-2026-${code}`;
}

export default function BookingConfirmationPage() {
  const [bookingRef] = useState(() => generateBookingRef());
  const [copied, setCopied] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bookingRef);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      console.error("Failed to copy booking reference");
    }
  };

  const nextSteps = [
    { icon: Download, label: "Download your tickets" },
    { icon: Ship, label: "Check-in online" },
    { icon: CalendarPlus, label: "Add to calendar" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-lg text-center">
        <div
          className={cn(
            "mb-6 transition-all duration-700 ease-out",
            animate
              ? "scale-100 opacity-100"
              : "scale-50 opacity-0"
          )}
        >
          <CheckCircle
            className="mx-auto size-20"
            style={{ color: "#4CAF50" }}
            strokeWidth={1.5}
          />
        </div>

        <h1
          className={cn(
            "mb-2 text-3xl font-bold transition-all delay-200 duration-500",
            animate
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          )}
        >
          Booking Confirmed!
        </h1>

        <Card
          className={cn(
            "mt-8 transition-all delay-400 duration-500",
            animate
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          )}
        >
          <CardContent className="space-y-6 pt-2">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Ship className="size-5" />
              <p>Your ferry trip has been booked successfully</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">
                Booking Reference
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold tracking-wider">
                  {bookingRef}
                </span>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={handleCopy}
                  aria-label="Copy booking reference"
                >
                  <Copy
                    className={cn(
                      "size-4 transition-colors",
                      copied ? "text-[#4CAF50]" : "text-muted-foreground"
                    )}
                  />
                </Button>
              </div>
              {copied && (
                <p className="mt-1 text-xs" style={{ color: "#4CAF50" }}>
                  Copied to clipboard!
                </p>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              A confirmation email has been sent to your email address
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "mt-6 transition-all delay-500 duration-500",
            animate
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          )}
        >
          <CardContent className="pt-2">
            <h2 className="mb-4 text-lg font-semibold">Next Steps</h2>
            <ul className="space-y-3">
              {nextSteps.map((step) => (
                <li
                  key={step.label}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                >
                  <step.icon className="size-5 text-primary" />
                  <span>{step.label}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div
          className={cn(
            "mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center transition-all delay-700 duration-500",
            animate
              ? "translate-y-0 opacity-100"
              : "translate-y-4 opacity-0"
          )}
        >
          <Link href="/manage-booking">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View Booking
            </Button>
          </Link>
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              Book Another Trip
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
