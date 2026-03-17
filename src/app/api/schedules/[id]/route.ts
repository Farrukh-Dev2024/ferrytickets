import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getFallbackSchedule(id: string) {
  return {
    id,
    departureDate: "2026-07-15",
    departureTime: "07:25",
    arrivalTime: "15:10",
    durationMinutes: 465,
    durationFormatted: "7h 45m",
    route: {
      id: "route-pir-san-conv",
      from: { code: "PIR", name: "Piraeus", city: "Athens", country: "Greece", lat: 37.9475, lng: 23.6372 },
      to: { code: "SAN", name: "Santorini (Thira)", city: "Athinios", country: "Greece", lat: 36.3932, lng: 25.4254 },
      distanceNm: 128,
      estimatedDuration: "7-8 hours (conventional) / 4-5 hours (high-speed)",
    },
    vessel: {
      id: "vessel-bs-delos",
      name: "Blue Star Delos",
      type: "conventional",
      imo: "9552597",
      yearBuilt: 2011,
      grossTonnage: 29522,
      lengthMeters: 176.6,
      speedKnots: 22.5,
      capacity: 2400,
      carCapacity: 700,
      decks: 9,
      amenities: ["restaurant", "self_service_restaurant", "cabins", "deck_bar", "wifi", "pet_area", "children_play_area", "shop", "atm", "luggage_storage"],
      accessibility: true,
    },
    operator: {
      id: "op-bluestar",
      name: "Blue Star Ferries",
      slug: "blue-star-ferries",
      logo: "/images/operators/blue-star-ferries.png",
      website: "https://www.bluestarferries.com",
      phone: "+30 210 891 9800",
      rating: 4.3,
      reviewCount: 2847,
    },
    pricing: {
      currency: "EUR",
      economy: { price: 39.50, originalPrice: null, available: true, seatsLeft: 182 },
      business: { price: 55.00, originalPrice: null, available: true, seatsLeft: 48 },
      cabinInside: { price: 85.00, originalPrice: null, available: true, seatsLeft: 12 },
      cabinOutside: { price: 110.00, originalPrice: null, available: true, seatsLeft: 6 },
      cabinSuite: { price: 165.00, originalPrice: null, available: true, seatsLeft: 2 },
      vehicle: { price: 52.00, originalPrice: null, available: true, slotsLeft: 34 },
      motorcycle: { price: 28.00, originalPrice: null, available: true, slotsLeft: 20 },
      bicycle: { price: 0, originalPrice: null, available: true, slotsLeft: 40 },
    },
    stops: [
      { port: { code: "PAR", name: "Paros" }, arrivalTime: "11:50", departureTime: "12:05", durationMinutes: 15 },
      { port: { code: "NAX", name: "Naxos" }, arrivalTime: "12:45", departureTime: "13:00", durationMinutes: 15 },
      { port: { code: "IOS", name: "Ios" }, arrivalTime: "14:00", departureTime: "14:10", durationMinutes: 10 },
    ],
    status: "on_time",
    delayStats: {
      periodMonths: 12,
      totalSailings: 312,
      onTimePercentage: 78,
      delays: {
        none: { percentage: 78, count: 243 },
        low: { label: "1-15 min", percentage: 13, count: 41 },
        medium: { label: "16-45 min", percentage: 6, count: 19 },
        high: { label: "46+ min", percentage: 2, count: 6 },
        cancelled: { percentage: 1, count: 3 },
      },
      monthlyBreakdown: [
        { month: "2025-07", onTimePercent: 82, avgDelayMin: 8 },
        { month: "2025-08", onTimePercent: 75, avgDelayMin: 14 },
        { month: "2025-09", onTimePercent: 88, avgDelayMin: 5 },
        { month: "2025-10", onTimePercent: 84, avgDelayMin: 7 },
        { month: "2025-11", onTimePercent: 72, avgDelayMin: 18 },
        { month: "2025-12", onTimePercent: 65, avgDelayMin: 25 },
        { month: "2026-01", onTimePercent: 60, avgDelayMin: 30 },
        { month: "2026-02", onTimePercent: 68, avgDelayMin: 22 },
        { month: "2026-03", onTimePercent: 80, avgDelayMin: 10 },
        { month: "2026-04", onTimePercent: 85, avgDelayMin: 6 },
        { month: "2026-05", onTimePercent: 88, avgDelayMin: 5 },
        { month: "2026-06", onTimePercent: 86, avgDelayMin: 7 },
      ],
      commonReasons: [
        { reason: "Weather conditions", percentage: 45 },
        { reason: "Port congestion", percentage: 25 },
        { reason: "Technical issues", percentage: 15 },
        { reason: "Schedule adjustments", percentage: 10 },
        { reason: "Other", percentage: 5 },
      ],
    },
    policies: {
      cancellation: "Free cancellation up to 24 hours before departure. 50% refund within 24 hours.",
      modification: "Free modification up to 12 hours before departure, subject to availability.",
      luggage: "Each passenger may bring up to 50kg of luggage free of charge.",
      checkin: "Passengers should arrive at the port at least 30 minutes before departure (1 hour with vehicle).",
      pets: "Pets are allowed in designated areas. Pet ticket required (€5-€10).",
    },
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const schedule = await prisma.schedule.findUnique({
      where: { id },
      include: {
        route: {
          include: {
            fromPort: true,
            toPort: true,
            operator: true,
            vessel: true,
          },
        },
        pricing: true,
      },
    });

    if (!schedule) {
      return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
    }

    return NextResponse.json({ data: schedule });
  } catch {
    return NextResponse.json({ data: getFallbackSchedule(id), _fallback: true });
  }
}
