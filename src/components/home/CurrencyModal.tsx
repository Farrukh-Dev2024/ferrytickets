"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Currency {
  code: string;
  symbol: string;
  name: string;
}

const currencies: Currency[] = [
  { code: "EUR", symbol: "\u20AC", name: "Euro" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "GBP", symbol: "\u00A3", name: "British Pound" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "PLN", symbol: "z\u0142", name: "Polish Zloty" },
  { code: "CZK", symbol: "K\u010D", name: "Czech Koruna" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
  { code: "RON", symbol: "lei", name: "Romanian Leu" },
  { code: "BGN", symbol: "\u043B\u0432", name: "Bulgarian Lev" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna" },
  { code: "TRY", symbol: "\u20BA", name: "Turkish Lira" },
  { code: "AED", symbol: "\u062F.\u0625", name: "UAE Dirham" },
  { code: "SAR", symbol: "\uFDFC", name: "Saudi Riyal" },
  { code: "QAR", symbol: "\uFDFC", name: "Qatari Riyal" },
  { code: "EGP", symbol: "E\u00A3", name: "Egyptian Pound" },
  { code: "MAD", symbol: "MAD", name: "Moroccan Dirham" },
  { code: "JPY", symbol: "\u00A5", name: "Japanese Yen" },
  { code: "CNY", symbol: "\u00A5", name: "Chinese Yuan" },
  { code: "INR", symbol: "\u20B9", name: "Indian Rupee" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
];

interface CurrencyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selected?: string;
  onSelect?: (code: string) => void;
}

export function CurrencyModal({
  open,
  onOpenChange,
  selected: controlledSelected,
  onSelect,
}: CurrencyModalProps) {
  const [search, setSearch] = useState("");
  const [internalSelected, setInternalSelected] = useState("EUR");
  const selected = controlledSelected ?? internalSelected;

  const filtered = useMemo(() => {
    if (!search.trim()) return currencies;
    const q = search.toLowerCase();
    return currencies.filter(
      (c) =>
        c.code.toLowerCase().includes(q) ||
        c.name.toLowerCase().includes(q) ||
        c.symbol.toLowerCase().includes(q)
    );
  }, [search]);

  const handleSelect = (code: string) => {
    setInternalSelected(code);
    if (onSelect) {
      onSelect(code);
    } else {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton className="sm:max-w-[540px] p-0">
        <div className="p-4 pb-0 sm:p-6 sm:pb-0">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-lg font-semibold">
              Select currency
            </DialogTitle>
            <DialogDescription>
              Choose your preferred currency for prices.
            </DialogDescription>
          </DialogHeader>

          {/* Search input */}
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Currency grid */}
        <ScrollArea className="h-[400px] px-4 pb-4 sm:px-6 sm:pb-6">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {filtered.map((currency) => (
              <button
                key={currency.code}
                onClick={() => handleSelect(currency.code)}
                className={cn(
                  "flex flex-col items-start rounded-lg border p-3 text-left transition-colors hover:bg-muted/50",
                  selected === currency.code
                    ? "border-cyan-brand bg-cyan-brand/5 ring-1 ring-cyan-brand"
                    : "border-border"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-semibold">{currency.code}</span>
                  <span className="text-base text-muted-foreground">
                    {currency.symbol}
                  </span>
                </div>
                <span className="mt-0.5 text-xs text-muted-foreground">
                  {currency.name}
                </span>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-full py-8 text-center text-sm text-muted-foreground">
                No currencies found for &ldquo;{search}&rdquo;
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
