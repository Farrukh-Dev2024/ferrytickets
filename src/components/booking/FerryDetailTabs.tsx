"use client";

import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DelayChart } from "./DelayChart";

interface FerryDetailTabsProps {
  scheduleId: string;
  open: boolean;
}

export function FerryDetailTabs({ scheduleId, open }: FerryDetailTabsProps) {
  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className="rounded-b-xl border-t bg-[#F5F7FA] p-4">
        <Tabs defaultValue="route">
          <TabsList variant="line">
            <TabsTrigger value="route">Route</TabsTrigger>
            <TabsTrigger value="delays">Delays</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="prices">Prices</TabsTrigger>
            <TabsTrigger value="co2">CO2</TabsTrigger>
            <TabsTrigger value="vessel">Vessel</TabsTrigger>
          </TabsList>

          <TabsContent value="route" className="pt-4">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium">Piraeus &rarr; Mykonos</p>
              <p className="text-sm text-muted-foreground">
                Estimated travel time: 4h 30m
              </p>
              <p className="text-sm text-muted-foreground">
                Distance: approximately 160 km. The ferry follows the standard Cycladic route
                with a brief stop at Syros (seasonal).
              </p>
            </div>
          </TabsContent>

          <TabsContent value="delays" className="pt-4">
            <DelayChart />
          </TabsContent>

          <TabsContent value="policies" className="pt-4">
            <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-foreground">&bull;</span>
                Free cancellation up to 24 hours before departure.
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">&bull;</span>
                Changes permitted up to 12 hours before departure with a 10% fee.
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">&bull;</span>
                No-show tickets are non-refundable.
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">&bull;</span>
                Refunds processed within 5-7 business days.
              </li>
              <li className="flex gap-2">
                <span className="text-foreground">&bull;</span>
                Passengers must check in at least 30 minutes before departure.
              </li>
            </ul>
          </TabsContent>

          <TabsContent value="prices" className="pt-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Ticket Type</th>
                  <th className="pb-2 text-right font-medium">Adult</th>
                  <th className="pb-2 text-right font-medium">Child</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">Deck</td>
                  <td className="py-2 text-right">&euro;35.00</td>
                  <td className="py-2 text-right">&euro;17.50</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Economy</td>
                  <td className="py-2 text-right">&euro;52.00</td>
                  <td className="py-2 text-right">&euro;26.00</td>
                </tr>
                <tr>
                  <td className="py-2">Business</td>
                  <td className="py-2 text-right">&euro;89.00</td>
                  <td className="py-2 text-right">&euro;44.50</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>

          <TabsContent value="co2" className="pt-4">
            <div className="flex flex-col gap-3">
              <p className="text-sm">
                Estimated carbon footprint for this route:{" "}
                <span className="font-semibold">12.4 kg CO2</span> per passenger.
              </p>
              <p className="text-sm text-muted-foreground">
                Ferry travel produces approximately 60% less CO2 than flying the same distance.
              </p>
              <Button className="w-fit bg-green-600 text-white hover:bg-green-700">
                Offset with Reforestnow
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="vessel" className="pt-4">
            <ul className="flex flex-col gap-2 text-sm">
              <li className="flex justify-between">
                <span className="text-muted-foreground">Vessel name</span>
                <span className="font-medium">Blue Star Delos</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Year built</span>
                <span className="font-medium">2011</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Passenger capacity</span>
                <span className="font-medium">2,400</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Vehicle capacity</span>
                <span className="font-medium">320</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Length</span>
                <span className="font-medium">176 m</span>
              </li>
              <li className="flex justify-between">
                <span className="text-muted-foreground">Max speed</span>
                <span className="font-medium">27 knots</span>
              </li>
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
