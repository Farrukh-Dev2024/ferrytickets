"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Destinations", href: "/destinations" },
  { label: "Operators", href: "/operators" },
  { label: "Routes", href: "/routes" },
  { label: "Reviews", href: "/reviews" },
  { label: "Useful info", href: "/useful-info" },
  { label: "Help center", href: "/help" },
] as const;

export function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5">
          <Ship className="h-7 w-7 text-cyan-brand" />
          <span className="text-xl font-bold tracking-tight text-gray-900">
            ferry
            <span className="text-cyan-brand">tickets</span>
          </span>
          <span className="ml-0.5 inline-block -translate-y-1 rotate-12 rounded bg-yellow-brand px-1 py-0.5 text-[10px] font-bold leading-none text-white">
            TICKET
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-gray-700",
                "transition-colors hover:bg-gray-100 hover:text-cyan-brand"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </SheetTrigger>

          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-1.5">
                <Ship className="h-5 w-5 text-cyan-brand" />
                <span className="font-bold">
                  ferry<span className="text-cyan-brand">tickets</span>
                </span>
              </SheetTitle>
            </SheetHeader>

            <nav className="mt-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-cyan-brand"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
