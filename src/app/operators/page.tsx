"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Ship, Star, Anchor, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Operator {
  id: string;
  name: string;
  logo: string;
  code: string;
  description?: string;
  rating?: number;
  routeCount?: number;
  vesselCount?: number;
  headquarters?: string;
}

function SkeletonCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="size-14 animate-pulse rounded-full bg-gray-200" />
        <div className="h-5 w-36 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
      </CardContent>
    </Card>
  );
}

function OperatorsContent() {
  const searchParams = useSearchParams();
  const highlight = searchParams.get("highlight")?.toLowerCase() ?? null;
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchOperators() {
      try {
        const res = await fetch("/api/operators");
        const json = await res.json();
        setOperators(json.data || json || []);
      } catch {
        setOperators([]);
      } finally {
        setLoading(false);
      }
    }
    fetchOperators();
  }, []);

  // Scroll to highlighted operator
  useEffect(() => {
    if (!loading && highlight) {
      const el = cardRefs.current[highlight];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [loading, highlight]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ferry Operators</h1>
        <p className="text-muted-foreground">
          Browse the ferry companies operating across the Mediterranean. Compare
          their fleets, routes, and passenger ratings.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : operators.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Ship className="mx-auto mb-3 size-10 text-muted-foreground" />
            <p className="text-lg font-medium">No operators available</p>
            <p className="text-sm text-muted-foreground">
              Check back soon for operator information.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {operators.map((op) => {
            const initial = op.name.charAt(0).toUpperCase();
            const isHighlighted = highlight === op.name.toLowerCase();

            return (
              <div
                key={op.id}
                ref={(el) => {
                  cardRefs.current[op.name.toLowerCase()] = el;
                }}
                className="scroll-mt-24"
              >
                <Card
                  className={cn(
                    "h-full transition-all hover:shadow-lg",
                    isHighlighted && "ring-2 ring-[#00BCD4] shadow-lg"
                  )}
                >
                  <CardContent className="flex flex-col gap-4 pt-6">
                    <div className="flex items-center gap-3">
                      <div className="flex size-14 items-center justify-center rounded-full bg-[#00BCD4] text-xl font-bold text-white">
                        {initial}
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{op.name}</h2>
                        <Badge variant="secondary">{op.code}</Badge>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {op.description ||
                        `${op.name} is a ferry operator serving routes across the Greek islands and the Mediterranean with modern vessels and reliable schedules.`}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      {op.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="size-4 fill-[#FFC107] text-[#FFC107]" />
                          <span className="font-medium">{op.rating}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Anchor className="size-4" />
                        <span>{op.routeCount ?? "12"}+ routes</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Ship className="size-4" />
                        <span>{op.vesselCount ?? "5"} vessels</span>
                      </div>
                      {op.headquarters && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <MapPin className="size-4" />
                          <span>{op.headquarters}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function OperatorsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" />
        </div>
      }
    >
      <OperatorsContent />
    </Suspense>
  );
}
