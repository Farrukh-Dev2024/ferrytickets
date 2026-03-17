"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import type { Port } from "@/types";

interface PortGroup {
  country: string;
  regions: {
    name: string;
    ports: Port[];
  }[];
}

const sampleData: PortGroup[] = [
  {
    country: "Greece",
    regions: [
      {
        name: "Cyclades",
        ports: [
          { id: "pir", name: "Piraeus", code: "PIR", regionId: "cyclades", countryId: "gr", lat: 37.9475, lng: 23.6372 },
          { id: "myk", name: "Mykonos", code: "MYK", regionId: "cyclades", countryId: "gr", lat: 37.4467, lng: 25.3289 },
          { id: "san", name: "Santorini", code: "SAN", regionId: "cyclades", countryId: "gr", lat: 36.3932, lng: 25.4615 },
          { id: "nax", name: "Naxos", code: "NAX", regionId: "cyclades", countryId: "gr", lat: 37.1036, lng: 25.3764 },
          { id: "par", name: "Paros", code: "PAR", regionId: "cyclades", countryId: "gr", lat: 37.0853, lng: 25.152 },
        ],
      },
      {
        name: "Crete",
        ports: [
          { id: "her", name: "Heraklion", code: "HER", regionId: "crete", countryId: "gr", lat: 35.3387, lng: 25.1442 },
          { id: "cha", name: "Chania", code: "CHA", regionId: "crete", countryId: "gr", lat: 35.5138, lng: 24.0180 },
        ],
      },
      {
        name: "Dodecanese",
        ports: [
          { id: "rho", name: "Rhodes", code: "RHO", regionId: "dodecanese", countryId: "gr", lat: 36.4510, lng: 28.2278 },
          { id: "kos", name: "Kos", code: "KOS", regionId: "dodecanese", countryId: "gr", lat: 36.8931, lng: 26.9428 },
        ],
      },
    ],
  },
  {
    country: "Italy",
    regions: [
      {
        name: "Campania",
        ports: [
          { id: "nap", name: "Naples", code: "NAP", regionId: "campania", countryId: "it", lat: 40.8518, lng: 14.2681 },
          { id: "sal", name: "Salerno", code: "SAL", regionId: "campania", countryId: "it", lat: 40.6824, lng: 14.7681 },
        ],
      },
    ],
  },
  {
    country: "France",
    regions: [
      {
        name: "PACA",
        ports: [
          { id: "mar", name: "Marseille", code: "MAR", regionId: "paca", countryId: "fr", lat: 43.2965, lng: 5.3698 },
          { id: "nic", name: "Nice", code: "NIC", regionId: "paca", countryId: "fr", lat: 43.7102, lng: 7.2620 },
          { id: "tou", name: "Toulon", code: "TOU", regionId: "paca", countryId: "fr", lat: 43.1242, lng: 5.9280 },
        ],
      },
    ],
  },
];

interface LocationSelectorProps {
  label: string;
  value: Port | null;
  onChange: (port: Port) => void;
}

export function LocationSelector({ label, value, onChange }: LocationSelectorProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredData = sampleData
    .map((group) => ({
      ...group,
      regions: group.regions
        .map((region) => ({
          ...region,
          ports: region.ports.filter((port) =>
            port.name.toLowerCase().includes(search.toLowerCase())
          ),
        }))
        .filter((region) => region.ports.length > 0),
    }))
    .filter((group) => group.regions.length > 0);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button variant="outline" className="h-12 min-w-[160px] justify-start gap-2 px-3" />
        }
      >
        <MapPin className="size-4 text-muted-foreground" />
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </span>
          <span className={cn("text-sm", !value && "text-muted-foreground")}>
            {value ? value.name : "Select port"}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0" align="start">
        <div className="p-2">
          <Input
            placeholder="Search ports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="max-h-64 overflow-y-auto px-1 pb-2">
          {filteredData.length === 0 && (
            <p className="px-3 py-2 text-sm text-muted-foreground">No ports found.</p>
          )}
          {filteredData.map((group) => (
            <div key={group.country}>
              <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-foreground">
                {group.country}
              </div>
              {group.regions.map((region) => (
                <div key={region.name}>
                  <div className="px-3 py-1 text-xs italic text-muted-foreground">
                    {region.name}
                  </div>
                  {region.ports.map((port) => (
                    <button
                      key={port.id}
                      type="button"
                      className={cn(
                        "flex w-full items-center rounded-md px-4 py-1.5 text-sm transition-colors hover:bg-muted",
                        value?.id === port.id && "bg-[#00BCD4]/10 text-[#00BCD4]"
                      )}
                      onClick={() => {
                        onChange(port);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      {port.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
