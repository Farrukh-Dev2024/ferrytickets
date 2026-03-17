import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  Anchor,
  Sun,
  AlertTriangle,
  Accessibility,
  Dog,
  Car,
  Baby,
} from "lucide-react";

const infoSections = [
  {
    icon: FileText,
    title: "Required Documents",
    content:
      "All passengers need a valid photo ID or passport. EU/EEA citizens can travel with a national ID card within the Schengen area. Non-EU citizens should carry their passport and check visa requirements for their destination country. Vehicle owners must bring their driving license, vehicle registration, and insurance documents.",
  },
  {
    icon: Anchor,
    title: "Check-in & Boarding",
    content:
      "Foot passengers should arrive at the port at least 60 minutes before departure. If traveling with a vehicle, arrive 90-120 minutes early. Check-in counters are located at the port terminal. Have your booking confirmation (printed or digital) and ID ready. Boarding typically begins 30-45 minutes before sailing.",
  },
  {
    icon: Sun,
    title: "Best Time to Travel",
    content:
      "Peak season in the Mediterranean runs from June to September, with the busiest periods in July and August. For calmer seas and fewer crowds, consider traveling in May, early June, or September-October. Winter sailings (November-March) have reduced schedules and some routes may be suspended.",
  },
  {
    icon: AlertTriangle,
    title: "Weather & Delays",
    content:
      "Ferry services may be affected by strong winds (force 7+). The Meltemi wind in the Aegean Sea is common from July to September. If your ferry is cancelled due to weather, you'll be rebooked on the next available sailing or given a full refund. Check our delay statistics on each route for historical reliability data.",
  },
  {
    icon: Car,
    title: "Traveling with a Vehicle",
    content:
      "Cars, motorcycles, camper vans, and bicycles can be transported on most conventional ferries. Declare your vehicle when booking to ensure space. Arrive early for vehicle check-in. You'll park in the car deck and proceed to passenger areas. Remember to switch off your engine and apply the handbrake before leaving your vehicle.",
  },
  {
    icon: Dog,
    title: "Traveling with Pets",
    content:
      "Most ferry operators welcome pets on board. Dogs must be kept on a leash in common areas or in designated pet-friendly cabins. Cats should travel in a carrier. Bring your pet's EU Pet Passport with up-to-date vaccinations. Some operators provide pet-friendly outdoor deck areas. Add pets to your booking during the reservation process.",
  },
  {
    icon: Baby,
    title: "Traveling with Children",
    content:
      "Children under 5 often travel free (without a seat). Discounted fares are available for ages 5-11 on most operators. Many ferries have play areas, family cabins, and child-friendly dining options. Baby changing facilities are available on most vessels. Bring entertainment, snacks, and motion sickness remedies just in case.",
  },
  {
    icon: Accessibility,
    title: "Accessibility",
    content:
      "Modern ferries are equipped with accessible cabins, elevators, and wheelchair-friendly decks. If you require special assistance, note it during booking or contact our support team at least 48 hours before departure. Port terminals generally have ramp access and assistance services available.",
  },
];

export default function UsefulInfoPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Useful Information</h1>
        <p className="text-muted-foreground">
          Everything you need to know to prepare for your ferry trip.
        </p>
      </div>

      <div className="space-y-6">
        {infoSections.map((section) => {
          const Icon = section.icon;
          return (
            <Card key={section.title}>
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#E0F7FA]">
                    <Icon className="size-5 text-[#00BCD4]" />
                  </div>
                  <h2 className="text-xl font-bold">{section.title}</h2>
                </div>
                <p className="leading-relaxed text-muted-foreground">
                  {section.content}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
