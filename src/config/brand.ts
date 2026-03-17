export const brand = {
  name: "Ferrytickets",
  logoText: "ferrytickets",
  tagline: "Book ferry tickets online",
  phone: {
    display: "+30 210 41 99 820",
    href: "tel:+302104199820",
    hours: "Mon-Sun 08:00 - 20:00",
  },
  email: "support@ferrytickets.com",
  social: {
    facebook: "https://facebook.com/ferrytickets",
    instagram: "https://instagram.com/ferrytickets",
    twitter: "https://twitter.com/ferrytickets",
  },
  defaultCurrency: "EUR",
  defaultLocale: "en",
  supportedLocales: ["en", "el", "fr", "it", "de", "es"] as const,
  appDownload: {
    ios: "#",
    android: "#",
  },
} as const;

export type SupportedLocale = (typeof brand.supportedLocales)[number];
