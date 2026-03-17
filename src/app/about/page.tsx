import { brand } from "@/config/brand";
import { Card, CardContent } from "@/components/ui/card";
import {
  Anchor,
  Ship,
  Globe,
  Users,
  MapPin,
  Target,
  Heart,
} from "lucide-react";

const stats = [
  { icon: Ship, value: "500+", label: "Ferry Routes" },
  { icon: Anchor, value: "50+", label: "Ferry Operators" },
  { icon: Users, value: "1M+", label: "Happy Travelers" },
  { icon: Globe, value: "20+", label: "Countries" },
];

const team = [
  { name: "Alex Papadopoulos", role: "CEO & Co-Founder" },
  { name: "Maria Konstantinou", role: "CTO & Co-Founder" },
  { name: "Nikos Andreou", role: "Head of Operations" },
  { name: "Elena Dimitriou", role: "Head of Customer Experience" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Anchor className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">About {brand.name}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          {brand.name} is a leading ferry booking platform connecting travelers
          with the best sea routes across Europe and beyond. We make it easy to
          search, compare, and book ferry tickets in just a few clicks.
        </p>
      </div>

      {/* Mission */}
      <Card className="mb-10">
        <CardContent className="flex flex-col items-center gap-4 py-8 text-center">
          <Target className="size-10 text-[#FFC107]" />
          <h2 className="text-2xl font-bold">Our Mission</h2>
          <p className="max-w-2xl text-muted-foreground">
            We believe that sea travel should be accessible, affordable, and
            enjoyable for everyone. Our mission is to simplify ferry bookings
            worldwide by providing a transparent, user-friendly platform that
            empowers travelers to explore coastlines, islands, and new
            destinations with confidence.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="text-center transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-2 pt-6">
                <Icon className="size-8 text-[#00BCD4]" />
                <span className="text-2xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Values */}
      <div className="mb-10">
        <h2 className="mb-4 text-center text-2xl font-bold">What We Stand For</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <Heart className="size-8 text-[#FFC107]" />
              <h3 className="font-semibold">Customer First</h3>
              <p className="text-sm text-muted-foreground">
                Every decision we make starts with our travelers in mind.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <Globe className="size-8 text-[#FFC107]" />
              <h3 className="font-semibold">Global Reach</h3>
              <p className="text-sm text-muted-foreground">
                Connecting ports and people across continents and cultures.
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <MapPin className="size-8 text-[#FFC107]" />
              <h3 className="font-semibold">Local Expertise</h3>
              <p className="text-sm text-muted-foreground">
                Deep knowledge of every route, port, and destination we serve.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="mb-4 text-center text-2xl font-bold">Our Team</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {team.map((member) => (
            <Card key={member.name} className="text-center transition-shadow hover:shadow-md">
              <CardContent className="flex flex-col items-center gap-2 pt-6">
                <div className="flex size-16 items-center justify-center rounded-full bg-[#00BCD4]/10 text-2xl font-bold text-[#00BCD4]">
                  {member.name.charAt(0)}
                </div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
