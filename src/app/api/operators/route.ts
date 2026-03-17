import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_OPERATORS = [
  {
    id: "op-bluestar",
    name: "Blue Star Ferries",
    slug: "blue-star-ferries",
    logo: "/images/operators/blue-star-ferries.png",
    website: "https://www.bluestarferries.com",
    country: "Greece",
    founded: 2000,
    fleetSize: 10,
    description: "One of the largest Greek ferry companies, operating modern conventional ferries across the Aegean Sea. Known for reliable service and comfortable vessels on routes connecting Piraeus with the Cyclades, Dodecanese, and eastern Aegean islands.",
    rating: 4.3,
    reviewCount: 2847,
    features: ["onboard_restaurant", "cabin_accommodation", "vehicle_transport", "wifi", "pet_friendly"],
  },
  {
    id: "op-hellenic",
    name: "Hellenic Seaways",
    slug: "hellenic-seaways",
    logo: "/images/operators/hellenic-seaways.png",
    website: "https://www.hellenicseaways.gr",
    country: "Greece",
    founded: 2005,
    fleetSize: 12,
    description: "Major Greek ferry operator providing both conventional and high-speed services. Serves routes in the Saronic Gulf, Cyclades, and northeastern Aegean, offering a mix of fast catamarans and larger car ferries.",
    rating: 4.1,
    reviewCount: 2103,
    features: ["high_speed", "onboard_restaurant", "cabin_accommodation", "vehicle_transport", "wifi"],
  },
  {
    id: "op-seajets",
    name: "SeaJets",
    slug: "seajets",
    logo: "/images/operators/seajets.png",
    website: "https://www.seajets.com",
    country: "Greece",
    founded: 1989,
    fleetSize: 18,
    description: "The largest high-speed ferry company in Greece, operating the world's biggest fleet of high-speed vessels. Connects major Cycladic islands, Crete, and the Sporades with fast catamaran services, significantly reducing travel times.",
    rating: 3.9,
    reviewCount: 3521,
    features: ["high_speed", "onboard_cafe", "airline_style_seating", "wifi"],
  },
  {
    id: "op-minoan",
    name: "Minoan Lines",
    slug: "minoan-lines",
    logo: "/images/operators/minoan-lines.png",
    website: "https://www.minoan.gr",
    country: "Greece",
    founded: 1972,
    fleetSize: 6,
    description: "Premium Greek ferry operator renowned for luxury cruise-ferry experiences on the Piraeus\u2013Heraklion route. Their vessels feature high-end restaurants, swimming pools, and spacious cabins, making overnight crossings a pleasure.",
    rating: 4.5,
    reviewCount: 1876,
    features: ["onboard_restaurant", "cabin_accommodation", "vehicle_transport", "swimming_pool", "wifi", "spa", "pet_friendly"],
  },
  {
    id: "op-anek",
    name: "Anek Lines",
    slug: "anek-lines",
    logo: "/images/operators/anek-lines.png",
    website: "https://www.anek.gr",
    country: "Greece",
    founded: 1967,
    fleetSize: 8,
    description: "One of the oldest and most respected Greek shipping companies, operating routes from Piraeus to Crete (Chania) and international routes to Italy. Known for well-maintained vessels and excellent onboard dining.",
    rating: 4.2,
    reviewCount: 1654,
    features: ["onboard_restaurant", "cabin_accommodation", "vehicle_transport", "wifi", "pet_friendly", "live_entertainment"],
  },
  {
    id: "op-goldenstar",
    name: "Golden Star Ferries",
    slug: "golden-star-ferries",
    logo: "/images/operators/golden-star-ferries.png",
    website: "https://www.goldenstarferries.gr",
    country: "Greece",
    founded: 2016,
    fleetSize: 4,
    description: "A newer entrant offering modern high-speed services connecting Rafina with the Cyclades. Their fleet of fast catamarans provides quick, comfortable connections to Andros, Tinos, Mykonos, Naxos, and Paros.",
    rating: 4.0,
    reviewCount: 987,
    features: ["high_speed", "onboard_cafe", "airline_style_seating", "wifi", "usb_charging"],
  },
];

export async function GET(request: NextRequest) {
  try {
    const operators = await prisma.ferryOperator.findMany({
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ data: operators });
  } catch {
    return NextResponse.json({ data: FALLBACK_OPERATORS, _fallback: true });
  }
}
