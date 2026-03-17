import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function getFallbackBooking(id: string) {
  return {
    id,
    bookingReference: "FT-8A3K9M",
    status: "confirmed",
    createdAt: "2026-03-10T14:22:00Z",
    updatedAt: "2026-03-10T14:25:00Z",
    schedule: {
      id: "sched-001",
      departureDate: "2026-04-01",
      departureTime: "07:25",
      arrivalTime: "15:10",
      durationMinutes: 465,
      durationFormatted: "7h 45m",
      route: {
        from: { code: "PIR", name: "Piraeus", city: "Athens" },
        to: { code: "SAN", name: "Santorini (Thira)", city: "Athinios" },
      },
      operator: {
        id: "op-bluestar",
        name: "Blue Star Ferries",
        logo: "/images/operators/blue-star-ferries.png",
        phone: "+30 210 891 9800",
      },
      vessel: {
        name: "Blue Star Delos",
        type: "conventional",
        amenities: ["restaurant", "cabins", "deck_bar", "wifi", "pet_area"],
      },
      stops: [
        { port: "Paros", arrivalTime: "11:50", departureTime: "12:05" },
        { port: "Naxos", arrivalTime: "12:45", departureTime: "13:00" },
        { port: "Ios", arrivalTime: "14:00", departureTime: "14:10" },
      ],
    },
    passengers: [
      {
        id: "pax-001",
        type: "adult",
        firstName: "John",
        lastName: "Smith",
        dateOfBirth: "1988-05-12",
        nationality: "GB",
        documentType: "passport",
        documentNumber: "***4567",
        seatClass: "business",
        seatNumber: "B-42",
      },
      {
        id: "pax-002",
        type: "adult",
        firstName: "Jane",
        lastName: "Smith",
        dateOfBirth: "1990-09-23",
        nationality: "GB",
        documentType: "passport",
        documentNumber: "***8901",
        seatClass: "business",
        seatNumber: "B-43",
      },
    ],
    vehicle: null,
    contactEmail: "j***@email.com",
    contactPhone: "+44***789",
    pricing: {
      currency: "EUR",
      breakdown: [
        { label: "Business class x 2", amount: 110.00 },
        { label: "Service fee", amount: 4.50 },
        { label: "Port taxes", amount: 8.80 },
      ],
      subtotal: 123.30,
      discount: 0,
      total: 123.30,
    },
    payment: {
      method: "credit_card",
      brand: "Visa",
      last4: "4242",
      status: "paid",
      paidAt: "2026-03-10T14:25:00Z",
      transactionId: "txn_1234567890",
    },
    tickets: {
      eTicketUrl: "/api/bookings/bk-20260401-001/ticket.pdf",
      boardingPassUrl: "/api/bookings/bk-20260401-001/boarding-pass.pdf",
      qrCode: "data:image/png;base64,DEMO_QR_CODE",
    },
    policies: {
      cancellation: "Free cancellation until 2026-03-31T07:25:00Z. 50% refund after that.",
      modification: "Free modification until 2026-03-31T19:25:00Z, subject to availability.",
    },
    timeline: [
      { event: "booking_created", timestamp: "2026-03-10T14:22:00Z", note: "Booking submitted" },
      { event: "payment_completed", timestamp: "2026-03-10T14:25:00Z", note: "Payment processed via Visa ending 4242" },
      { event: "booking_confirmed", timestamp: "2026-03-10T14:25:30Z", note: "E-ticket and boarding pass generated" },
      { event: "confirmation_sent", timestamp: "2026-03-10T14:26:00Z", note: "Confirmation email sent" },
    ],
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        legs: {
          include: {
            schedule: {
              include: {
                route: { include: { fromPort: true, toPort: true, operator: true, vessel: true } },
                pricing: true,
              },
            },
          },
        },
        user: true,
      },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json({ data: booking });
  } catch {
    return NextResponse.json({ data: getFallbackBooking(id), _fallback: true });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = await request.json();
    const { status, contactEmail, contactPhone } = body;

    const updateData: Record<string, unknown> = {};
    if (status) updateData.status = status;
    if (contactEmail) updateData.contactEmail = contactEmail;
    if (contactPhone) updateData.contactPhone = contactPhone;
    updateData.updatedAt = new Date();

    const booking = await prisma.booking.update({
      where: { id },
      data: updateData,
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

    return NextResponse.json({ data: booking });
  } catch {
    let body: Record<string, unknown> = {};
    try {
      body = await request.json();
    } catch {
      // body parsing already failed
    }

    const fallback = getFallbackBooking(id);
    const updated = {
      ...fallback,
      ...(body.status ? { status: String(body.status) } : {}),
      ...(body.contactEmail ? { contactEmail: String(body.contactEmail) } : {}),
      ...(body.contactPhone ? { contactPhone: String(body.contactPhone) } : {}),
      updatedAt: new Date().toISOString(),
      timeline: [
        ...fallback.timeline,
        {
          event: "booking_updated",
          timestamp: new Date().toISOString(),
          note: `Booking updated (demo mode). Changes: ${Object.keys(body).join(", ")}`,
        },
      ],
    };

    return NextResponse.json({ data: updated, _fallback: true });
  }
}
