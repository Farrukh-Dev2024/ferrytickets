"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MapPin,
  CalendarDays,
  Users,
  ArrowLeftRight,
  Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useBookingStore } from "@/stores/bookingStore";
import { LocationSelector } from "./LocationSelector";
import { PassengerCounter } from "./PassengerCounter";

type TripType = "simple" | "return" | "island-hopping";

const tripTypes: { value: TripType; label: string }[] = [
  { value: "simple", label: "Simple" },
  { value: "return", label: "Return" },
  { value: "island-hopping", label: "Island hopping" },
];

export function BookingForm() {
  const router = useRouter();
  const {
    tripType,
    fromPort,
    toPort,
    departDate,
    returnDate,
    passengers,
    vehicles,
    pets,
    setTripType,
    setFromPort,
    setToPort,
    swapPorts,
    setDepartDate,
    setReturnDate,
  } = useBookingStore();

  const [departOpen, setDepartOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const [passengersOpen, setPassengersOpen] = useState(false);

  const totalPassengers = passengers.adults + passengers.children + passengers.infants;
  const totalVehicles = vehicles.cars + vehicles.motorcycles + vehicles.bicycles;

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (fromPort) params.set("from", fromPort.id);
    if (toPort) params.set("to", toPort.id);
    if (departDate) params.set("depart", departDate.toISOString().split("T")[0]);
    if (returnDate && tripType === "return")
      params.set("return", returnDate.toISOString().split("T")[0]);
    params.set("tripType", tripType);
    params.set("adults", String(passengers.adults));
    params.set("children", String(passengers.children));
    params.set("infants", String(passengers.infants));

    router.push(`/booking/select-ferry?${params.toString()}`);
  };

  return (
    <div className="w-full rounded-xl bg-white p-6 shadow-lg">
      {/* Trip type toggle */}
      <div className="mb-5 flex gap-1 rounded-lg bg-[#F5F7FA] p-1">
        {tripTypes.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTripType(t.value)}
            className={cn(
              "flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors",
              tripType === t.value
                ? "bg-[#00BCD4] text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Inputs row */}
      <div className="flex flex-wrap items-end gap-3">
        {/* From */}
        <LocationSelector label="From" value={fromPort} onChange={setFromPort} />

        {/* Swap button */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-full"
          onClick={swapPorts}
        >
          <ArrowLeftRight className="size-4" />
        </Button>

        {/* To */}
        <LocationSelector label="To" value={toPort} onChange={setToPort} />

        {/* Depart date */}
        <Popover open={departOpen} onOpenChange={setDepartOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="h-12 min-w-[150px] justify-start gap-2 px-3"
              />
            }
          >
            <CalendarDays className="size-4 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Depart
              </span>
              <span className={cn("text-sm", !departDate && "text-muted-foreground")}>
                {departDate
                  ? departDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={departDate ?? undefined}
              onSelect={(date) => {
                setDepartDate(date ?? null);
                setDepartOpen(false);
              }}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>

        {/* Return date */}
        <Popover open={returnOpen} onOpenChange={setReturnOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="h-12 min-w-[150px] justify-start gap-2 px-3"
                disabled={tripType === "simple"}
              />
            }
          >
            <CalendarDays className="size-4 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Return
              </span>
              <span className={cn("text-sm", !returnDate && "text-muted-foreground")}>
                {returnDate
                  ? returnDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={returnDate ?? undefined}
              onSelect={(date) => {
                setReturnDate(date ?? null);
                setReturnOpen(false);
              }}
              disabled={{ before: departDate ?? new Date() }}
            />
          </PopoverContent>
        </Popover>

        {/* Passengers/Vehicles */}
        <Popover open={passengersOpen} onOpenChange={setPassengersOpen}>
          <PopoverTrigger
            render={
              <Button
                variant="outline"
                className="h-12 min-w-[160px] justify-start gap-2 px-3"
              />
            }
          >
            <Users className="size-4 text-muted-foreground" />
            <div className="flex flex-col items-start">
              <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                Passengers
              </span>
              <span className="text-sm">
                {totalPassengers} pax
                {totalVehicles > 0 && `, ${totalVehicles} veh`}
                {pets > 0 && `, ${pets} pet${pets > 1 ? "s" : ""}`}
              </span>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <PassengerCounter onDone={() => setPassengersOpen(false)} />
          </PopoverContent>
        </Popover>

        {/* Search button */}
        <Button
          className="h-12 min-w-[120px] gap-2 bg-[#FFC107] text-black font-semibold hover:bg-[#FFB300] shadow-sm"
          onClick={handleSearch}
        >
          <Search className="size-4" />
          SEARCH
        </Button>
      </div>
    </div>
  );
}
