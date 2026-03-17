import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_ARTICLES = [
  {
    id: "art-001",
    slug: "ultimate-guide-greek-island-hopping-by-ferry",
    title: "The Ultimate Guide to Greek Island Hopping by Ferry",
    excerpt: "Everything you need to know about planning the perfect island-hopping adventure in Greece, from choosing routes to booking the best deals.",
    coverImage: "/images/articles/greek-island-hopping.jpg",
    category: "travel_guide",
    tags: ["greece", "island_hopping", "cyclades", "travel_tips"],
    author: {
      name: "Elena Papadopoulos",
      avatar: "/images/authors/elena.jpg",
      bio: "Travel writer and Greek islands specialist with 15 years of experience.",
    },
    publishedAt: "2026-02-28T10:00:00Z",
    updatedAt: "2026-03-10T14:30:00Z",
    readTimeMinutes: 12,
    featured: true,
    content: null,
  },
  {
    id: "art-002",
    slug: "ferry-travel-mediterranean-complete-guide",
    title: "Ferry Travel Across the Mediterranean: A Complete Guide",
    excerpt: "From Spain to Turkey, discover the best ferry routes, operators, and hidden gems along the Mediterranean coast.",
    coverImage: "/images/articles/mediterranean-ferries.jpg",
    category: "travel_guide",
    tags: ["mediterranean", "routes", "italy", "france", "spain"],
    author: {
      name: "Marco Rossi",
      avatar: "/images/authors/marco.jpg",
      bio: "Italian travel journalist covering Mediterranean maritime routes.",
    },
    publishedAt: "2026-02-15T08:00:00Z",
    updatedAt: null,
    readTimeMinutes: 15,
    featured: true,
    content: null,
  },
  {
    id: "art-003",
    slug: "how-to-book-cheap-ferry-tickets-greece",
    title: "How to Book Cheap Ferry Tickets in Greece: 10 Expert Tips",
    excerpt: "Save money on your next Greek ferry trip with these insider tips on finding discounts, choosing the right time to book, and picking the best routes.",
    coverImage: "/images/articles/cheap-ferry-tips.jpg",
    category: "tips",
    tags: ["greece", "budget_travel", "booking_tips", "discounts"],
    author: {
      name: "Elena Papadopoulos",
      avatar: "/images/authors/elena.jpg",
      bio: "Travel writer and Greek islands specialist with 15 years of experience.",
    },
    publishedAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-02-05T11:00:00Z",
    readTimeMinutes: 8,
    featured: false,
    content: null,
  },
  {
    id: "art-004",
    slug: "best-ferry-routes-families-europe",
    title: "Best Ferry Routes for Families in Europe",
    excerpt: "Planning a family holiday by sea? Here are the most family-friendly ferry routes with kid-approved facilities, short travel times, and stunning destinations.",
    coverImage: "/images/articles/family-ferry-travel.jpg",
    category: "travel_guide",
    tags: ["family_travel", "europe", "kids", "amenities"],
    author: {
      name: "Sophie Laurent",
      avatar: "/images/authors/sophie.jpg",
      bio: "French family travel blogger and mother of three.",
    },
    publishedAt: "2026-01-08T12:00:00Z",
    updatedAt: null,
    readTimeMinutes: 10,
    featured: false,
    content: null,
  },
  {
    id: "art-005",
    slug: "santorini-to-mykonos-ferry-guide",
    title: "Santorini to Mykonos by Ferry: Times, Prices & Tips",
    excerpt: "A detailed guide covering every ferry option between Santorini and Mykonos, including schedules, ticket prices, and what to expect onboard.",
    coverImage: "/images/articles/santorini-mykonos.jpg",
    category: "route_guide",
    tags: ["greece", "santorini", "mykonos", "cyclades", "route_guide"],
    author: {
      name: "Elena Papadopoulos",
      avatar: "/images/authors/elena.jpg",
      bio: "Travel writer and Greek islands specialist with 15 years of experience.",
    },
    publishedAt: "2025-12-18T10:00:00Z",
    updatedAt: "2026-03-01T09:00:00Z",
    readTimeMinutes: 7,
    featured: false,
    content: null,
  },
  {
    id: "art-006",
    slug: "overnight-ferries-greece-what-to-expect",
    title: "Overnight Ferries in Greece: What to Expect and How to Prepare",
    excerpt: "Taking an overnight ferry in Greece can be a wonderful experience. Learn about cabin options, onboard dining, and tips for sleeping well at sea.",
    coverImage: "/images/articles/overnight-ferry.jpg",
    category: "tips",
    tags: ["greece", "overnight", "cabins", "travel_tips"],
    author: {
      name: "Nikos Stavridis",
      avatar: "/images/authors/nikos.jpg",
      bio: "Maritime enthusiast and Greek travel guide author.",
    },
    publishedAt: "2025-12-02T14:00:00Z",
    updatedAt: null,
    readTimeMinutes: 9,
    featured: false,
    content: null,
  },
];

export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: articles });
  } catch {
    return NextResponse.json({ data: FALLBACK_ARTICLES, _fallback: true });
  }
}
