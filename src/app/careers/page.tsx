import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock, Code, Headphones, Megaphone, Server } from "lucide-react";

const jobs = [
  {
    icon: Code,
    title: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    description:
      "Build beautiful, performant user interfaces for our ferry booking platform using React, Next.js, and TypeScript. You will work closely with designers and backend engineers to deliver seamless booking experiences.",
  },
  {
    icon: Headphones,
    title: "Customer Support Agent",
    location: "Athens, Greece",
    type: "Full-time",
    description:
      "Be the voice of Ferrytickets. Help travelers with booking inquiries, schedule changes, and travel advice. Fluency in English and at least one additional European language is required.",
  },
  {
    icon: Megaphone,
    title: "Marketing Manager",
    location: "Athens, Greece",
    type: "Full-time",
    description:
      "Drive growth through digital marketing campaigns, SEO, partnerships, and brand strategy. You will own the marketing funnel from awareness to conversion across multiple European markets.",
  },
  {
    icon: Server,
    title: "DevOps Engineer",
    location: "Remote",
    type: "Full-time",
    description:
      "Manage and scale our cloud infrastructure on AWS. Implement CI/CD pipelines, monitoring, and security best practices to keep our platform fast and reliable for millions of users.",
  },
];

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Briefcase className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Join Our Team</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          At Ferrytickets, we are building the future of sea travel. We are a
          passionate, diverse team united by a love of travel and technology. We
          value creativity, ownership, and a healthy work-life balance. If you
          want to make an impact while working with great people, we would love
          to hear from you.
        </p>
      </div>

      {/* Culture highlights */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          "Remote Friendly",
          "25 Days PTO",
          "Learning Budget",
          "Travel Perks",
        ].map((perk) => (
          <div
            key={perk}
            className="rounded-lg bg-[#00BCD4]/10 py-3 text-center text-sm font-medium text-[#00BCD4]"
          >
            {perk}
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <h2 className="mb-4 text-2xl font-bold">Open Positions</h2>
      <div className="space-y-4">
        {jobs.map((job) => {
          const Icon = job.icon;
          return (
            <Card key={job.title} className="transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#00BCD4]/10">
                    <Icon className="size-6 text-[#00BCD4]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="size-3.5" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {job.type}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {job.description}
                    </p>
                  </div>
                </div>
                <Button className="shrink-0 bg-[#00BCD4] text-white hover:bg-[#00ACC1]">
                  Apply
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
