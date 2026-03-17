import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_PORTS: Record<string, Array<{
  id: string;
  code: string;
  name: string;
  city: string;
  country: string;
  countryCode: string;
  region: string;
  lat: number;
  lng: number;
  facilities: string[];
}>> = {
  GR: [
    { id: "port-pir", code: "PIR", name: "Piraeus", city: "Athens", country: "Greece", countryCode: "GR", region: "Attica", lat: 37.9475, lng: 23.6372, facilities: ["parking", "wifi", "restaurant", "lounge", "atm", "luggage_storage"] },
    { id: "port-raf", code: "RAF", name: "Rafina", city: "Rafina", country: "Greece", countryCode: "GR", region: "Attica", lat: 38.0228, lng: 24.0097, facilities: ["parking", "restaurant", "atm"] },
    { id: "port-lav", code: "LAV", name: "Lavrio", city: "Lavrio", country: "Greece", countryCode: "GR", region: "Attica", lat: 37.7131, lng: 24.0548, facilities: ["parking", "cafe"] },
    { id: "port-myk", code: "MYK", name: "Mykonos", city: "Mykonos Town", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 37.4467, lng: 25.3289, facilities: ["wifi", "restaurant", "taxi_stand"] },
    { id: "port-san", code: "SAN", name: "Santorini (Thira)", city: "Athinios", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 36.3932, lng: 25.4254, facilities: ["cafe", "taxi_stand", "bus_stop"] },
    { id: "port-par", code: "PAR", name: "Paros", city: "Parikia", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 37.0853, lng: 25.1481, facilities: ["wifi", "restaurant", "taxi_stand"] },
    { id: "port-nax", code: "NAX", name: "Naxos", city: "Naxos Town", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 37.1066, lng: 25.3722, facilities: ["cafe", "taxi_stand"] },
    { id: "port-ios", code: "IOS", name: "Ios", city: "Ios Port", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 36.7231, lng: 25.2822, facilities: ["cafe"] },
    { id: "port-mil", code: "MIL", name: "Milos", city: "Adamas", country: "Greece", countryCode: "GR", region: "Cyclades", lat: 36.7108, lng: 24.4451, facilities: ["cafe", "taxi_stand"] },
    { id: "port-her", code: "HER", name: "Heraklion", city: "Heraklion", country: "Greece", countryCode: "GR", region: "Crete", lat: 35.3387, lng: 25.1442, facilities: ["parking", "wifi", "restaurant", "lounge", "atm"] },
    { id: "port-cha", code: "CHA", name: "Chania (Souda)", city: "Souda", country: "Greece", countryCode: "GR", region: "Crete", lat: 35.4881, lng: 24.0764, facilities: ["parking", "cafe", "atm"] },
    { id: "port-rho", code: "RHO", name: "Rhodes", city: "Rhodes Town", country: "Greece", countryCode: "GR", region: "Dodecanese", lat: 36.4499, lng: 28.2241, facilities: ["parking", "wifi", "restaurant", "atm", "luggage_storage"] },
    { id: "port-kos", code: "KOS", name: "Kos", city: "Kos Town", country: "Greece", countryCode: "GR", region: "Dodecanese", lat: 36.8952, lng: 27.0918, facilities: ["cafe", "taxi_stand"] },
    { id: "port-pat", code: "PAT", name: "Patmos", city: "Skala", country: "Greece", countryCode: "GR", region: "Dodecanese", lat: 37.3174, lng: 26.5479, facilities: ["cafe"] },
    { id: "port-sky", code: "SKY", name: "Skiathos", city: "Skiathos Town", country: "Greece", countryCode: "GR", region: "Sporades", lat: 39.1622, lng: 23.4903, facilities: ["cafe", "taxi_stand"] },
    { id: "port-sko", code: "SKO", name: "Skopelos", city: "Skopelos Town", country: "Greece", countryCode: "GR", region: "Sporades", lat: 39.1220, lng: 23.7272, facilities: ["cafe"] },
  ],
  IT: [
    { id: "port-nap", code: "NAP", name: "Naples", city: "Naples", country: "Italy", countryCode: "IT", region: "Campania", lat: 40.8359, lng: 14.2681, facilities: ["parking", "wifi", "restaurant", "lounge", "atm", "luggage_storage"] },
    { id: "port-sor", code: "SOR", name: "Sorrento", city: "Sorrento", country: "Italy", countryCode: "IT", region: "Campania", lat: 40.6263, lng: 14.3756, facilities: ["cafe", "taxi_stand"] },
    { id: "port-cap", code: "CAP", name: "Capri", city: "Marina Grande", country: "Italy", countryCode: "IT", region: "Campania", lat: 40.5507, lng: 14.2431, facilities: ["cafe", "taxi_stand"] },
    { id: "port-olb", code: "OLB", name: "Olbia", city: "Olbia", country: "Italy", countryCode: "IT", region: "Sardinia", lat: 40.9225, lng: 9.5059, facilities: ["parking", "restaurant", "atm"] },
    { id: "port-pal", code: "PAL", name: "Palermo", city: "Palermo", country: "Italy", countryCode: "IT", region: "Sicily", lat: 38.1257, lng: 13.3615, facilities: ["parking", "wifi", "restaurant", "atm"] },
  ],
  FR: [
    { id: "port-mrs", code: "MRS", name: "Marseille", city: "Marseille", country: "France", countryCode: "FR", region: "PACA", lat: 43.3028, lng: 5.3594, facilities: ["parking", "wifi", "restaurant", "lounge", "atm", "luggage_storage"] },
    { id: "port-nic", code: "NIC", name: "Nice", city: "Nice", country: "France", countryCode: "FR", region: "PACA", lat: 43.6947, lng: 7.2856, facilities: ["parking", "cafe", "atm"] },
    { id: "port-aja", code: "AJA", name: "Ajaccio", city: "Ajaccio", country: "France", countryCode: "FR", region: "Corsica", lat: 41.9192, lng: 8.7386, facilities: ["parking", "cafe", "atm"] },
    { id: "port-bas", code: "BAS", name: "Bastia", city: "Bastia", country: "France", countryCode: "FR", region: "Corsica", lat: 42.7008, lng: 9.4503, facilities: ["parking", "cafe"] },
  ],
  MA: [
    { id: "port-tng", code: "TNG", name: "Tangier Med", city: "Tangier", country: "Morocco", countryCode: "MA", region: "Tanger-Tetouan", lat: 35.8839, lng: -5.5085, facilities: ["parking", "restaurant", "atm", "duty_free"] },
    { id: "port-nad", code: "NAD", name: "Nador", city: "Nador", country: "Morocco", countryCode: "MA", region: "Oriental", lat: 35.2944, lng: -2.9325, facilities: ["parking", "cafe"] },
  ],
  GB: [
    { id: "port-dvr", code: "DVR", name: "Dover", city: "Dover", country: "England", countryCode: "GB", region: "Kent", lat: 51.1279, lng: 1.3134, facilities: ["parking", "wifi", "restaurant", "lounge", "atm", "luggage_storage", "duty_free"] },
    { id: "port-ptm", code: "PTM", name: "Portsmouth", city: "Portsmouth", country: "England", countryCode: "GB", region: "Hampshire", lat: 50.7989, lng: -1.0872, facilities: ["parking", "wifi", "restaurant", "atm"] },
    { id: "port-nhv", code: "NHV", name: "Newhaven", city: "Newhaven", country: "England", countryCode: "GB", region: "East Sussex", lat: 50.7919, lng: 0.0513, facilities: ["parking", "cafe"] },
  ],
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country")?.toUpperCase();

  try {
    const where = country ? { country: { code: country } } : {};
    const ports = await prisma.port.findMany({
      where,
      include: {
        country: true,
        region: true,
      },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ data: ports });
  } catch {
    if (country && FALLBACK_PORTS[country]) {
      return NextResponse.json({ data: FALLBACK_PORTS[country], _fallback: true });
    }

    if (country) {
      return NextResponse.json({ data: [], _fallback: true });
    }

    const allPorts = Object.values(FALLBACK_PORTS).flat();
    return NextResponse.json({ data: allPorts, _fallback: true });
  }
}
