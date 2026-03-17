import { brand } from "@/config/brand";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Mail, Calendar } from "lucide-react";

const pressReleases = [
  {
    date: "2025-11-15",
    title: "Ferrytickets Surpasses 1 Million Bookings in 2025",
    summary:
      "Ferrytickets announces a record-breaking milestone, having processed over one million ferry bookings in 2025, driven by expansion into new Mediterranean and Baltic routes.",
  },
  {
    date: "2025-08-22",
    title: "Ferrytickets Partners with Leading Greek Ferry Operators",
    summary:
      "A new strategic partnership brings exclusive fares and priority boarding for Ferrytickets customers traveling across the Greek islands during the summer season.",
  },
  {
    date: "2025-05-10",
    title: "Ferrytickets Launches Mobile App for iOS and Android",
    summary:
      "Travelers can now search, book, and manage ferry tickets on the go with the new Ferrytickets mobile app, featuring offline ticket access and real-time departure alerts.",
  },
];

export default function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Newspaper className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Press & Media</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {brand.name} is a leading online ferry booking platform serving
          travelers across Europe and beyond. We connect passengers with 50+
          ferry operators on 500+ routes spanning 20+ countries. For press
          inquiries, interviews, or media assets, please reach out to our
          communications team.
        </p>
      </div>

      {/* Press Releases */}
      <h2 className="mb-4 text-2xl font-bold">Latest Press Releases</h2>
      <div className="mb-10 space-y-4">
        {pressReleases.map((pr) => (
          <Card key={pr.date} className="transition-shadow hover:shadow-md">
            <CardContent className="pt-6">
              <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="size-4" />
                <time dateTime={pr.date}>
                  {new Date(pr.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="mb-2 text-lg font-semibold">{pr.title}</h3>
              <p className="text-sm text-muted-foreground">{pr.summary}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Media Contact */}
      <Card className="bg-[#00BCD4]/5">
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <Mail className="size-10 text-[#00BCD4]" />
          <h2 className="text-xl font-bold">Media Contact</h2>
          <p className="text-sm text-muted-foreground">
            For press inquiries, interviews, or brand assets, contact our
            communications team:
          </p>
          <a
            href={`mailto:${brand.email}`}
            className="text-lg font-medium text-[#00BCD4] hover:underline"
          >
            {brand.email}
          </a>
          <p className="text-xs text-muted-foreground">
            We typically respond to media requests within 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
