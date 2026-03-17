"use client";

import { useRouter } from "next/navigation";
import { Clock, Ship, ArrowRight, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PopularRoute {
  id: string;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  operators: string[];
  startingPrice: number;
  currency: string;
  duration: string;
  frequency: string;
}

const popularRoutes: PopularRoute[] = [
  {
    id: "pir-san",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Santorini",
    toCode: "SAN",
    operators: ["Blue Star Ferries", "SeaJets", "Hellenic Seaways"],
    startingPrice: 35,
    currency: "EUR",
    duration: "4h 25m - 7h 45m",
    frequency: "6 daily departures",
  },
  {
    id: "pir-myk",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Mykonos",
    toCode: "MYK",
    operators: ["Blue Star Ferries", "SeaJets"],
    startingPrice: 32,
    currency: "EUR",
    duration: "2h 30m - 5h 15m",
    frequency: "5 daily departures",
  },
  {
    id: "pir-nax",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Naxos",
    toCode: "NAX",
    operators: ["Blue Star Ferries", "Golden Star Ferries"],
    startingPrice: 30,
    currency: "EUR",
    duration: "3h 40m - 5h 30m",
    frequency: "4 daily departures",
  },
  {
    id: "pir-par",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Paros",
    toCode: "PAR",
    operators: ["Blue Star Ferries", "Hellenic Seaways"],
    startingPrice: 28,
    currency: "EUR",
    duration: "3h 15m - 5h",
    frequency: "5 daily departures",
  },
  {
    id: "raf-san",
    from: "Rafina",
    fromCode: "RAF",
    to: "Santorini",
    toCode: "SAN",
    operators: ["SeaJets", "Golden Star Ferries"],
    startingPrice: 55,
    currency: "EUR",
    duration: "4h 10m",
    frequency: "2 daily departures",
  },
  {
    id: "pir-cre",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Heraklion (Crete)",
    toCode: "HER",
    operators: ["Minoan Lines", "Anek Lines"],
    startingPrice: 28,
    currency: "EUR",
    duration: "6h 30m - 8h 45m",
    frequency: "3 daily departures",
  },
  {
    id: "pir-rho",
    from: "Piraeus",
    fromCode: "PIR",
    to: "Rhodes",
    toCode: "RHO",
    operators: ["Blue Star Ferries", "Dodekanisos Seaways"],
    startingPrice: 42,
    currency: "EUR",
    duration: "13h - 18h",
    frequency: "1-2 daily departures",
  },
  {
    id: "san-myk",
    from: "Santorini",
    fromCode: "SAN",
    to: "Mykonos",
    toCode: "MYK",
    operators: ["SeaJets", "Hellenic Seaways"],
    startingPrice: 45,
    currency: "EUR",
    duration: "2h - 3h 15m",
    frequency: "3 daily departures",
  },
  {
    id: "nap-cap",
    from: "Naples",
    fromCode: "NAP",
    to: "Capri",
    toCode: "CAP",
    operators: ["Caremar", "SNAV"],
    startingPrice: 18,
    currency: "EUR",
    duration: "50m - 1h 20m",
    frequency: "8 daily departures",
  },
  {
    id: "bar-ibz",
    from: "Barcelona",
    fromCode: "BCN",
    to: "Ibiza",
    toCode: "IBZ",
    operators: ["Balearia", "Trasmed"],
    startingPrice: 55,
    currency: "EUR",
    duration: "8h 30m",
    frequency: "1-2 daily departures",
  },
  {
    id: "nic-cor",
    from: "Nice",
    fromCode: "NCE",
    to: "Corsica",
    toCode: "AJA",
    operators: ["Corsica Ferries"],
    startingPrice: 35,
    currency: "EUR",
    duration: "5h 30m",
    frequency: "2 daily departures",
  },
  {
    id: "tan-tar",
    from: "Tangier",
    fromCode: "TNG",
    to: "Tarifa",
    toCode: "TRF",
    operators: ["FRS", "Inter Shipping"],
    startingPrice: 32,
    currency: "EUR",
    duration: "35m - 1h",
    frequency: "10 daily departures",
  },
];

export default function RoutesPage() {
  const router = useRouter();

  const handleBookRoute = (route: PopularRoute) => {
    const params = new URLSearchParams({
      from: route.fromCode,
      to: route.toCode,
      tripType: "simple",
      adults: "1",
      children: "0",
      infants: "0",
    });
    router.push(`/booking/select-ferry?${params.toString()}`);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Popular Ferry Routes</h1>
        <p className="text-muted-foreground">
          Discover the most popular ferry connections across the Mediterranean.
          Compare operators, prices, and travel times to find the best option
          for your trip.
        </p>
      </div>

      {/* Routes grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {popularRoutes.map((route) => (
          <Card
            key={route.id}
            className="cursor-pointer transition-all hover:shadow-lg"
            onClick={() => handleBookRoute(route)}
          >
            <CardContent className="flex flex-col gap-3 pt-6">
              {/* Route header */}
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold">{route.from}</span>
                <ArrowRight className="size-4 text-[#00BCD4]" />
                <span className="text-lg font-bold">{route.to}</span>
              </div>

              {/* Operators */}
              <div className="flex flex-wrap gap-1.5">
                {route.operators.map((op) => (
                  <Badge key={op} variant="secondary" className="text-xs">
                    {op}
                  </Badge>
                ))}
              </div>

              {/* Details */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="size-3.5" />
                  <span>{route.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Ship className="size-3.5" />
                  <span>{route.frequency}</span>
                </div>
              </div>

              {/* Price and book */}
              <div className="mt-auto flex items-center justify-between border-t pt-3">
                <div>
                  <span className="text-xs text-muted-foreground">From</span>
                  <p className="text-xl font-bold">
                    &euro;{route.startingPrice}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookRoute(route);
                  }}
                >
                  Book Now
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
