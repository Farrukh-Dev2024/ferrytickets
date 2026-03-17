"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MapPin, Anchor, Globe } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Port {
  id: string;
  name: string;
  code: string;
}

interface Region {
  id: string;
  name: string;
  ports: Port[];
}

interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  regions: Region[];
}

function SkeletonCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-3 pt-6">
        <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        <div className="h-5 w-32 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </CardContent>
    </Card>
  );
}

function DestinationsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const highlightCountry = searchParams.get("country")?.toLowerCase() ?? null;
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const countryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch("/api/countries");
        const json = await res.json();
        setCountries(json.data || json || []);
      } catch {
        setCountries([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCountries();
  }, []);

  // Scroll to highlighted country once data loads
  useEffect(() => {
    if (!loading && highlightCountry) {
      const el = countryRefs.current[highlightCountry];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [loading, highlightCountry]);

  const getTotalPorts = (country: Country) =>
    country.regions.reduce((sum, r) => sum + (r.ports?.length || 0), 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Ferry Destinations</h1>
        <p className="text-muted-foreground">
          Explore ferry routes across the Mediterranean and beyond. Choose a
          country to discover ports, islands, and available connections.
        </p>
      </div>

      {/* Country grid */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : countries.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Globe className="mx-auto mb-3 size-10 text-muted-foreground" />
            <p className="text-lg font-medium">No destinations available</p>
            <p className="text-sm text-muted-foreground">
              Check back soon for new ferry destinations.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {countries.map((country) => {
              const portCount = getTotalPorts(country);
              const isHighlighted =
                highlightCountry === country.name.toLowerCase();

              return (
                <Card
                  key={country.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-lg",
                    isHighlighted &&
                      "ring-2 ring-[#00BCD4] shadow-lg"
                  )}
                  onClick={() => {
                    const el =
                      countryRefs.current[country.name.toLowerCase()];
                    if (el) {
                      el.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                >
                  <CardContent className="flex flex-col gap-3 pt-6">
                    <span className="text-4xl">{country.flag}</span>
                    <h2 className="text-xl font-bold">{country.name}</h2>
                    <div className="flex flex-wrap gap-1.5">
                      {country.regions.map((region) => (
                        <Badge key={region.id} variant="secondary">
                          {region.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Anchor className="size-4" />
                      <span>
                        {portCount} port{portCount !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed sections per country */}
          {countries.map((country) => (
            <div
              key={country.id}
              ref={(el) => {
                countryRefs.current[country.name.toLowerCase()] = el;
              }}
              className={cn(
                "mb-10 scroll-mt-24 rounded-lg p-6 transition-colors",
                highlightCountry === country.name.toLowerCase()
                  ? "bg-[#E0F7FA]"
                  : "bg-transparent"
              )}
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="text-2xl">{country.flag}</span>
                <h2 className="text-2xl font-bold">{country.name}</h2>
              </div>

              {country.regions.map((region) => (
                <div key={region.id} className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold text-muted-foreground">
                    {region.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {region.ports?.map((port) => (
                      <Button
                        key={port.id}
                        variant="outline"
                        size="sm"
                        className="gap-1.5"
                        onClick={() =>
                          router.push(`/booking/select-ferry?from=${port.code}`)
                        }
                      >
                        <MapPin className="size-3.5" />
                        {port.name}{" "}
                        <span className="text-muted-foreground">
                          ({port.code})
                        </span>
                      </Button>
                    ))}
                    {(!region.ports || region.ports.length === 0) && (
                      <p className="text-sm text-muted-foreground">
                        No ports listed for this region.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" />
        </div>
      }
    >
      <DestinationsContent />
    </Suspense>
  );
}
