"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Edit2, Ship } from "lucide-react";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { FerryCard } from "@/components/booking/FerryCard";
import { FerryDetailTabs } from "@/components/booking/FerryDetailTabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useBookingStore } from "@/stores/bookingStore";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ScheduleResult = any;

function SkeletonCard() {
  return (
    <Card>
      <CardContent className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="size-10 animate-pulse rounded-full bg-gray-200" />
          <div className="flex flex-1 flex-col gap-2">
            <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-3 w-48 animate-pulse rounded bg-gray-200" />
          </div>
          <div className="h-6 w-20 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-px bg-gray-100" />
        <div className="flex items-center justify-between">
          <div className="h-3 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
        </div>
      </CardContent>
    </Card>
  );
}

function RouteLegSection({
  label,
  from,
  to,
  date,
  schedules,
  loading,
  selectedId,
  onSelect,
  onDateChange,
}: {
  label: string;
  from: string;
  to: string;
  date: string;
  schedules: ScheduleResult[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDateChange: (offset: number) => void;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formattedDate = new Date(date + "T00:00:00").toLocaleDateString(
    "en-GB",
    { weekday: "short", day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Route leg header */}
      <div className="flex items-center justify-between rounded-lg bg-[#00BCD4] px-4 py-3 text-white">
        <div className="flex items-center gap-2">
          <Ship className="size-5" />
          <span className="font-semibold">
            {label}: {from} &rarr; {to}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white hover:bg-white/20"
            onClick={() => onDateChange(-1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-sm font-medium">{formattedDate}</span>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 text-white hover:bg-white/20"
            onClick={() => onDateChange(1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* Schedule list */}
      {loading ? (
        <div className="flex flex-col gap-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      ) : schedules.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Ship className="mx-auto mb-3 size-10 text-muted-foreground" />
            <p className="text-lg font-medium">No ferries available</p>
            <p className="text-sm text-muted-foreground">
              Try a different date or route.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="flex flex-col gap-3">
          {schedules.map((schedule: ScheduleResult) => (
            <div key={schedule.id}>
              <FerryCard
                schedule={schedule}
                selected={selectedId === schedule.id}
                onSelect={() => onSelect(schedule.id)}
                onViewDetails={() =>
                  setExpandedId(
                    expandedId === schedule.id ? null : schedule.id
                  )
                }
              />
              <FerryDetailTabs
                scheduleId={schedule.id}
                open={expandedId === schedule.id}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SelectFerryPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="h-8 w-8 animate-spin rounded-full border-4 border-[#00BCD4] border-t-transparent" /></div>}>
      <SelectFerryContent />
    </Suspense>
  );
}

function SelectFerryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { tripType, selectFerry, selectedFerries } = useBookingStore();

  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const initialDepart = searchParams.get("depart") || "";
  const initialReturn = searchParams.get("return") || "";
  const tripTypeParam = searchParams.get("tripType") || tripType;
  const adults = searchParams.get("adults") || "1";
  const children = searchParams.get("children") || "0";
  const infants = searchParams.get("infants") || "0";

  const totalPassengers =
    Number(adults) + Number(children) + Number(infants);

  const [departDate, setDepartDate] = useState(initialDepart);
  const [returnDate, setReturnDate] = useState(initialReturn);
  const [outboundSchedules, setOutboundSchedules] = useState<ScheduleResult[]>([]);
  const [returnSchedules, setReturnSchedules] = useState<ScheduleResult[]>([]);
  const [loadingOutbound, setLoadingOutbound] = useState(true);
  const [loadingReturn, setLoadingReturn] = useState(true);
  const [showEditBar, setShowEditBar] = useState(false);

  const isReturn = tripTypeParam === "return";

  const fetchSchedules = useCallback(
    async (
      fromId: string,
      toId: string,
      date: string,
      setter: (data: ScheduleResult[]) => void,
      setLoading: (v: boolean) => void
    ) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          from: fromId,
          to: toId,
          date,
          adults,
          children,
          infants,
        });
        const res = await fetch(`/api/schedules?${params.toString()}`);
        const json = await res.json();
        setter(json.data || []);
      } catch {
        setter([]);
      } finally {
        setLoading(false);
      }
    },
    [adults, children, infants]
  );

  useEffect(() => {
    if (from && to && departDate) {
      fetchSchedules(from, to, departDate, setOutboundSchedules, setLoadingOutbound);
    }
  }, [from, to, departDate, fetchSchedules]);

  useEffect(() => {
    if (isReturn && to && from && returnDate) {
      fetchSchedules(to, from, returnDate, setReturnSchedules, setLoadingReturn);
    }
  }, [isReturn, to, from, returnDate, fetchSchedules]);

  const handleDepartDateChange = (offset: number) => {
    const d = new Date(departDate + "T00:00:00");
    d.setDate(d.getDate() + offset);
    setDepartDate(d.toISOString().split("T")[0]);
  };

  const handleReturnDateChange = (offset: number) => {
    const d = new Date(returnDate + "T00:00:00");
    d.setDate(d.getDate() + offset);
    setReturnDate(d.toISOString().split("T")[0]);
  };

  const outboundSelected = selectedFerries["outbound"] || null;
  const returnSelected = selectedFerries["return"] || null;

  const canContinue = isReturn
    ? outboundSelected !== null && returnSelected !== null
    : outboundSelected !== null;

  const handleContinue = () => {
    router.push("/booking/select-seat");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Booking steps */}
      <div className="mb-8">
        <BookingSteps currentStep={1} />
      </div>

      {/* Compact search summary bar */}
      <Card className="mb-6">
        <CardContent className="flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="font-medium">
              {from} &rarr; {to}
            </span>
            <span className="text-muted-foreground">{departDate}</span>
            {isReturn && (
              <span className="text-muted-foreground">
                Return: {returnDate}
              </span>
            )}
            <span className="text-muted-foreground">
              {totalPassengers} passenger{totalPassengers !== 1 ? "s" : ""}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5"
            onClick={() => setShowEditBar(!showEditBar)}
          >
            <Edit2 className="size-3.5" />
            Edit
          </Button>
        </CardContent>
      </Card>

      {showEditBar && (
        <Card className="mb-6 border-[#00BCD4]">
          <CardContent className="py-4 text-center text-sm text-muted-foreground">
            To modify your search, go back to the{" "}
            <Button
              variant="link"
              className="h-auto p-0 text-[#00BCD4]"
              onClick={() => router.push("/")}
            >
              homepage
            </Button>{" "}
            and start a new search.
          </CardContent>
        </Card>
      )}

      {/* Outbound section */}
      <RouteLegSection
        label="Outbound"
        from={from}
        to={to}
        date={departDate}
        schedules={outboundSchedules}
        loading={loadingOutbound}
        selectedId={outboundSelected}
        onSelect={(id) => selectFerry("outbound", id)}
        onDateChange={handleDepartDateChange}
      />

      {/* Return section */}
      {isReturn && (
        <div className="mt-8">
          <RouteLegSection
            label="Return"
            from={to}
            to={from}
            date={returnDate}
            schedules={returnSchedules}
            loading={loadingReturn}
            selectedId={returnSelected}
            onSelect={(id) => selectFerry("return", id)}
            onDateChange={handleReturnDateChange}
          />
        </div>
      )}

      {/* Continue button */}
      <div className="mt-8 flex justify-end">
        <Button
          className={cn(
            "h-12 min-w-[200px] text-base font-semibold",
            canContinue
              ? "bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
              : "bg-gray-200 text-gray-400"
          )}
          disabled={!canContinue}
          onClick={handleContinue}
        >
          Continue to Seat Selection
        </Button>
      </div>
    </div>
  );
}
