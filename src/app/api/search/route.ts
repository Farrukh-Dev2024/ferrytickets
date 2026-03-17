import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface SearchResult {
  type: "route" | "port" | "article" | "operator";
  id: string;
  title: string;
  subtitle: string;
  url: string;
  relevance: number;
}

const FALLBACK_DATA = {
  routes: [
    { id: "route-pir-san", from: "Piraeus", to: "Santorini", fromCode: "PIR", toCode: "SAN", country: "Greece", duration: "4h 45m - 7h 45m", priceFrom: 35 },
    { id: "route-pir-myk", from: "Piraeus", to: "Mykonos", fromCode: "PIR", toCode: "MYK", country: "Greece", duration: "2h 30m - 5h 15m", priceFrom: 32 },
    { id: "route-pir-her", from: "Piraeus", to: "Heraklion", fromCode: "PIR", toCode: "HER", country: "Greece", duration: "6h 30m - 9h", priceFrom: 30 },
    { id: "route-pir-nax", from: "Piraeus", to: "Naxos", fromCode: "PIR", toCode: "NAX", country: "Greece", duration: "3h 30m - 5h 30m", priceFrom: 29 },
    { id: "route-pir-par", from: "Piraeus", to: "Paros", fromCode: "PIR", toCode: "PAR", country: "Greece", duration: "3h - 5h", priceFrom: 28 },
    { id: "route-raf-myk", from: "Rafina", to: "Mykonos", fromCode: "RAF", toCode: "MYK", country: "Greece", duration: "2h 15m - 4h 30m", priceFrom: 30 },
    { id: "route-san-myk", from: "Santorini", to: "Mykonos", fromCode: "SAN", toCode: "MYK", country: "Greece", duration: "2h - 3h 30m", priceFrom: 45 },
    { id: "route-pir-rho", from: "Piraeus", to: "Rhodes", fromCode: "PIR", toCode: "RHO", country: "Greece", duration: "13h - 18h", priceFrom: 42 },
    { id: "route-nap-cap", from: "Naples", to: "Capri", fromCode: "NAP", toCode: "CAP", country: "Italy", duration: "50m - 1h 20m", priceFrom: 18 },
    { id: "route-mrs-aja", from: "Marseille", to: "Ajaccio", fromCode: "MRS", toCode: "AJA", country: "France", duration: "5h 30m - 12h", priceFrom: 35 },
    { id: "route-dvr-cal", from: "Dover", to: "Calais", fromCode: "DVR", toCode: "CAL", country: "England/France", duration: "1h 30m", priceFrom: 25 },
    { id: "route-pir-cha", from: "Piraeus", to: "Chania", fromCode: "PIR", toCode: "CHA", country: "Greece", duration: "6h - 9h", priceFrom: 28 },
  ],
  ports: [
    { id: "port-pir", name: "Piraeus", city: "Athens", country: "Greece", code: "PIR" },
    { id: "port-san", name: "Santorini (Thira)", city: "Athinios", country: "Greece", code: "SAN" },
    { id: "port-myk", name: "Mykonos", city: "Mykonos Town", country: "Greece", code: "MYK" },
    { id: "port-her", name: "Heraklion", city: "Heraklion", country: "Greece", code: "HER" },
    { id: "port-rho", name: "Rhodes", city: "Rhodes Town", country: "Greece", code: "RHO" },
    { id: "port-nap", name: "Naples", city: "Naples", country: "Italy", code: "NAP" },
    { id: "port-mrs", name: "Marseille", city: "Marseille", country: "France", code: "MRS" },
    { id: "port-dvr", name: "Dover", city: "Dover", country: "England", code: "DVR" },
  ],
  articles: [
    { id: "art-001", title: "The Ultimate Guide to Greek Island Hopping by Ferry", slug: "ultimate-guide-greek-island-hopping-by-ferry", category: "travel_guide" },
    { id: "art-002", title: "Ferry Travel Across the Mediterranean: A Complete Guide", slug: "ferry-travel-mediterranean-complete-guide", category: "travel_guide" },
    { id: "art-003", title: "How to Book Cheap Ferry Tickets in Greece: 10 Expert Tips", slug: "how-to-book-cheap-ferry-tickets-greece", category: "tips" },
    { id: "art-005", title: "Santorini to Mykonos by Ferry: Times, Prices & Tips", slug: "santorini-to-mykonos-ferry-guide", category: "route_guide" },
    { id: "art-006", title: "Overnight Ferries in Greece: What to Expect", slug: "overnight-ferries-greece-what-to-expect", category: "tips" },
  ],
  operators: [
    { id: "op-bluestar", name: "Blue Star Ferries", country: "Greece" },
    { id: "op-hellenic", name: "Hellenic Seaways", country: "Greece" },
    { id: "op-seajets", name: "SeaJets", country: "Greece" },
    { id: "op-minoan", name: "Minoan Lines", country: "Greece" },
    { id: "op-anek", name: "Anek Lines", country: "Greece" },
    { id: "op-goldenstar", name: "Golden Star Ferries", country: "Greece" },
  ],
};

