"use client";

import { useState } from "react";
import Link from "next/link";
import { Facebook, Instagram, Twitter, Ship } from "lucide-react";
import { brand } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const footerLinks = {
  company: {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { label: "Terms", href: "/terms" },
      { label: "Privacy", href: "/privacy" },
      { label: "Cookies", href: "/cookies" },
    ],
  },
} as const;

const socialLinks = [
  { icon: Facebook, href: brand.social.facebook, label: "Facebook" },
  { icon: Instagram, href: brand.social.instagram, label: "Instagram" },
  { icon: Twitter, href: brand.social.twitter, label: "Twitter" },
] as const;

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Top section: Logo + description + newsletter */}
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-16">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="max-w-md">
            <Link href="/" className="mb-4 flex items-center gap-1.5">
              <Ship className="h-7 w-7 text-cyan-brand" />
              <span className="text-xl font-bold tracking-tight">
                ferry<span className="text-cyan-brand">tickets</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">
              {brand.tagline}. Compare prices, check schedules and book your
              ferry tickets for Greek islands and destinations across the
              Mediterranean. Fast, secure and easy booking experience.
            </p>
          </div>

          <div className="flex flex-col justify-center lg:items-end">
            <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-300">
              Subscribe to our newsletter
            </h3>
            <p className="mb-4 text-sm text-gray-400">
              Get the latest deals and travel tips straight to your inbox.
            </p>
            <form
              className="flex w-full max-w-sm gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
            >
              <Input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-700 bg-gray-800 text-white placeholder:text-gray-500 focus-visible:ring-cyan-brand"
                required
              />
              <Button
                type="submit"
                className="shrink-0 bg-cyan-brand text-white hover:bg-cyan-brand/90"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800" />

        {/* Middle section: Link columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-300">
                {section.title}
              </h4>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800" />

        {/* Bottom section: Copyright + social icons */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {brand.name}. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-800 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
