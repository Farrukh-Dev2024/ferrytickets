import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

const sections = [
  {
    title: "1. General Terms",
    content:
      "By accessing and using the Ferrytickets platform, you agree to be bound by these Terms and Conditions. Our platform provides an online ferry ticket booking service that connects travelers with ferry operators. Ferrytickets acts as an intermediary between you and the ferry operators and is not itself a carrier. These terms apply to all users of the website and mobile applications.",
  },
  {
    title: "2. Booking Policy",
    content:
      "When you make a booking through Ferrytickets, you enter into a contract with the relevant ferry operator. All bookings are subject to availability and confirmation. You are responsible for providing accurate passenger information, including names, identification details, and contact information. Incorrect information may result in denied boarding without refund. Booking confirmations are sent via email and are also available in your account dashboard.",
  },
  {
    title: "3. Payment Terms",
    content:
      "All prices displayed on Ferrytickets are in the selected currency and include applicable taxes, port fees, and fuel surcharges unless otherwise stated. Payment is required at the time of booking. We accept major credit and debit cards, PayPal, and selected local payment methods. All transactions are processed securely using industry-standard SSL encryption. Ferrytickets reserves the right to adjust prices at any time prior to booking confirmation.",
  },
  {
    title: "4. Cancellation & Refund Policy",
    content:
      "Cancellation policies vary by ferry operator and ticket type. Flexible tickets generally allow free cancellation up to 24-48 hours before departure. Non-refundable tickets cannot be cancelled for a refund. To request a cancellation, log in to your account and navigate to your booking, or contact our customer support team. Approved refunds are processed within 5-10 business days to the original payment method. Service fees may be non-refundable.",
  },
  {
    title: "5. Liability",
    content:
      "Ferrytickets acts solely as a booking intermediary. The ferry operator is responsible for the transportation service, including safety, schedules, and on-board conditions. Ferrytickets shall not be held liable for delays, cancellations, schedule changes, or any loss or damage arising from the ferry service itself. Our liability is limited to the booking service we provide. We recommend travelers obtain appropriate travel insurance.",
  },
  {
    title: "6. Privacy",
    content:
      "Your use of Ferrytickets is also governed by our Privacy Policy, which describes how we collect, use, and protect your personal data. By using our service, you consent to the data practices described in the Privacy Policy. We are committed to complying with the General Data Protection Regulation (GDPR) and other applicable data protection laws.",
  },
  {
    title: "7. Governing Law",
    content:
      "These Terms and Conditions are governed by and construed in accordance with the laws of the Hellenic Republic (Greece). Any disputes arising from or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of Athens, Greece. If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <FileText className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Terms & Conditions</h1>
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
