"use client";

import { cn } from "@/lib/utils";
import { PhoneCall, Mail, HelpCircle } from "lucide-react";
import { brand } from "@/config/brand";

const actions = [
  {
    icon: PhoneCall,
    label: "Call us",
    detail: brand.phone.display,
    href: brand.phone.href,
  },
  {
    icon: Mail,
    label: "Contact us",
    detail: "Send us a message",
    href: `mailto:${brand.email}`,
  },
  {
    icon: HelpCircle,
    label: "Help Center",
    detail: "Browse our FAQ",
    href: "/help",
  },
];

export default function CustomerSupport() {
  return (
    <section className="border-t border-gray-200 bg-white py-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900">Need help?</h2>
        <p className="mt-3 text-gray-600">
          Our support team is here to help you with your booking
        </p>

        {/* Action cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {actions.map((action) => (
            <a
              key={action.label}
              href={action.href}
              className={cn(
                "flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-6",
                "transition-shadow hover:shadow-lg"
              )}
            >
              <action.icon className="h-8 w-8 text-[#00BCD4]" />
              <h3 className="text-lg font-semibold text-gray-900">
                {action.label}
              </h3>
              <p className="text-sm text-gray-500">{action.detail}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
