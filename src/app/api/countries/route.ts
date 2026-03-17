import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_COUNTRIES = [
  {
    id: "country-gr",
    code: "GR",
    name: "Greece",
    flag: "\ud83c\uddec\ud83c\uddf7",
    regions: [
      {
        id: "region-attica",
        name: "Attica",
        ports: [
          { id: "port-pir", code: "PIR", name: "Piraeus", city: "Athens", lat: 37.9475, lng: 23.6372 },
          { id: "port-raf", code: "RAF", name: "Rafina", city: "Rafina", lat: 38.0228, lng: 24.0097 },
          { id: "port-lav", code: "LAV", name: "Lavrio", city: "Lavrio", lat: 37.7131, lng: 24.0548 },
        ],
      },
      {
        id: "region-cyclades",
        name: "Cyclades",
        ports: [
          { id: "port-myk", code: "MYK", name: "Mykonos", city: "Mykonos Town", lat: 37.4467, lng: 25.3289 },
          { id: "port-san", code: "SAN", name: "Santorini (Thira)", city: "Athinios", lat: 36.3932, lng: 25.4254 },
          { id: "port-par", code: "PAR", name: "Paros", city: "Parikia", lat: 37.0853, lng: 25.1481 },
          { id: "port-nax", code: "NAX", name: "Naxos", city: "Naxos Town", lat: 37.1066, lng: 25.3722 },
          { id: "port-ios", code: "IOS", name: "Ios", city: "Ios Port", lat: 36.7231, lng: 25.2822 },
          { id: "port-mil", code: "MIL", name: "Milos", city: "Adamas", lat: 36.7108, lng: 24.4451 },
        ],
      },
      {
        id: "region-dodecanese",
        name: "Dodecanese",
        ports: [
          { id: "port-rho", code: "RHO", name: "Rhodes", city: "Rhodes Town", lat: 36.4499, lng: 28.2241 },
          { id: "port-kos", code: "KOS", name: "Kos", city: "Kos Town", lat: 36.8952, lng: 27.0918 },
          { id: "port-pat", code: "PAT", name: "Patmos", city: "Skala", lat: 37.3174, lng: 26.5479 },
        ],
      },
      {
        id: "region-crete",
        name: "Crete",
        ports: [
          { id: "port-her", code: "HER", name: "Heraklion", city: "Heraklion", lat: 35.3387, lng: 25.1442 },
          { id: "port-cha", code: "CHA", name: "Chania (Souda)", city: "Souda", lat: 35.4881, lng: 24.0764 },
          { id: "port-ret", code: "RET", name: "Rethymno", city: "Rethymno", lat: 35.3735, lng: 24.4831 },
        ],
      },
    ],
  },
  {
    id: "country-it",
    code: "IT",
    name: "Italy",
    flag: "\ud83c\uddee\ud83c\uddf9",
    regions: [
      {
        id: "region-campania",
        name: "Campania",
        ports: [
          { id: "port-nap", code: "NAP", name: "Naples", city: "Naples", lat: 40.8359, lng: 14.2681 },
          { id: "port-sor", code: "SOR", name: "Sorrento", city: "Sorrento", lat: 40.6263, lng: 14.3756 },
          { id: "port-cap", code: "CAP", name: "Capri", city: "Marina Grande", lat: 40.5507, lng: 14.2431 },
        ],
      },
      {
        id: "region-sardinia",
        name: "Sardinia",
        ports: [
          { id: "port-olb", code: "OLB", name: "Olbia", city: "Olbia", lat: 40.9225, lng: 9.5059 },
          { id: "port-cag", code: "CAG", name: "Cagliari", city: "Cagliari", lat: 39.2111, lng: 9.1137 },
        ],
      },
      {
        id: "region-sicily",
        name: "Sicily",
        ports: [
          { id: "port-pal", code: "PAL", name: "Palermo", city: "Palermo", lat: 38.1257, lng: 13.3615 },
          { id: "port-mes", code: "MES", name: "Messina", city: "Messina", lat: 38.1938, lng: 15.5540 },
        ],
      },
    ],
  },
  {
    id: "country-fr",
    code: "FR",
    name: "France",
    flag: "\ud83c\uddeb\ud83c\uddf7",
    regions: [
      {
        id: "region-paca",
        name: "Provence-Alpes-C\u00f4te d'Azur",
        ports: [
          { id: "port-mrs", code: "MRS", name: "Marseille", city: "Marseille", lat: 43.3028, lng: 5.3594 },
          { id: "port-nic", code: "NIC", name: "Nice", city: "Nice", lat: 43.6947, lng: 7.2856 },
          { id: "port-tln", code: "TLN", name: "Toulon", city: "Toulon", lat: 43.1167, lng: 5.9333 },
        ],
      },
      {
        id: "region-corsica",
        name: "Corsica",
        ports: [
          { id: "port-aja", code: "AJA", name: "Ajaccio", city: "Ajaccio", lat: 41.9192, lng: 8.7386 },
          { id: "port-bas", code: "BAS", name: "Bastia", city: "Bastia", lat: 42.7008, lng: 9.4503 },
        ],
      },
    ],
  },
  {
    id: "country-ma",
    code: "MA",
    name: "Morocco",
    flag: "\ud83c\uddf2\ud83c\udde6",
    regions: [
      {
        id: "region-tanger",
        name: "Tanger-T\u00e9touan-Al Hoce\u00efma",
        ports: [
          { id: "port-tng", code: "TNG", name: "Tangier Med", city: "Tangier", lat: 35.8839, lng: -5.5085 },
          { id: "port-nad", code: "NAD", name: "Nador", city: "Nador", lat: 35.2944, lng: -2.9325 },
        ],
      },
    ],
  },
  {
    id: "country-gb",
    code: "GB",
    name: "England",
    flag: "\ud83c\uddec\ud83c\udde7",
    regions: [
      {
        id: "region-southeast",
        name: "South East England",
        ports: [
          { id: "port-dvr", code: "DVR", name: "Dover", city: "Dover", lat: 51.1279, lng: 1.3134 },
          { id: "port-ptm", code: "PTM", name: "Portsmouth", city: "Portsmouth", lat: 50.7989, lng: -1.0872 },
          { id: "port-nhv", code: "NHV", name: "Newhaven", city: "Newhaven", lat: 50.7919, lng: 0.0513 },
        ],
      },
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const countries = await prisma.country.findMany({
      include: {
        regions: {
          include: {
            ports: true,
          },
        },
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ data: countries });
  } catch {
    return NextResponse.json({ data: FALLBACK_COUNTRIES, _fallback: true });
  }
}
