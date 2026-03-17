import {
  Star,
  Wifi,
  Utensils,
  BedDouble,
  Anchor,
  Clock,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Schedule } from "@/types";

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="size-4" />,
  restaurant: <Utensils className="size-4" />,
  cabin: <BedDouble className="size-4" />,
  deck: <Anchor className="size-4" />,
};

interface FerryCardProps {
  schedule: Schedule;
  selected: boolean;
  onSelect: () => void;
  onViewDetails: () => void;
}

export function FerryCard({ schedule, selected, onSelect, onViewDetails }: FerryCardProps) {
  const route = schedule.route;
  const vessel = route?.vessel;
  const operator = route?.operator ?? vessel?.operator;
  const pricing = schedule.pricing?.[0];

  const operatorName = operator?.name ?? "Operator";
  const operatorInitial = operatorName.charAt(0).toUpperCase();
  const vesselName = vessel?.name ?? "Ferry";
  const amenities = vessel?.amenities ?? [];

  const basePrice = pricing?.basePrice ?? 0;
  const discount = pricing?.discount ?? null;
  const discountedPrice = discount ? basePrice * (1 - discount / 100) : basePrice;
  const currency = pricing?.currency ?? "EUR";

  const departureTime = schedule.departureTime;
  const arrivalTime = schedule.arrivalTime;

  const hours = Math.floor(schedule.duration / 60);
  const minutes = schedule.duration % 60;
  const durationLabel = `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim();

  const rating = 4.2;

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all",
        selected && "ring-2 ring-[#00BCD4]"
      )}
      onClick={onSelect}
    >
      <CardContent className="flex flex-col gap-4">
        {/* Main row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Operator */}
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-full bg-[#00BCD4] text-sm font-bold text-white">
              {operatorInitial}
            </div>
            <span className="text-sm font-medium">{operatorName}</span>
          </div>

          {/* Schedule */}
          <div className="flex flex-1 items-center justify-center gap-3">
            <div className="text-center">
              <p className="text-lg font-bold">{departureTime}</p>
              <p className="text-xs text-muted-foreground">
                {route?.fromPort?.name ?? "Origin"}
              </p>
            </div>
            <div className="flex flex-col items-center gap-0.5">
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {durationLabel}
              </div>
              <div className="relative h-0.5 w-24 bg-gray-200">
                <div className="absolute inset-0 bg-[#00BCD4]" />
              </div>
              <p className="text-[10px] text-muted-foreground">{vesselName}</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{arrivalTime}</p>
              <p className="text-xs text-muted-foreground">
                {route?.toPort?.name ?? "Destination"}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="flex flex-col items-end gap-0.5">
            {discount !== null && discount > 0 && (
              <Badge className="bg-green-100 text-green-700">
                -{discount}%
              </Badge>
            )}
            {discount !== null && discount > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {currency === "EUR" ? "\u20AC" : "$"}{basePrice.toFixed(2)}
              </span>
            )}
            <span className="text-xl font-bold text-foreground">
              {currency === "EUR" ? "\u20AC" : "$"}{discountedPrice.toFixed(2)}
            </span>
          </div>

          {/* Radio */}
          <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
            <RadioGroup value={selected ? "selected" : ""}>
              <RadioGroupItem
                value="selected"
                onClick={onSelect}
              />
            </RadioGroup>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-wrap items-center justify-between border-t pt-3">
          <div className="flex items-center gap-4">
            {/* Rating */}
            <div className="flex items-center gap-1">
              <Star className="size-4 fill-[#FFC107] text-[#FFC107]" />
              <span className="text-sm font-medium">{rating}</span>
            </div>

            {/* Amenities */}
            <div className="flex items-center gap-2 text-muted-foreground">
              {amenities.map((amenity) => (
                <span
                  key={amenity}
                  title={amenity}
                  className="flex items-center"
                >
                  {amenityIcons[amenity.toLowerCase()] ?? (
                    <Anchor className="size-4" />
                  )}
                </span>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 text-[#00BCD4]"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails();
            }}
          >
            View details
            <ChevronDown className="size-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
