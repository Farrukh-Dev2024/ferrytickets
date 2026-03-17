"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Search,
  PhoneCall,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Ship,
  CreditCard,
  Luggage,
  Clock,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

const categories = [
  {
    icon: Ship,
    title: "Booking & Reservations",
    faqs: [
      {
        q: "How do I book a ferry ticket?",
        a: "Use the search form on our homepage to select your departure and arrival ports, travel dates, and number of passengers. Browse available ferries, select your preferred option, choose seats, enter passenger details, and complete payment.",
      },
      {
        q: "Can I book a return trip?",
        a: 'Yes! Select "Return" in the trip type toggle on the booking form. You\'ll be able to choose ferries for both your outbound and return journeys.',
      },
      {
        q: "What is island hopping?",
        a: "Island hopping allows you to book multi-stop ferry trips across several islands in a single booking. Select \"Island hopping\" in the trip type toggle to add multiple destinations.",
      },
      {
        q: "How far in advance should I book?",
        a: "We recommend booking at least 2-4 weeks in advance during peak season (June-September). Off-peak bookings can usually be made closer to the travel date.",
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Payment & Pricing",
    faqs: [
      {
        q: "What payment methods do you accept?",
        a: "We accept Visa, Mastercard, PayPal, and bank transfers. All payments are processed securely with SSL encryption.",
      },
      {
        q: "Are there any hidden fees?",
        a: "No. The price shown at checkout is the final price. Port taxes and fuel surcharges are included in the displayed fare.",
      },
      {
        q: "Can I pay in my local currency?",
        a: "Yes! We support 25+ currencies. Use the currency selector in the top bar to switch to your preferred currency.",
      },
    ],
  },
  {
    icon: Clock,
    title: "Changes & Cancellations",
    faqs: [
      {
        q: "Can I cancel my booking?",
        a: "Cancellation policies vary by operator and ticket type. Most tickets allow free cancellation up to 24-48 hours before departure. Check the specific policies on your booking confirmation.",
      },
      {
        q: "How do I change my travel dates?",
        a: 'Log in to your account, go to "My Trips", select the booking you want to modify, and click "Edit booking". Date changes are subject to availability and may incur a fare difference.',
      },
      {
        q: "What happens if the ferry is cancelled?",
        a: "If the operator cancels the sailing, you will receive a full refund or be rebooked on the next available departure at no extra cost.",
      },
    ],
  },
  {
    icon: Luggage,
    title: "Travel Information",
    faqs: [
      {
        q: "What should I bring on board?",
        a: "Bring your booking confirmation (printed or on your phone), a valid photo ID or passport, and any vehicle documents if you're bringing a car or motorcycle.",
      },
      {
        q: "Can I bring my pet?",
        a: "Many ferries allow pets on board. Add pets to your booking in the passengers/vehicles section. Some operators require pets to stay in designated areas or pet-friendly cabins.",
      },
      {
        q: "How early should I arrive at the port?",
        a: "For foot passengers, arrive at least 60 minutes before departure. If you're traveling with a vehicle, arrive at least 90-120 minutes early.",
      },
      {
        q: "Is there Wi-Fi on board?",
        a: "Most modern ferries offer Wi-Fi, though availability and speed vary by vessel. Check the amenity icons on the ferry details when booking.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Account & Security",
    faqs: [
      {
        q: "How do I create an account?",
        a: 'Click "Login" in the top bar and choose to sign up with your email, or use Google, Facebook, or Apple sign-in for quick registration.',
      },
      {
        q: "I forgot my password. What do I do?",
        a: 'Click "Forgot password" on the login form. Enter your email address and we\'ll send you a link to reset your password.',
      },
      {
        q: "Is my personal data secure?",
        a: "Yes. We use industry-standard encryption and comply with GDPR regulations. Your payment information is never stored on our servers.",
      },
    ],
  },
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = searchQuery.trim()
    ? categories
        .map((cat) => ({
          ...cat,
          faqs: cat.faqs.filter(
            (faq) =>
              faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.a.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter((cat) => cat.faqs.length > 0)
    : categories;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <HelpCircle className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-2 text-3xl font-bold">Help Center</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>

      {/* Search */}
      <div className="relative mx-auto mb-10 max-w-xl">
        <Search className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          className="h-12 pl-10 text-base"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Contact cards */}
      <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card className="text-center transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-2 pt-6">
            <PhoneCall className="size-8 text-[#00BCD4]" />
            <h3 className="font-semibold">Call us</h3>
            <a href={brand.phone.href} className="text-sm text-[#00BCD4] hover:underline">
              {brand.phone.display}
            </a>
            <p className="text-xs text-muted-foreground">{brand.phone.hours}</p>
          </CardContent>
        </Card>
        <Card className="text-center transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-2 pt-6">
            <Mail className="size-8 text-[#00BCD4]" />
            <h3 className="font-semibold">Email us</h3>
            <a href={`mailto:${brand.email}`} className="text-sm text-[#00BCD4] hover:underline">
              {brand.email}
            </a>
            <p className="text-xs text-muted-foreground">We reply within 24 hours</p>
          </CardContent>
        </Card>
        <Card className="text-center transition-shadow hover:shadow-md">
          <CardContent className="flex flex-col items-center gap-2 pt-6">
            <MessageCircle className="size-8 text-[#00BCD4]" />
            <h3 className="font-semibold">Live chat</h3>
            <p className="text-sm text-muted-foreground">Chat with our team</p>
            <Button size="sm" className="mt-1 bg-[#00BCD4] text-white hover:bg-[#00ACC1]">
              Start chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ sections */}
      {filteredCategories.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg font-medium">No results found</p>
          <p className="text-sm text-muted-foreground">
            Try a different search term or contact our support team.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title}>
                <div className="mb-4 flex items-center gap-2">
                  <Icon className="size-5 text-[#00BCD4]" />
                  <h2 className="text-xl font-bold">{cat.title}</h2>
                </div>
                <div className="space-y-2">
                  {cat.faqs.map((faq, i) => {
                    const key = `${cat.title}-${i}`;
                    const isOpen = openItems[key] ?? false;
                    return (
                      <Card key={key}>
                        <button
                          onClick={() => toggleItem(key)}
                          className="flex w-full items-center justify-between p-4 text-left"
                        >
                          <span className="pr-4 font-medium">{faq.q}</span>
                          {isOpen ? (
                            <ChevronUp className="size-5 shrink-0 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="size-5 shrink-0 text-muted-foreground" />
                          )}
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isOpen ? "max-h-96 pb-4" : "max-h-0"
                          )}
                        >
                          <p className="px-4 text-sm leading-relaxed text-muted-foreground">
                            {faq.a}
                          </p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
