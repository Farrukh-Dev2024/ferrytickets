import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_BOOKINGS = [
  {
    id: "bk-20260401-001",
    bookingReference: "FT-8A3K9M",
    status: "confirmed",
    createdAt: "2026-03-10T14:22:00Z",
    schedule: {
      id: "sched-001",
      departureDate: "2026-04-01",
      departureTime: "07:25",
      arrivalTime: "15:10",
      durationFormatted: "7h 45m",
      route: {
        from: { code: "PIR", name: "Piraeus" },
        to: { code: "SAN", name: "Santorini (Thira)" },
      },
      operator: { name: "Blue Star Ferries", logo: "/images/operators/blue-star-ferries.png" },
      vessel: { name: "Blue Star Delos", type: "conventional" },
    },
    passengers: [
      { type: "adult", firstName: "John", lastName: "Smith", seatClass: "business" },
      { type: "adult", firstName: "Jane", lastName: "Smith", seatClass: "business" },
    ],
    vehicle: null,
    pricing: {
      currency: "EUR",
      tickets: 110.00,
      fees: 4.50,
      taxes: 8.80,
      discount: 0,
      total: 123.30,
    },
    payment: { method: "credit_card", last4: "4242", status: "paid" },
  },
  {
    id: "bk-20260315-002",
    bookingReference: "FT-2B7P4Q",
    status: "completed",
    createdAt: "2026-02-28T09:10:00Z",
    schedule: {
      id: "sched-002",
      departureDate: "2026-03-15",
      departureTime: "15:10",
      arrivalTime: "19:55",
      durationFormatted: "4h 45m",
      route: {
        from: { code: "PIR", name: "Piraeus" },
        to: { code: "MYK", name: "Mykonos" },
      },
      operator: { name: "Hellenic Seaways", logo: "/images/operators/hellenic-seaways.png" },
      vessel: { name: "Highspeed 7", type: "high_speed" },
    },
    passengers: [
      { type: "adult", firstName: "John", lastName: "Smith", seatClass: "economy" },
    ],
    vehicle: null,
    pricing: {
      currency: "EUR",
      tickets: 59.00,
      fees: 3.00,
      taxes: 4.72,
      discount: 0,
      total: 66.72,
    },
    payment: { method: "credit_card", last4: "4242", status: "paid" },
  },
  {
    id: "bk-20260510-003",
    bookingReference: "FT-9C1R6W",
    status: "pending",
    createdAt: "2026-03-16T20:05:00Z",
    schedule: {
      id: "sched-003",
      departureDate: "2026-05-10",
      departureTime: "23:45",
      arrivalTime: "07:30",
      durationFormatted: "7h 45m",
      route: {
        from: { code: "PIR", name: "Piraeus" },
        to: { code: "HER", name: "Heraklion" },
      },
      operator: { name: "Minoan Lines", logo: "/images/operators/minoan-lines.png" },
      vessel: { name: "Cruise Europa", type: "conventional" },
    },
    passengers: [
      { type: "adult", firstName: "John", lastName: "Smith", seatClass: "cabinOutside" },
      { type: "adult", firstName: "Jane", lastName: "Smith", seatClass: "cabinOutside" },
      { type: "child", firstName: "Tom", lastName: "Smith", seatClass: "cabinOutside" },
    ],
    vehicle: { type: "car", licensePlate: "ABC-1234", length: "4.5m" },
    pricing: {
      currency: "EUR",
      tickets: 265.00,
      vehicleFee: 52.00,
      fees: 6.50,
      taxes: 25.88,
      discount: -26.50,
      discountLabel: "Early bird 10%",
      total: 322.88,
    },
    payment: { method: "paypal", email: "j***@email.com", status: "pending" },
  },
];

export async function GET(request: NextRequest) {
  try {
    const bookings = await prisma.booking.findMany({
      include: {
        legs: {
          include: {
            schedule: {
              include: {
                route: { include: { fromPort: true, toPort: true, operator: true, vessel: true } },
              },
            },
          },
        },
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data: bookings });
  } catch {
    return NextResponse.json({ data: FALLBACK_BOOKINGS, _fallback: true });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { scheduleId, passengers, vehicle, seatClass, contactEmail, contactPhone } = body;

    if (!scheduleId || !passengers || passengers.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields: scheduleId, passengers" },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.create({
      data: {
        userId: body.userId,
        code: `FT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
        status: "pending",
        totalPrice: body.totalPrice || 0,
        currency: body.currency || "EUR",
        type: body.type || "one_way",
        legs: {
          create: {
            scheduleId,
            passengers: passengers.length,
            vehicles: vehicle ? 1 : 0,
            pets: body.pets || 0,
            seatInfo: seatClass || "economy",
            status: "pending",
          },
        },
      },
      include: {
        legs: {
          include: {
            schedule: {
              include: {
                route: { include: { fromPort: true, toPort: true, operator: true, vessel: true } },
              },
            },
          },
        },
        user: true,
      },
    });

    return NextResponse.json({ data: booking }, { status: 201 });
  } catch {
    const body = await request.json().catch(() => ({}));

    const fallbackBooking = {
      id: `bk-${Date.now()}`,
      bookingReference: `FT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: "pending",
      createdAt: new Date().toISOString(),
      scheduleId: body.scheduleId || "sched-001",
      passengers: body.passengers || [
        { type: "adult", firstName: "Guest", lastName: "User", seatClass: body.seatClass || "economy" },
      ],
      vehicle: body.vehicle || null,
      contactEmail: body.contactEmail || null,
      contactPhone: body.contactPhone || null,
      message: "Booking created in demo mode. Connect a database for persistence.",
      _fallback: true,
    };

    return NextResponse.json({ data: fallbackBooking, _fallback: true }, { status: 201 });
  }
}
