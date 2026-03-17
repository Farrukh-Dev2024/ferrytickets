import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function generateFallbackSchedules(from: string, to: string, date: string) {
  const fromName = from || "Piraeus";
  const toName = to || "Santorini";
  const travelDate = date || new Date().toISOString().split("T")[0];

  return [
    {
      id: "sched-001",
      departureDate: travelDate,
      departureTime: "07:25",
      arrivalTime: "15:10",
      durationMinutes: 465,
      durationFormatted: "7h 45m",
      route: {
        id: "route-pir-san-conv",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-bs-delos",
        name: "Blue Star Delos",
        type: "conventional",
        yearBuilt: 2011,
        capacity: 2400,
        carCapacity: 700,
        amenities: ["restaurant", "cabins", "deck_bar", "wifi", "pet_area"],
      },
      operator: {
        id: "op-bluestar",
        name: "Blue Star Ferries",
        logo: "/images/operators/blue-star-ferries.png",
        rating: 4.3,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 39.50, originalPrice: null, available: true, seatsLeft: 182 },
        business: { price: 55.00, originalPrice: null, available: true, seatsLeft: 48 },
        cabinInside: { price: 85.00, originalPrice: null, available: true, seatsLeft: 12 },
        cabinOutside: { price: 110.00, originalPrice: null, available: true, seatsLeft: 6 },
        vehicle: { price: 52.00, originalPrice: null, available: true, slotsLeft: 34 },
      },
      stops: ["Paros", "Naxos", "Ios"],
      status: "on_time",
    },
    {
      id: "sched-002",
      departureDate: travelDate,
      departureTime: "07:45",
      arrivalTime: "12:40",
      durationMinutes: 295,
      durationFormatted: "4h 55m",
      route: {
        id: "route-pir-san-hs",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-sj-champion",
        name: "Champion Jet 1",
        type: "high_speed",
        yearBuilt: 1998,
        capacity: 1100,
        carCapacity: 180,
        amenities: ["cafe", "airline_seating", "wifi"],
      },
      operator: {
        id: "op-seajets",
        name: "SeaJets",
        logo: "/images/operators/seajets.png",
        rating: 3.9,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 62.80, originalPrice: 69.80, available: true, seatsLeft: 95 },
        business: { price: 89.00, originalPrice: null, available: true, seatsLeft: 22 },
        cabinInside: null,
        cabinOutside: null,
        vehicle: { price: 78.00, originalPrice: null, available: true, slotsLeft: 11 },
      },
      stops: ["Paros", "Naxos"],
      status: "on_time",
      discount: { type: "early_bird", label: "Early Bird -10%", percentage: 10 },
    },
    {
      id: "sched-003",
      departureDate: travelDate,
      departureTime: "10:30",
      arrivalTime: "17:55",
      durationMinutes: 445,
      durationFormatted: "7h 25m",
      route: {
        id: "route-pir-san-conv2",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-bs-paros",
        name: "Blue Star Paros",
        type: "conventional",
        yearBuilt: 2002,
        capacity: 1900,
        carCapacity: 550,
        amenities: ["restaurant", "cabins", "wifi", "pet_area"],
      },
      operator: {
        id: "op-bluestar",
        name: "Blue Star Ferries",
        logo: "/images/operators/blue-star-ferries.png",
        rating: 4.3,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 39.50, originalPrice: null, available: true, seatsLeft: 210 },
        business: { price: 55.00, originalPrice: null, available: true, seatsLeft: 35 },
        cabinInside: { price: 82.00, originalPrice: null, available: true, seatsLeft: 8 },
        cabinOutside: { price: 105.00, originalPrice: null, available: true, seatsLeft: 4 },
        vehicle: { price: 52.00, originalPrice: null, available: true, slotsLeft: 42 },
      },
      stops: ["Paros", "Naxos", "Ios"],
      status: "on_time",
    },
    {
      id: "sched-004",
      departureDate: travelDate,
      departureTime: "15:10",
      arrivalTime: "19:55",
      durationMinutes: 285,
      durationFormatted: "4h 45m",
      route: {
        id: "route-pir-san-hs2",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-hs-speedr",
        name: "Highspeed 7",
        type: "high_speed",
        yearBuilt: 2018,
        capacity: 1200,
        carCapacity: 200,
        amenities: ["cafe", "airline_seating", "wifi", "usb_charging"],
      },
      operator: {
        id: "op-hellenic",
        name: "Hellenic Seaways",
        logo: "/images/operators/hellenic-seaways.png",
        rating: 4.1,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 59.00, originalPrice: null, available: true, seatsLeft: 67 },
        business: { price: 85.00, originalPrice: null, available: true, seatsLeft: 18 },
        cabinInside: null,
        cabinOutside: null,
        vehicle: { price: 75.00, originalPrice: null, available: true, slotsLeft: 8 },
      },
      stops: ["Paros"],
      status: "on_time",
    },
    {
      id: "sched-005",
      departureDate: travelDate,
      departureTime: "17:00",
      arrivalTime: "21:25",
      durationMinutes: 265,
      durationFormatted: "4h 25m",
      route: {
        id: "route-pir-san-hs3",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-gs-superr",
        name: "SuperExpress",
        type: "high_speed",
        yearBuilt: 2020,
        capacity: 1050,
        carCapacity: 145,
        amenities: ["cafe", "airline_seating", "wifi", "usb_charging", "premium_lounge"],
      },
      operator: {
        id: "op-goldenstar",
        name: "Golden Star Ferries",
        logo: "/images/operators/golden-star-ferries.png",
        rating: 4.0,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 54.50, originalPrice: 64.00, available: true, seatsLeft: 43 },
        business: { price: 79.00, originalPrice: null, available: true, seatsLeft: 14 },
        cabinInside: null,
        cabinOutside: null,
        vehicle: { price: 70.00, originalPrice: null, available: true, slotsLeft: 5 },
      },
      stops: [],
      status: "on_time",
      discount: { type: "flash_sale", label: "Flash Sale -15%", percentage: 15 },
    },
    {
      id: "sched-006",
      departureDate: travelDate,
      departureTime: "23:45",
      arrivalTime: "07:30",
      durationMinutes: 465,
      durationFormatted: "7h 45m",
      route: {
        id: "route-pir-san-night",
        from: { code: "PIR", name: fromName, city: "Athens" },
        to: { code: "SAN", name: toName, city: "Athinios" },
        distanceNm: 128,
      },
      vessel: {
        id: "vessel-anek-prom",
        name: "Prevelis",
        type: "conventional",
        yearBuilt: 2008,
        capacity: 2100,
        carCapacity: 620,
        amenities: ["restaurant", "cabins", "bar", "wifi", "pet_area", "children_play_area"],
      },
      operator: {
        id: "op-anek",
        name: "Anek Lines",
        logo: "/images/operators/anek-lines.png",
        rating: 4.2,
      },
      pricing: {
        currency: "EUR",
        economy: { price: 35.00, originalPrice: null, available: true, seatsLeft: 250 },
        business: { price: 48.00, originalPrice: null, available: true, seatsLeft: 60 },
        cabinInside: { price: 75.00, originalPrice: null, available: true, seatsLeft: 18 },
        cabinOutside: { price: 98.00, originalPrice: null, available: true, seatsLeft: 10 },
        vehicle: { price: 48.00, originalPrice: null, available: true, slotsLeft: 55 },
      },
      stops: ["Paros", "Naxos", "Ios"],
      status: "on_time",
      isOvernight: true,
    },
  ];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || new Date().toISOString().split("T")[0];

  try {
    const schedules = await prisma.schedule.findMany({
      where: {
        date: new Date(date),
        route: {
          fromPort: from ? { code: from.toUpperCase() } : undefined,
          toPort: to ? { code: to.toUpperCase() } : undefined,
        },
      },
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
      orderBy: { departureTime: "asc" },
    });

    return NextResponse.json({ data: schedules, meta: { from, to, date, total: schedules.length } });
  } catch {
    const fallback = generateFallbackSchedules(from, to, date);
    return NextResponse.json({
      data: fallback,
      meta: { from: from || "PIR", to: to || "SAN", date, total: fallback.length },
      _fallback: true,
    });
  }
}
