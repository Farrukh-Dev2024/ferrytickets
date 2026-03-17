import { Card, CardContent } from "@/components/ui/card";
import { brand } from "@/config/brand";
import { ShieldCheck } from "lucide-react";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, phone number, and payment details when you create an account or make a booking. We also collect information automatically, including your IP address, browser type, device information, and browsing behavior on our platform through cookies and similar technologies.",
  },
  {
    title: "2. How We Use Your Data",
    content:
      "We use your personal data to process bookings, send booking confirmations and travel updates, provide customer support, personalize your experience, send marketing communications (with your consent), improve our platform, and comply with legal obligations. We process your data based on contractual necessity, legitimate interest, consent, or legal obligation as appropriate.",
  },
  {
    title: "3. Data Sharing",
    content:
      "We share your personal data with ferry operators to fulfill your bookings, payment processors to handle transactions, and service providers who assist in operating our platform (such as hosting, analytics, and email delivery). We do not sell your personal data to third parties. Data may be shared with law enforcement when required by law.",
  },
  {
    title: "4. Cookies",
    content:
      "Our platform uses cookies and similar technologies to provide essential functionality, remember your preferences, analyze traffic, and deliver relevant advertisements. You can manage your cookie preferences through our cookie settings panel or your browser settings. For detailed information, please refer to our Cookie Policy.",
  },
  {
    title: "5. Your Rights",
    content:
      "Under the GDPR and applicable data protection laws, you have the right to access your personal data, request correction of inaccurate data, request deletion of your data, restrict or object to processing, data portability, and withdraw consent at any time. To exercise any of these rights, contact us at the address below. We will respond within 30 days.",
  },
  {
    title: "6. Data Security",
    content:
      "We implement industry-standard security measures to protect your personal data, including SSL/TLS encryption for data in transit, encrypted storage for sensitive information, regular security audits, and access controls. While we take all reasonable precautions, no method of electronic storage or transmission is 100% secure.",
  },
  {
    title: "7. Contact",
    content: `If you have questions about this Privacy Policy or wish to exercise your data protection rights, please contact our Data Protection Officer at ${brand.email} or write to us at our Athens office. You also have the right to lodge a complaint with the Hellenic Data Protection Authority (HDPA) or your local supervisory authority.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <ShieldCheck className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: January 15, 2026
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.title}>
            <CardContent className="pt-6">
              <h2 className="mb-3 text-lg font-semibold">{section.title}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {section.content}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
