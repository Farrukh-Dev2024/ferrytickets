"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Armchair, BedDouble, Ship, Crown, Waves } from "lucide-react";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useBookingStore } from "@/stores/bookingStore";
import { cn } from "@/lib/utils";

interface SeatOption {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
  included?: boolean;
}

const seatOptions: SeatOption[] = [
  {
    id: "deck",
    name: "Deck",
    description:
      "Open-air deck seating. Enjoy the sea breeze and views during your journey.",
    price: 0,
    icon: <Waves className="size-5" />,
    included: true,
  },
  {
    id: "economy",
    name: "Economy Seat",
    description:
      "Comfortable airline-style reclining seat in the main lounge area.",
    price: 5,
    icon: <Armchair className="size-5" />,
  },
  {
    id: "business",
    name: "Business Class",
    description:
      "Spacious leather seat with extra legroom, power outlets, and complimentary refreshments.",
    price: 25,
    icon: <Crown className="size-5" />,
  },
  {
    id: "cabin-2berth",
    name: "2-Berth Cabin",
    description:
      "Private cabin with two beds, ensuite bathroom, and porthole window.",
    price: 45,
    icon: <BedDouble className="size-5" />,
  },
  {
    id: "cabin-4berth",
    name: "4-Berth Cabin",
    description:
      "Shared cabin with four beds and ensuite bathroom. Great for families or groups.",
    price: 35,
    icon: <BedDouble className="size-5" />,
  },
];

function SeatOptionCard({
  option,
  selected,
  onSelect,
}: {
  option: SeatOption;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-all",
        selected && "ring-2 ring-[#00BCD4]"
      )}
      onClick={onSelect}
    >
      <CardContent className="flex items-center gap-4 py-4">
        <RadioGroup value={selected ? option.id : ""}>
          <RadioGroupItem value={option.id} onClick={onSelect} />
        </RadioGroup>

        <div
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-lg",
            selected
              ? "bg-[#00BCD4] text-white"
              : "bg-gray-100 text-gray-500"
          )}
        >
          {option.icon}
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium">{option.name}</span>
            {option.included && (
              <Badge variant="secondary" className="text-xs">
                Included
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            {option.description}
          </p>
        </div>

        <div className="text-right">
          {option.price === 0 ? (
            <span className="font-semibold text-green-600">Free</span>
          ) : (
            <span className="font-semibold">+&euro;{option.price.toFixed(2)}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function LegSeatSelection({
  legId,
  label,
  from,
  to,
  selectedSeat,
  onSelect,
}: {
  legId: string;
  label: string;
  from: string;
  to: string;
  selectedSeat: string;
  onSelect: (seatId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 rounded-lg bg-[#00BCD4] px-4 py-3 text-white">
        <Ship className="size-5" />
        <span className="font-semibold">
          {label}: {from} &rarr; {to}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {seatOptions.map((option) => (
          <SeatOptionCard
            key={option.id}
            option={option}
            selected={selectedSeat === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default function SelectSeatPage() {
  const router = useRouter();
  const {
    tripType,
    fromPort,
    toPort,
    departDate,
    returnDate,
    passengers,
    seatSelections,
    setSeatSelection,
    selectedFerries,
  } = useBookingStore();

  const isReturn = tripType === "return";
  const fromName = fromPort?.name || "Origin";
  const toName = toPort?.name || "Destination";
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  const outboundSeat = seatSelections["outbound"] || "deck";
  const returnSeat = seatSelections["return"] || "deck";

  const handleContinue = () => {
    if (!seatSelections["outbound"]) {
      setSeatSelection("outbound", "deck");
    }
    if (isReturn && !seatSelections["return"]) {
      setSeatSelection("return", "deck");
    }
    router.push("/booking/passengers");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Booking steps */}
      <div className="mb-8">
        <BookingSteps currentStep={2} />
      </div>

      {/* Trip summary */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center gap-4 py-3 text-sm">
          <span className="font-medium">
            {fromName} &rarr; {toName}
          </span>
          {departDate && (
            <span className="text-muted-foreground">
              {departDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
          {isReturn && returnDate && (
            <span className="text-muted-foreground">
              Return:{" "}
              {returnDate.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
          <span className="text-muted-foreground">
            {totalPassengers} passenger{totalPassengers !== 1 ? "s" : ""}
          </span>
        </CardContent>
      </Card>

      {/* Seat selection */}
      <div className="mb-6">
        <h2 className="mb-4 text-xl font-bold">
          Choose your seat or accommodation
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Select a seat type for each leg of your trip. Prices shown are per
          person in addition to your base fare.
        </p>
      </div>

      {/* Outbound leg */}
      <LegSeatSelection
        legId="outbound"
        label="Outbound"
        from={fromName}
        to={toName}
        selectedSeat={outboundSeat}
        onSelect={(seatId) => setSeatSelection("outbound", seatId)}
      />

      {/* Return leg */}
      {isReturn && (
        <div className="mt-8">
          <LegSeatSelection
            legId="return"
            label="Return"
            from={toName}
            to={fromName}
            selectedSeat={returnSeat}
            onSelect={(seatId) => setSeatSelection("return", seatId)}
          />
        </div>
      )}

      {/* Continue button */}
      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          className="h-12"
          onClick={() => router.push("/booking/select-ferry")}
        >
          Back
        </Button>
        <Button
          className="h-12 min-w-[200px] bg-[#00BCD4] text-base font-semibold text-white hover:bg-[#00ACC1]"
          onClick={handleContinue}
        >
          Continue to Passengers
        </Button>
      </div>
    </div>
  );
}
