"use client";

import { cn } from "@/lib/utils";
import { Ship } from "lucide-react";

const operators = [
  { name: "Blue Star Ferries", color: "bg-blue-600" },
  { name: "Hellenic Seaways", color: "bg-sky-500" },
  { name: "Anek Lines", color: "bg-indigo-600" },
  { name: "Minoan Lines", color: "bg-red-600" },
  { name: "SeaJets", color: "bg-yellow-500" },
  { name: "Golden Star Ferries", color: "bg-amber-500" },
  { name: "ANEK-Superfast", color: "bg-orange-600" },
  { name: "Corsica Ferries", color: "bg-yellow-400" },
  { name: "Grimaldi Lines", color: "bg-blue-800" },
  { name: "Balearia", color: "bg-teal-500" },
  { name: "Trasmediterranea", color: "bg-emerald-600" },
  { name: "GNV", color: "bg-violet-600" },
];

export default function FerryOperators() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900">Ferry Operators</h2>
          <a
            href="/operators"
            className="text-sm font-medium text-[#00BCD4] hover:underline"
          >
            View all companies
          </a>
        </div>

        {/* Grid */}
        <div
          className={cn(
            "mt-8",
            "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
            "max-sm:flex max-sm:gap-4 max-sm:overflow-x-auto max-sm:pb-4"
          )}
        >
          {operators.map((op) => (
            <a
              key={op.name}
              href={`/operators?highlight=${encodeURIComponent(op.name)}`}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg border border-gray-200 p-4",
                "transition-shadow hover:shadow-md",
                "max-sm:min-w-[220px]"
              )}
            >
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white",
                  op.color
                )}
              >
                <Ship className="h-5 w-5" />
              </div>
              <span className="font-medium text-gray-900">{op.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
