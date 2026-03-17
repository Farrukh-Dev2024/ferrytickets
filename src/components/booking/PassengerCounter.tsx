"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookingStore } from "@/stores/bookingStore";

interface CounterRowProps {
  label: string;
  description: string;
  value: number;
  min: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

function CounterRow({ label, description, value, min, onIncrement, onDecrement }: CounterRowProps) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex flex-col">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-muted-foreground">{description}</span>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon-sm"
          onClick={onDecrement}
          disabled={value <= min}
          className="rounded-full"
        >
          <Minus className="size-3" />
        </Button>
        <span className="w-6 text-center text-sm font-medium">{value}</span>
        <Button
          variant="outline"
          size="icon-sm"
          onClick={onIncrement}
          className="rounded-full"
        >
          <Plus className="size-3" />
        </Button>
      </div>
    </div>
  );
}

interface PassengerCounterProps {
  onDone: () => void;
}

export function PassengerCounter({ onDone }: PassengerCounterProps) {
  const { passengers, vehicles, pets, updatePassengers, updateVehicles, setPets } =
    useBookingStore();

  return (
    <div className="flex flex-col gap-1">
      <div className="px-1">
        <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Passengers
        </h4>
        <CounterRow
          label="Adults"
          description="12+ years"
          value={passengers.adults}
          min={1}
          onIncrement={() => updatePassengers({ adults: passengers.adults + 1 })}
          onDecrement={() => updatePassengers({ adults: passengers.adults - 1 })}
        />
        <CounterRow
          label="Children"
          description="2-11 years"
          value={passengers.children}
          min={0}
          onIncrement={() => updatePassengers({ children: passengers.children + 1 })}
          onDecrement={() => updatePassengers({ children: passengers.children - 1 })}
        />
        <CounterRow
          label="Infants"
          description="0-1 years"
          value={passengers.infants}
          min={0}
          onIncrement={() => updatePassengers({ infants: passengers.infants + 1 })}
          onDecrement={() => updatePassengers({ infants: passengers.infants - 1 })}
        />
      </div>

      <div className="border-t px-1 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Vehicles
        </h4>
        <CounterRow
          label="Cars"
          description="Standard vehicle"
          value={vehicles.cars}
          min={0}
          onIncrement={() => updateVehicles({ cars: vehicles.cars + 1 })}
          onDecrement={() => updateVehicles({ cars: vehicles.cars - 1 })}
        />
        <CounterRow
          label="Motorcycles"
          description="Motorbike / scooter"
          value={vehicles.motorcycles}
          min={0}
          onIncrement={() => updateVehicles({ motorcycles: vehicles.motorcycles + 1 })}
          onDecrement={() => updateVehicles({ motorcycles: vehicles.motorcycles - 1 })}
        />
        <CounterRow
          label="Bicycles"
          description="Bicycle"
          value={vehicles.bicycles}
          min={0}
          onIncrement={() => updateVehicles({ bicycles: vehicles.bicycles + 1 })}
          onDecrement={() => updateVehicles({ bicycles: vehicles.bicycles - 1 })}
        />
      </div>

      <div className="border-t px-1 pt-2">
        <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
          Pets
        </h4>
        <CounterRow
          label="Pets"
          description="Dogs, cats, etc."
          value={pets}
          min={0}
          onIncrement={() => setPets(pets + 1)}
          onDecrement={() => setPets(pets - 1)}
        />
      </div>

      <Button
        className="mt-2 w-full bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
        onClick={onDone}
      >
        Done
      </Button>
    </div>
  );
}