function searchFallback(query: string): SearchResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResult[] = [];

  // Search routes
  for (const route of FALLBACK_DATA.routes) {
    const searchable = `${route.from} ${route.to} ${route.fromCode} ${route.toCode} ${route.country}`.toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        type: "route",
        id: route.id,
        title: `${route.from} \u2192 ${route.to}`,
        subtitle: `${route.duration} \u00b7 From \u20ac${route.priceFrom}`,
        url: `/schedules?from=${route.fromCode}&to=${route.toCode}`,
        relevance: searchable.startsWith(q) ? 1.0 : 0.8,
      });
    }
  }

  // Search ports
  for (const port of FALLBACK_DATA.ports) {
    const searchable = `${port.name} ${port.city} ${port.country} ${port.code}`.toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        type: "port",
        id: port.id,
        title: port.name,
        subtitle: `${port.city}, ${port.country}`,
        url: `/ports/${port.code}`,
        relevance: searchable.startsWith(q) ? 0.95 : 0.75,
      });
    }
  }

  // Search articles
  for (const article of FALLBACK_DATA.articles) {
    const searchable = `${article.title} ${article.category}`.toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        type: "article",
        id: article.id,
        title: article.title,
        subtitle: article.category.replace("_", " "),
        url: `/articles/${article.slug}`,
        relevance: searchable.startsWith(q) ? 0.9 : 0.7,
      });
    }
  }

  // Search operators
  for (const operator of FALLBACK_DATA.operators) {
    const searchable = `${operator.name} ${operator.country}`.toLowerCase();
    if (searchable.includes(q)) {
      results.push({
        type: "operator",
        id: operator.id,
        title: operator.name,
        subtitle: `Ferry operator \u00b7 ${operator.country}`,
        url: `/operators/${operator.id}`,
        relevance: searchable.startsWith(q) ? 0.9 : 0.7,
      });
    }
  }

  // Sort by relevance descending
  results.sort((a, b) => b.relevance - a.relevance);

  return results.slice(0, 20);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";

  if (!query.trim()) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required", data: [] },
      { status: 400 }
    );
  }

  try {
    const [routes, ports, articles] = await Promise.all([
      prisma.route.findMany({
        where: {
          OR: [
            { fromPort: { name: { contains: query, mode: "insensitive" } } },
            { toPort: { name: { contains: query, mode: "insensitive" } } },
          ],
        },
        include: { fromPort: true, toPort: true },
        take: 10,
      }),
      prisma.port.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { name: { contains: query, mode: "insensitive" } },
            { code: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
      prisma.article.findMany({
        where: {
          OR: [
            { title: { contains: query, mode: "insensitive" } },
            { excerpt: { contains: query, mode: "insensitive" } },
          ],
        },
        take: 10,
      }),
    ]);

    const results: SearchResult[] = [
      ...routes.map((r: { id: string; fromPort: { name: string; code: string }; toPort: { name: string; code: string } }) => ({
        type: "route" as const,
        id: r.id,
        title: `${r.fromPort.name} \u2192 ${r.toPort.name}`,
        subtitle: "Ferry route",
        url: `/schedules?from=${r.fromPort.code}&to=${r.toPort.code}`,
        relevance: 1,
      })),
      ...ports.map((p: { id: string; name: string; country?: { name: string }; code: string }) => ({
        type: "port" as const,
        id: p.id,
        title: p.name,
        subtitle: `${p.name}${p.country ? ", " + p.country.name : ""}`,
        url: `/ports/${p.code}`,
        relevance: 0.9,
      })),
      ...articles.map((a: { id: string; title: string; slug: string; category?: string }) => ({
        type: "article" as const,
        id: a.id,
        title: a.title,
        subtitle: a.category || "Article",
        url: `/articles/${a.slug}`,
        relevance: 0.8,
      })),
    ];

    return NextResponse.json({ data: results, meta: { query, total: results.length } });
  } catch {
    const results = searchFallback(query);
    return NextResponse.json({
      data: results,
      meta: { query, total: results.length },
      _fallback: true,
    });
  }
}
