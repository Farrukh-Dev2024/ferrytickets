import { Card, CardContent } from "@/components/ui/card";
import { Cookie, ShieldCheck, BarChart3, Megaphone, Settings } from "lucide-react";

const cookieTypes = [
  {
    icon: ShieldCheck,
    title: "Essential Cookies",
    required: true,
    description:
      "These cookies are strictly necessary for the platform to function. They enable core features such as secure login, session management, booking flow, and payment processing. Without these cookies, the website cannot operate properly. They do not store personally identifiable information for marketing purposes.",
  },
  {
    icon: BarChart3,
    title: "Analytics Cookies",
    required: false,
    description:
      "Analytics cookies help us understand how visitors interact with our platform by collecting information about pages visited, time spent on site, and navigation patterns. This data is aggregated and anonymized. We use tools like Google Analytics to improve our website performance and user experience.",
  },
  {
    icon: Megaphone,
    title: "Marketing Cookies",
    required: false,
    description:
      "Marketing cookies are used to track visitors across websites and display relevant advertisements. They help us measure the effectiveness of our advertising campaigns and limit the number of times you see an ad. These cookies may be set by our advertising partners such as Google Ads and Meta.",
  },
  {
    icon: Settings,
    title: "Preference Cookies",
    required: false,
    description:
      "Preference cookies remember your settings and choices, such as language, currency, recently searched routes, and display preferences. They enhance your experience by personalizing the platform to your needs so you do not have to reconfigure settings on each visit.",
  },
];

export default function CookiesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Cookie className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Cookie Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: January 15, 2026
        </p>
      </div>

      {/* Explanation */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <h2 className="mb-3 text-lg font-semibold">What Are Cookies?</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Cookies are small text files that are stored on your device when you
            visit a website. They are widely used to make websites work
            efficiently, provide a better browsing experience, and give site
            owners useful information. On Ferrytickets, we use cookies to keep
            you logged in, remember your preferences, process bookings securely,
            and understand how our platform is used so we can continuously
            improve it.
          </p>
        </CardContent>
      </Card>

      {/* Cookie Types */}
      <h2 className="mb-4 text-2xl font-bold">Types of Cookies We Use</h2>
      <div className="space-y-4">
        {cookieTypes.map((cookie) => {
          const Icon = cookie.icon;
          return (
            <Card key={cookie.title} className="transition-shadow hover:shadow-md">
              <CardContent className="pt-6">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#00BCD4]/10">
                      <Icon className="size-5 text-[#00BCD4]" />
                    </div>
                    <h3 className="text-lg font-semibold">{cookie.title}</h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      cookie.required
                        ? "bg-[#FFC107]/20 text-[#F59E0B]"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {cookie.required ? "Required" : "Optional"}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {cookie.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
