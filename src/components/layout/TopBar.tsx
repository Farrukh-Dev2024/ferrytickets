"use client";

import { useState } from "react";
import { Phone, Globe, Search, User } from "lucide-react";
import { brand, type SupportedLocale } from "@/config/brand";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LoginModal } from "@/components/auth/LoginModal";
import { CurrencyModal } from "@/components/home/CurrencyModal";

const localeLabels: Record<SupportedLocale, string> = {
  en: "English",
  el: "Greek",
  fr: "French",
  it: "Italian",
  de: "German",
  es: "Spanish",
};

export function TopBar() {
  const [locale, setLocale] = useState<SupportedLocale>(brand.defaultLocale);
  const [loginOpen, setLoginOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState<string>(brand.defaultCurrency);

  return (
    <>
      <div className="bg-cyan-brand text-white">
        <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 text-sm">
          {/* Left: Phone info */}
          <div className="flex items-center gap-4">
            <a
              href={brand.phone.href}
              className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
            >
              <Phone className="h-3.5 w-3.5" />
              <span className="font-medium">{brand.phone.display}</span>
            </a>
            <span className="hidden text-white/70 sm:inline">
              {brand.phone.hours}
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Language selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-white hover:bg-white/10">
                <Globe className="h-3.5 w-3.5" />
                <span className="hidden text-sm uppercase sm:inline">
                  {locale}
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {brand.supportedLocales.map((loc) => (
                  <DropdownMenuItem
                    key={loc}
                    onClick={() => setLocale(loc)}
                    className={cn(locale === loc && "font-semibold")}
                  >
                    <span className="mr-2 uppercase">{loc}</span>
                    {localeLabels[loc]}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency selector */}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-white hover:bg-white/10 hover:text-white"
              onClick={() => setCurrencyOpen(true)}
            >
              <span className="text-xs font-semibold">{currency}</span>
            </Button>

            {/* Search */}
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/10 hover:text-white"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="sr-only">Search</span>
            </Button>

            {/* Login / Manage booking */}
            <button
              onClick={() => setLoginOpen(true)}
              className="ml-1 flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-opacity hover:bg-white/10"
            >
              <User className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                Login / Manage booking
              </span>
            </button>
          </div>
        </div>
      </div>

      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
      <CurrencyModal
        open={currencyOpen}
        onOpenChange={setCurrencyOpen}
        selected={currency}
        onSelect={(code) => {
          setCurrency(code);
          setCurrencyOpen(false);
        }}
      />
    </>
  );
}
