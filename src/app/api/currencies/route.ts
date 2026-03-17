import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const FALLBACK_CURRENCIES = [
  { code: "EUR", symbol: "\u20ac", name: "Euro", decimalPlaces: 2, flag: "\ud83c\uddea\ud83c\uddfa" },
  { code: "USD", symbol: "$", name: "US Dollar", decimalPlaces: 2, flag: "\ud83c\uddfa\ud83c\uddf8" },
  { code: "GBP", symbol: "\u00a3", name: "British Pound", decimalPlaces: 2, flag: "\ud83c\uddec\ud83c\udde7" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc", decimalPlaces: 2, flag: "\ud83c\udde8\ud83c\udded" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona", decimalPlaces: 2, flag: "\ud83c\uddf8\ud83c\uddea" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone", decimalPlaces: 2, flag: "\ud83c\uddf3\ud83c\uddf4" },
  { code: "DKK", symbol: "kr", name: "Danish Krone", decimalPlaces: 2, flag: "\ud83c\udde9\ud83c\uddf0" },
  { code: "PLN", symbol: "z\u0142", name: "Polish Zloty", decimalPlaces: 2, flag: "\ud83c\uddf5\ud83c\uddf1" },
  { code: "CZK", symbol: "K\u010d", name: "Czech Koruna", decimalPlaces: 2, flag: "\ud83c\udde8\ud83c\uddff" },
  { code: "HUF", symbol: "Ft", name: "Hungarian Forint", decimalPlaces: 0, flag: "\ud83c\udded\ud83c\uddfa" },
  { code: "RON", symbol: "lei", name: "Romanian Leu", decimalPlaces: 2, flag: "\ud83c\uddf7\ud83c\uddf4" },
  { code: "BGN", symbol: "\u043b\u0432", name: "Bulgarian Lev", decimalPlaces: 2, flag: "\ud83c\udde7\ud83c\uddec" },
  { code: "HRK", symbol: "kn", name: "Croatian Kuna", decimalPlaces: 2, flag: "\ud83c\udded\ud83c\uddf7" },
  { code: "TRY", symbol: "\u20ba", name: "Turkish Lira", decimalPlaces: 2, flag: "\ud83c\uddf9\ud83c\uddf7" },
  { code: "AED", symbol: "\u062f.\u0625", name: "UAE Dirham", decimalPlaces: 2, flag: "\ud83c\udde6\ud83c\uddea" },
  { code: "SAR", symbol: "\u0631.\u0633", name: "Saudi Riyal", decimalPlaces: 2, flag: "\ud83c\uddf8\ud83c\udde6" },
  { code: "QAR", symbol: "\u0631.\u0642", name: "Qatari Riyal", decimalPlaces: 2, flag: "\ud83c\uddf6\ud83c\udde6" },
  { code: "EGP", symbol: "E\u00a3", name: "Egyptian Pound", decimalPlaces: 2, flag: "\ud83c\uddea\ud83c\uddec" },
  { code: "MAD", symbol: "MAD", name: "Moroccan Dirham", decimalPlaces: 2, flag: "\ud83c\uddf2\ud83c\udde6" },
  { code: "JPY", symbol: "\u00a5", name: "Japanese Yen", decimalPlaces: 0, flag: "\ud83c\uddef\ud83c\uddf5" },
  { code: "CNY", symbol: "\u00a5", name: "Chinese Yuan", decimalPlaces: 2, flag: "\ud83c\udde8\ud83c\uddf3" },
  { code: "INR", symbol: "\u20b9", name: "Indian Rupee", decimalPlaces: 2, flag: "\ud83c\uddee\ud83c\uddf3" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar", decimalPlaces: 2, flag: "\ud83c\udde6\ud83c\uddfa" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar", decimalPlaces: 2, flag: "\ud83c\udde8\ud83c\udde6" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real", decimalPlaces: 2, flag: "\ud83c\udde7\ud83c\uddf7" },
];

export async function GET(request: NextRequest) {
  try {
    const currencies = await prisma.currency.findMany({
      orderBy: { code: "asc" },
    });

    return NextResponse.json({ data: currencies });
  } catch {
    return NextResponse.json({ data: FALLBACK_CURRENCIES, _fallback: true });
  }
}
