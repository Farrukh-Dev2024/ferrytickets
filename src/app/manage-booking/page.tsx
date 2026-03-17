"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Ship,
  Calendar,
  MapPin,
  Clock,
  Users,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sampleBookings = [
  {
    id: "bk-001",
    code: "FT-2026-A1B2C3",
    status: "upcoming" as const,
    from: "Piraeus",
    to: "Mykonos",
    date: "2026-04-15",
    time: "07:30",
    operator: "Blue Star Ferries",
    vessel: "Blue Star Patmos",
    passengers: 2,
    totalPrice: 89.0,
    currency: "EUR",
  },
  {
    id: "bk-002",
    code: "FT-2026-D4E5F6",
    status: "completed" as const,
    from: "Naples",
    to: "Palermo",
    date: "2026-02-20",
    time: "20:00",
    operator: "Grimaldi Lines",
    vessel: "Cruise Roma",
    passengers: 3,
    totalPrice: 156.0,
    currency: "EUR",
  },
  {
    id: "bk-003",
    code: "FT-2025-G7H8I9",
    status: "cancelled" as const,
    from: "Marseille",
    to: "Bastia",
    date: "2025-09-10",
    time: "09:00",
    operator: "Corsica Ferries",
    vessel: "Mega Andrea",
    passengers: 1,
    totalPrice: 42.5,
    currency: "EUR",
  },
];

const statusStyles: Record<string, string> = {
  upcoming: "bg-[#4CAF50]/10 text-[#4CAF50]",
  completed: "bg-gray-100 text-gray-500",
  cancelled: "bg-[#F44336]/10 text-[#F44336]",
  edited: "bg-[#FF9800]/10 text-[#FF9800]",
};

export default function ManageBookingPage() {
  const router = useRouter();
  const [referenceCode, setReferenceCode] = useState("");
  const [email, setEmail] = useState("");
  const [searchResult, setSearchResult] = useState<
    (typeof sampleBookings)[0] | null
  >(null);
  const [searchError, setSearchError] = useState("");
  const [activeTab, setActiveTab] = useState("find");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchError("");
    setSearchResult(null);

    if (!referenceCode.trim()) {
      setSearchError("Please enter a booking reference.");
      return;
    }

    const found = sampleBookings.find(
      (b) => b.code.toLowerCase() === referenceCode.trim().toLowerCase()
    );
    if (found) {
      setSearchResult(found);
    } else {
      // Show the first sample booking as a demo
      setSearchResult(sampleBookings[0]);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-8 text-center">
        <Ship className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-2 text-3xl font-bold">Manage Your Booking</h1>
        <p className="text-muted-foreground">
          Find your booking, view details, or make changes to your trip.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as string)}
      >
        <TabsList className="mb-6 grid w-full grid-cols-2">
          <TabsTrigger value="find">Find Booking</TabsTrigger>
          <TabsTrigger value="my-trips">My Trips</TabsTrigger>
        </TabsList>

        {/* Find booking tab */}
        <TabsContent value="find">
          <Card>
            <CardContent className="pt-6">
              <form onSubmit={handleSearch} className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="reference">Booking Reference</Label>
                  <Input
                    id="reference"
                    placeholder="e.g. FT-2026-A1B2C3"
                    value={referenceCode}
                    onChange={(e) => setReferenceCode(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="The email used when booking"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {searchError && (
                  <p className="text-sm text-[#F44336]">{searchError}</p>
                )}
                <Button
                  type="submit"
                  className="h-11 bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
                >
                  <Search className="mr-2 size-4" />
                  Find Booking
                </Button>
              </form>

              {/* Search result */}
              {searchResult && (
                <div className="mt-6 border-t pt-6">
                  <h3 className="mb-3 font-semibold">Booking Found</h3>
                  <BookingCard booking={searchResult} />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* My trips tab */}
        <TabsContent value="my-trips">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Showing sample bookings. Sign in to see your actual trips.
            </p>
            {sampleBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function BookingCard({
  booking,
}: {
  booking: (typeof sampleBookings)[0];
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            {/* Status + code */}
            <div className="mb-3 flex items-center gap-2">
              <Badge className={cn("capitalize", statusStyles[booking.status])}>
                {booking.status}
              </Badge>
              <span className="text-sm font-mono text-muted-foreground">
                {booking.code}
              </span>
            </div>

            {/* Route */}
            <div className="mb-2 flex items-center gap-2 text-lg font-semibold">
              <MapPin className="size-4 text-[#00BCD4]" />
              {booking.from}
              <ChevronRight className="size-4 text-muted-foreground" />
              {booking.to}
            </div>

            {/* Details row */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="size-3.5" />
                {new Date(booking.date).toLocaleDateString("en-GB", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-3.5" />
                {booking.time}
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-3.5" />
                {booking.passengers} passenger
                {booking.passengers !== 1 ? "s" : ""}
              </div>
              <div className="flex items-center gap-1">
                <Ship className="size-3.5" />
                {booking.operator}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="text-right">
            <p className="text-xl font-bold">
              &euro;{booking.totalPrice.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground">{booking.vessel}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
