import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pre-computed bcrypt hash for "password123"
const HASHED_PASSWORD =
  "$2a$10$K7L1OJ45/4Y2nIvhRVpCe.FSmhDdWoXehVzJptJ/op0lSsvqNu/1u";

async function main() {
  console.log("Seeding database...");

  // ─── Currencies ──────────────────────────────────────────────────────
  console.log("Seeding currencies...");
  await prisma.currency.createMany({
    data: [
      { code: "EUR", symbol: "\u20ac", name: "Euro" },
      { code: "USD", symbol: "$", name: "United States Dollar" },
      { code: "GBP", symbol: "\u00a3", name: "British Pound Sterling" },
      { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
      { code: "SEK", symbol: "kr", name: "Swedish Krona" },
      { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
      { code: "DKK", symbol: "kr", name: "Danish Krone" },
      { code: "PLN", symbol: "z\u0142", name: "Polish Zloty" },
      { code: "CZK", symbol: "K\u010d", name: "Czech Koruna" },
      { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
      { code: "RON", symbol: "lei", name: "Romanian Leu" },
      { code: "BGN", symbol: "\u043b\u0432", name: "Bulgarian Lev" },
      { code: "HRK", symbol: "kn", name: "Croatian Kuna" },
      { code: "TRY", symbol: "\u20ba", name: "Turkish Lira" },
      { code: "AED", symbol: "\u062f.\u0625", name: "United Arab Emirates Dirham" },
      { code: "SAR", symbol: "\ufdfc", name: "Saudi Riyal" },
      { code: "QAR", symbol: "\ufdfc", name: "Qatari Riyal" },
      { code: "EGP", symbol: "E\u00a3", name: "Egyptian Pound" },
      { code: "MAD", symbol: "MAD", name: "Moroccan Dirham" },
      { code: "JPY", symbol: "\u00a5", name: "Japanese Yen" },
      { code: "CNY", symbol: "\u00a5", name: "Chinese Yuan" },
      { code: "INR", symbol: "\u20b9", name: "Indian Rupee" },
      { code: "AUD", symbol: "A$", name: "Australian Dollar" },
      { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
      { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    ],
    skipDuplicates: true,
  });

  // ─── Countries ───────────────────────────────────────────────────────
  console.log("Seeding countries...");
  const greece = await prisma.country.create({
    data: { name: "Greece", code: "GR", flag: "🇬🇷" },
  });
  const france = await prisma.country.create({
    data: { name: "France", code: "FR", flag: "🇫🇷" },
  });
  const italy = await prisma.country.create({
    data: { name: "Italy", code: "IT", flag: "🇮🇹" },
  });
  const morocco = await prisma.country.create({
    data: { name: "Morocco", code: "MA", flag: "🇲🇦" },
  });
  const england = await prisma.country.create({
    data: { name: "England", code: "GB", flag: "🇬🇧" },
  });

  // ─── Regions ─────────────────────────────────────────────────────────
  console.log("Seeding regions...");

  // Greece regions
  const cyclades = await prisma.region.create({
    data: { name: "Cyclades", countryId: greece.id },
  });
  const crete = await prisma.region.create({
    data: { name: "Crete", countryId: greece.id },
  });
  const dodecanese = await prisma.region.create({
    data: { name: "Dodecanese", countryId: greece.id },
  });
  const saronicGulf = await prisma.region.create({
    data: { name: "Saronic Gulf", countryId: greece.id },
  });

  // France regions
  const paca = await prisma.region.create({
    data: { name: "PACA", countryId: france.id },
  });
  const corsica = await prisma.region.create({
    data: { name: "Corsica", countryId: france.id },
  });

  // Italy regions
  const campania = await prisma.region.create({
    data: { name: "Campania", countryId: italy.id },
  });
  const sicily = await prisma.region.create({
    data: { name: "Sicily", countryId: italy.id },
  });
  const sardinia = await prisma.region.create({
    data: { name: "Sardinia", countryId: italy.id },
  });

  // Morocco regions
  const tangierTetouan = await prisma.region.create({
    data: { name: "Tangier-Tetouan", countryId: morocco.id },
  });
  const oriental = await prisma.region.create({
    data: { name: "Oriental", countryId: morocco.id },
  });

  // England regions
  const southEast = await prisma.region.create({
    data: { name: "South East", countryId: england.id },
  });
  const southWest = await prisma.region.create({
    data: { name: "South West", countryId: england.id },
  });

  // ─── Ports ───────────────────────────────────────────────────────────
  console.log("Seeding ports...");

  // Greece - Saronic / Attica
  const piraeus = await prisma.port.create({
    data: {
      name: "Piraeus",
      code: "PIR",
      regionId: saronicGulf.id,
      countryId: greece.id,
      lat: 37.9475,
      lng: 23.6387,
    },
  });
  const rafina = await prisma.port.create({
    data: {
      name: "Rafina",
      code: "RAF",
      regionId: saronicGulf.id,
      countryId: greece.id,
      lat: 38.0228,
      lng: 24.0097,
    },
  });
  const aegina = await prisma.port.create({
    data: {
      name: "Aegina",
      code: "AEG",
      regionId: saronicGulf.id,
      countryId: greece.id,
      lat: 37.7467,
      lng: 23.4289,
    },
  });
  const hydra = await prisma.port.create({
    data: {
      name: "Hydra",
      code: "HYD",
      regionId: saronicGulf.id,
      countryId: greece.id,
      lat: 37.3484,
      lng: 23.4639,
    },
  });

  // Greece - Cyclades
  const mykonos = await prisma.port.create({
    data: {
      name: "Mykonos",
      code: "MYK",
      regionId: cyclades.id,
      countryId: greece.id,
      lat: 37.4467,
      lng: 25.3289,
    },
  });
  const santorini = await prisma.port.create({
    data: {
      name: "Santorini (Thira)",
      code: "JTR",
      regionId: cyclades.id,
      countryId: greece.id,
      lat: 36.3932,
      lng: 25.4615,
    },
  });
  const naxos = await prisma.port.create({
    data: {
      name: "Naxos",
      code: "NXS",
      regionId: cyclades.id,
      countryId: greece.id,
      lat: 37.1036,
      lng: 25.3756,
    },
  });
  const paros = await prisma.port.create({
    data: {
      name: "Paros",
      code: "PRS",
      regionId: cyclades.id,
      countryId: greece.id,
      lat: 37.0853,
      lng: 25.1524,
    },
  });
  const ios = await prisma.port.create({
    data: {
      name: "Ios",
      code: "IOS",
      regionId: cyclades.id,
      countryId: greece.id,
      lat: 36.7231,
      lng: 25.2819,
    },
  });

  // Greece - Crete
  const heraklion = await prisma.port.create({
    data: {
      name: "Heraklion",
      code: "HER",
      regionId: crete.id,
      countryId: greece.id,
      lat: 35.3387,
      lng: 25.1442,
    },
  });
  const chania = await prisma.port.create({
    data: {
      name: "Chania",
      code: "CHQ",
      regionId: crete.id,
      countryId: greece.id,
      lat: 35.5175,
      lng: 24.0177,
    },
  });

  // Greece - Dodecanese
  const rhodes = await prisma.port.create({
    data: {
      name: "Rhodes",
      code: "RHO",
      regionId: dodecanese.id,
      countryId: greece.id,
      lat: 36.4507,
      lng: 28.2279,
    },
  });
  const kos = await prisma.port.create({
    data: {
      name: "Kos",
      code: "KGS",
      regionId: dodecanese.id,
      countryId: greece.id,
      lat: 36.8951,
      lng: 26.9428,
    },
  });

  // France
  const marseille = await prisma.port.create({
    data: {
      name: "Marseille",
      code: "MRS",
      regionId: paca.id,
      countryId: france.id,
      lat: 43.2965,
      lng: 5.3698,
    },
  });
  const nice = await prisma.port.create({
    data: {
      name: "Nice",
      code: "NCE",
      regionId: paca.id,
      countryId: france.id,
      lat: 43.6961,
      lng: 7.2719,
    },
  });
  const toulon = await prisma.port.create({
    data: {
      name: "Toulon",
      code: "TLN",
      regionId: paca.id,
      countryId: france.id,
      lat: 43.1174,
      lng: 5.9281,
    },
  });
  const bastia = await prisma.port.create({
    data: {
      name: "Bastia",
      code: "BIA",
      regionId: corsica.id,
      countryId: france.id,
      lat: 42.6977,
      lng: 9.4509,
    },
  });
  const ajaccio = await prisma.port.create({
    data: {
      name: "Ajaccio",
      code: "AJA",
      regionId: corsica.id,
      countryId: france.id,
      lat: 41.9191,
      lng: 8.7387,
    },
  });

  // Italy
  const naples = await prisma.port.create({
    data: {
      name: "Naples",
      code: "NAP",
      regionId: campania.id,
      countryId: italy.id,
      lat: 40.8358,
      lng: 14.2488,
    },
  });
  const civitavecchia = await prisma.port.create({
    data: {
      name: "Civitavecchia",
      code: "CVV",
      regionId: campania.id,
      countryId: italy.id,
      lat: 42.0935,
      lng: 11.7897,
    },
  });
  const bari = await prisma.port.create({
    data: {
      name: "Bari",
      code: "BRI",
      regionId: campania.id,
      countryId: italy.id,
      lat: 41.1171,
      lng: 16.8719,
    },
  });
  const palermo = await prisma.port.create({
    data: {
      name: "Palermo",
      code: "PMO",
      regionId: sicily.id,
      countryId: italy.id,
      lat: 38.1157,
      lng: 13.3615,
    },
  });
  const olbia = await prisma.port.create({
    data: {
      name: "Olbia",
      code: "OLB",
      regionId: sardinia.id,
      countryId: italy.id,
      lat: 40.9245,
      lng: 9.5159,
    },
  });

  // Morocco
  const tangierMed = await prisma.port.create({
    data: {
      name: "Tangier Med",
      code: "TNG",
      regionId: tangierTetouan.id,
      countryId: morocco.id,
      lat: 35.8711,
      lng: -5.5147,
    },
  });
  const nador = await prisma.port.create({
    data: {
      name: "Nador",
      code: "NDR",
      regionId: oriental.id,
      countryId: morocco.id,
      lat: 35.1684,
      lng: -2.9334,
    },
  });

  // England
  const portsmouth = await prisma.port.create({
    data: {
      name: "Portsmouth",
      code: "PME",
      regionId: southEast.id,
      countryId: england.id,
      lat: 50.7989,
      lng: -1.0872,
    },
  });
  const dover = await prisma.port.create({
    data: {
      name: "Dover",
      code: "DVR",
      regionId: southEast.id,
      countryId: england.id,
      lat: 51.1279,
      lng: 1.3134,
    },
  });
  const plymouth = await prisma.port.create({
    data: {
      name: "Plymouth",
      code: "PLH",
      regionId: southWest.id,
      countryId: england.id,
      lat: 50.3755,
      lng: -4.1427,
    },
  });

  // ─── Ferry Operators ─────────────────────────────────────────────────
  console.log("Seeding ferry operators...");

  const blueStarFerries = await prisma.ferryOperator.create({
    data: { name: "Blue Star Ferries", code: "BSF", logo: "/logos/bsf.png" },
  });
  const hellenicSeaways = await prisma.ferryOperator.create({
    data: { name: "Hellenic Seaways", code: "HSW", logo: "/logos/hsw.png" },
  });
  const seajets = await prisma.ferryOperator.create({
    data: { name: "SeaJets", code: "SJT", logo: "/logos/sjt.png" },
  });
  const minoanLines = await prisma.ferryOperator.create({
    data: { name: "Minoan Lines", code: "MNL", logo: "/logos/mnl.png" },
  });
  const anekLines = await prisma.ferryOperator.create({
    data: { name: "Anek Lines", code: "ANK", logo: "/logos/ank.png" },
  });
  const goldenStarFerries = await prisma.ferryOperator.create({
    data: { name: "Golden Star Ferries", code: "GSF", logo: "/logos/gsf.png" },
  });

  // ─── Vessels ─────────────────────────────────────────────────────────
  console.log("Seeding vessels...");

  const blueStarPatmos = await prisma.vessel.create({
    data: {
      name: "Blue Star Patmos",
      operatorId: blueStarFerries.id,
      capacity: 2000,
      amenities: ["restaurant", "bar", "wifi", "cabins", "pet-friendly"],
    },
  });
  const blueStarNaxos = await prisma.vessel.create({
    data: {
      name: "Blue Star Naxos",
      operatorId: blueStarFerries.id,
      capacity: 1800,
      amenities: ["restaurant", "bar", "wifi", "cabins"],
    },
  });
  const highspeed7 = await prisma.vessel.create({
    data: {
      name: "Highspeed 7",
      operatorId: hellenicSeaways.id,
      capacity: 1200,
      amenities: ["bar", "wifi", "airline-seats"],
    },
  });
  const championJet1 = await prisma.vessel.create({
    data: {
      name: "Champion Jet 1",
      operatorId: seajets.id,
      capacity: 800,
      amenities: ["bar", "wifi", "vip-lounge"],
    },
  });
  const megajet = await prisma.vessel.create({
    data: {
      name: "Megajet",
      operatorId: seajets.id,
      capacity: 1000,
      amenities: ["bar", "wifi"],
    },
  });
  const knossosPalace = await prisma.vessel.create({
    data: {
      name: "Knossos Palace",
      operatorId: minoanLines.id,
      capacity: 2500,
      amenities: ["restaurant", "pool", "cabins", "shops", "cinema"],
    },
  });
  const olympus = await prisma.vessel.create({
    data: {
      name: "Olympus",
      operatorId: minoanLines.id,
      capacity: 2200,
      amenities: ["restaurant", "cabins", "bar"],
    },
  });
  const elVenizelos = await prisma.vessel.create({
    data: {
      name: "El Venizelos",
      operatorId: anekLines.id,
      capacity: 2000,
      amenities: ["restaurant", "bar", "cabins", "wifi"],
    },
  });
  const superstar = await prisma.vessel.create({
    data: {
      name: "Superstar",
      operatorId: goldenStarFerries.id,
      capacity: 600,
      amenities: ["bar", "wifi"],
    },
  });
  const superferryII = await prisma.vessel.create({
    data: {
      name: "Superferry II",
      operatorId: goldenStarFerries.id,
      capacity: 900,
      amenities: ["bar", "wifi", "restaurant"],
    },
  });

  // ─── Routes ──────────────────────────────────────────────────────────
  console.log("Seeding routes...");

  const routePiraeusMykonos = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: mykonos.id,
      operatorId: blueStarFerries.id,
      vesselId: blueStarPatmos.id,
    },
  });
  const routePiraeusSantorini = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: santorini.id,
      operatorId: blueStarFerries.id,
      vesselId: blueStarNaxos.id,
    },
  });
  const routePiraeusNaxos = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: naxos.id,
      operatorId: blueStarFerries.id,
      vesselId: blueStarPatmos.id,
    },
  });
  const routePiraeusParos = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: paros.id,
      operatorId: blueStarFerries.id,
      vesselId: blueStarNaxos.id,
    },
  });
  const routePiraeusHeraklion = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: heraklion.id,
      operatorId: minoanLines.id,
      vesselId: knossosPalace.id,
    },
  });
  const routePiraeusChania = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: chania.id,
      operatorId: anekLines.id,
      vesselId: elVenizelos.id,
    },
  });
  const routePiraeusRhodes = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: rhodes.id,
      operatorId: blueStarFerries.id,
      vesselId: blueStarPatmos.id,
    },
  });
  const routeRafinaMykonos = await prisma.route.create({
    data: {
      fromPortId: rafina.id,
      toPortId: mykonos.id,
      operatorId: goldenStarFerries.id,
      vesselId: superferryII.id,
    },
  });
  const routeRafinaNaxos = await prisma.route.create({
    data: {
      fromPortId: rafina.id,
      toPortId: naxos.id,
      operatorId: goldenStarFerries.id,
      vesselId: superstar.id,
    },
  });
  const routeMykonosSantorini = await prisma.route.create({
    data: {
      fromPortId: mykonos.id,
      toPortId: santorini.id,
      operatorId: seajets.id,
      vesselId: championJet1.id,
    },
  });
  const routePiraeusAegina = await prisma.route.create({
    data: {
      fromPortId: piraeus.id,
      toPortId: aegina.id,
      operatorId: hellenicSeaways.id,
      vesselId: highspeed7.id,
    },
  });
  const routeNaplesPalermo = await prisma.route.create({
    data: {
      fromPortId: naples.id,
      toPortId: palermo.id,
      operatorId: minoanLines.id,
      vesselId: olympus.id,
    },
  });
  const routeMarseilleBastia = await prisma.route.create({
    data: {
      fromPortId: marseille.id,
      toPortId: bastia.id,
      operatorId: minoanLines.id,
      vesselId: olympus.id,
    },
  });
  const routeTangierDover = await prisma.route.create({
    data: {
      fromPortId: tangierMed.id,
      toPortId: dover.id,
      operatorId: anekLines.id,
      vesselId: elVenizelos.id,
    },
  });

  // ─── Schedules ───────────────────────────────────────────────────────
  console.log("Seeding schedules...");

  // Piraeus → Mykonos (3 schedules)
  const sch1 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusMykonos.id,
      departureTime: "07:30",
      arrivalTime: "12:45",
      duration: 315,
      date: new Date("2026-04-15"),
    },
  });
  const sch2 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusMykonos.id,
      departureTime: "15:00",
      arrivalTime: "20:15",
      duration: 315,
      date: new Date("2026-05-01"),
    },
  });
  const sch3 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusMykonos.id,
      departureTime: "07:30",
      arrivalTime: "12:45",
      duration: 315,
      date: new Date("2026-06-10"),
    },
  });

  // Piraeus → Santorini (2 schedules)
  const sch4 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusSantorini.id,
      departureTime: "07:00",
      arrivalTime: "15:00",
      duration: 480,
      date: new Date("2026-04-20"),
    },
  });
  const sch5 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusSantorini.id,
      departureTime: "16:30",
      arrivalTime: "00:30",
      duration: 480,
      date: new Date("2026-05-15"),
    },
  });

  // Piraeus → Naxos (2 schedules)
  const sch6 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusNaxos.id,
      departureTime: "07:30",
      arrivalTime: "13:00",
      duration: 330,
      date: new Date("2026-04-18"),
    },
  });
  const sch7 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusNaxos.id,
      departureTime: "15:30",
      arrivalTime: "21:00",
      duration: 330,
      date: new Date("2026-05-22"),
    },
  });

  // Piraeus → Paros (2 schedules)
  const sch8 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusParos.id,
      departureTime: "07:30",
      arrivalTime: "11:45",
      duration: 255,
      date: new Date("2026-04-22"),
    },
  });
  const sch9 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusParos.id,
      departureTime: "14:00",
      arrivalTime: "18:15",
      duration: 255,
      date: new Date("2026-06-05"),
    },
  });

  // Piraeus → Heraklion (2 schedules - overnight)
  const sch10 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusHeraklion.id,
      departureTime: "21:00",
      arrivalTime: "06:00",
      duration: 540,
      date: new Date("2026-04-25"),
    },
  });
  const sch11 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusHeraklion.id,
      departureTime: "21:30",
      arrivalTime: "06:30",
      duration: 540,
      date: new Date("2026-05-10"),
    },
  });

  // Piraeus → Chania (2 schedules - overnight)
  const sch12 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusChania.id,
      departureTime: "20:30",
      arrivalTime: "06:00",
      duration: 570,
      date: new Date("2026-04-28"),
    },
  });
  const sch13 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusChania.id,
      departureTime: "21:00",
      arrivalTime: "06:30",
      duration: 570,
      date: new Date("2026-06-01"),
    },
  });

  // Piraeus → Rhodes (2 schedules)
  const sch14 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusRhodes.id,
      departureTime: "16:00",
      arrivalTime: "06:00",
      duration: 840,
      date: new Date("2026-05-05"),
    },
  });
  const sch15 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusRhodes.id,
      departureTime: "16:00",
      arrivalTime: "06:00",
      duration: 840,
      date: new Date("2026-06-15"),
    },
  });

  // Rafina → Mykonos (2 schedules)
  const sch16 = await prisma.schedule.create({
    data: {
      routeId: routeRafinaMykonos.id,
      departureTime: "07:45",
      arrivalTime: "12:30",
      duration: 285,
      date: new Date("2026-04-16"),
    },
  });
  const sch17 = await prisma.schedule.create({
    data: {
      routeId: routeRafinaMykonos.id,
      departureTime: "14:30",
      arrivalTime: "19:15",
      duration: 285,
      date: new Date("2026-05-20"),
    },
  });

  // Rafina → Naxos (2 schedules)
  const sch18 = await prisma.schedule.create({
    data: {
      routeId: routeRafinaNaxos.id,
      departureTime: "07:30",
      arrivalTime: "13:30",
      duration: 360,
      date: new Date("2026-04-19"),
    },
  });
  const sch19 = await prisma.schedule.create({
    data: {
      routeId: routeRafinaNaxos.id,
      departureTime: "08:00",
      arrivalTime: "14:00",
      duration: 360,
      date: new Date("2026-06-08"),
    },
  });

  // Mykonos → Santorini (2 schedules - fast)
  const sch20 = await prisma.schedule.create({
    data: {
      routeId: routeMykonosSantorini.id,
      departureTime: "09:00",
      arrivalTime: "11:15",
      duration: 135,
      date: new Date("2026-05-02"),
    },
  });
  const sch21 = await prisma.schedule.create({
    data: {
      routeId: routeMykonosSantorini.id,
      departureTime: "16:30",
      arrivalTime: "18:45",
      duration: 135,
      date: new Date("2026-06-12"),
    },
  });

  // Piraeus → Aegina (2 schedules - short)
  const sch22 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusAegina.id,
      departureTime: "08:00",
      arrivalTime: "08:40",
      duration: 40,
      date: new Date("2026-04-17"),
    },
  });
  const sch23 = await prisma.schedule.create({
    data: {
      routeId: routePiraeusAegina.id,
      departureTime: "17:00",
      arrivalTime: "17:40",
      duration: 40,
      date: new Date("2026-05-25"),
    },
  });

  // Naples → Palermo (2 schedules)
  const sch24 = await prisma.schedule.create({
    data: {
      routeId: routeNaplesPalermo.id,
      departureTime: "20:00",
      arrivalTime: "06:30",
      duration: 630,
      date: new Date("2026-04-30"),
    },
  });
  const sch25 = await prisma.schedule.create({
    data: {
      routeId: routeNaplesPalermo.id,
      departureTime: "20:30",
      arrivalTime: "07:00",
      duration: 630,
      date: new Date("2026-05-28"),
    },
  });

  // Marseille → Bastia (2 schedules)
  const sch26 = await prisma.schedule.create({
    data: {
      routeId: routeMarseilleBastia.id,
      departureTime: "08:00",
      arrivalTime: "19:00",
      duration: 660,
      date: new Date("2026-05-08"),
    },
  });
  const sch27 = await prisma.schedule.create({
    data: {
      routeId: routeMarseilleBastia.id,
      departureTime: "20:00",
      arrivalTime: "07:00",
      duration: 660,
      date: new Date("2026-06-18"),
    },
  });

  // Tangier Med → Dover (2 schedules)
  const sch28 = await prisma.schedule.create({
    data: {
      routeId: routeTangierDover.id,
      departureTime: "10:00",
      arrivalTime: "22:00",
      duration: 720,
      date: new Date("2026-05-12"),
    },
  });

  // ─── Pricing ─────────────────────────────────────────────────────────
  console.log("Seeding pricing...");

  const pricingData = [
    // Piraeus → Mykonos
    { scheduleId: sch1.id, basePrice: 38.0, currency: "EUR", discount: null },
    { scheduleId: sch2.id, basePrice: 42.0, currency: "EUR", discount: 0.1 },
    { scheduleId: sch3.id, basePrice: 45.0, currency: "EUR", discount: null },
    // Piraeus → Santorini
    { scheduleId: sch4.id, basePrice: 40.0, currency: "EUR", discount: null },
    { scheduleId: sch5.id, basePrice: 48.0, currency: "EUR", discount: 0.15 },
    // Piraeus → Naxos
    { scheduleId: sch6.id, basePrice: 36.0, currency: "EUR", discount: null },
    { scheduleId: sch7.id, basePrice: 36.0, currency: "EUR", discount: 0.2 },
    // Piraeus → Paros
    { scheduleId: sch8.id, basePrice: 34.0, currency: "EUR", discount: null },
    { scheduleId: sch9.id, basePrice: 37.0, currency: "EUR", discount: 0.1 },
    // Piraeus → Heraklion
    { scheduleId: sch10.id, basePrice: 35.0, currency: "EUR", discount: null },
    { scheduleId: sch11.id, basePrice: 38.0, currency: "EUR", discount: 0.25 },
    // Piraeus → Chania
    { scheduleId: sch12.id, basePrice: 33.0, currency: "EUR", discount: null },
    { scheduleId: sch13.id, basePrice: 36.0, currency: "EUR", discount: 0.15 },
    // Piraeus → Rhodes
    { scheduleId: sch14.id, basePrice: 52.0, currency: "EUR", discount: null },
    { scheduleId: sch15.id, basePrice: 58.0, currency: "EUR", discount: 0.1 },
    // Rafina → Mykonos
    { scheduleId: sch16.id, basePrice: 35.0, currency: "EUR", discount: null },
    { scheduleId: sch17.id, basePrice: 39.0, currency: "EUR", discount: 0.2 },
    // Rafina → Naxos
    { scheduleId: sch18.id, basePrice: 38.0, currency: "EUR", discount: null },
    { scheduleId: sch19.id, basePrice: 38.0, currency: "EUR", discount: null },
    // Mykonos → Santorini
    { scheduleId: sch20.id, basePrice: 62.0, currency: "EUR", discount: null },
    { scheduleId: sch21.id, basePrice: 68.0, currency: "EUR", discount: 0.15 },
    // Piraeus → Aegina
    { scheduleId: sch22.id, basePrice: 8.0, currency: "EUR", discount: null },
    { scheduleId: sch23.id, basePrice: 8.5, currency: "EUR", discount: null },
    // Naples → Palermo
    { scheduleId: sch24.id, basePrice: 55.0, currency: "EUR", discount: 0.1 },
    { scheduleId: sch25.id, basePrice: 55.0, currency: "EUR", discount: null },
    // Marseille → Bastia
    { scheduleId: sch26.id, basePrice: 48.0, currency: "EUR", discount: null },
    { scheduleId: sch27.id, basePrice: 52.0, currency: "EUR", discount: 0.2 },
    // Tangier Med → Dover
    { scheduleId: sch28.id, basePrice: 120.0, currency: "EUR", discount: 0.25 },
  ];

  await prisma.pricing.createMany({ data: pricingData });

  // ─── Articles ────────────────────────────────────────────────────────
  console.log("Seeding articles...");

  await prisma.article.createMany({
    data: [
      {
        title: "Island Hopping in the Cyclades: A Complete Guide",
        slug: "island-hopping-cyclades-guide",
        excerpt:
          "Discover the best routes and tips for exploring the Cycladic islands by ferry, from Mykonos to Santorini and beyond.",
        content: `The Cyclades archipelago is one of the most popular ferry destinations in Greece. With frequent connections from Piraeus and Rafina, island hopping has never been easier.\n\nStart your journey from Piraeus, where daily ferries depart for Mykonos, Naxos, Paros, and Santorini. Blue Star Ferries and SeaJets offer reliable services throughout the summer season. The conventional ferries take around 5 hours to Mykonos, while high-speed catamarans can cut that time in half.\n\nNaxos is the largest of the Cycladic islands and serves as a great base for day trips to Paros and Ios. From Mykonos, you can catch a fast ferry to Santorini in just over two hours. Plan at least 2-3 days per island to truly appreciate the unique character of each destination.\n\nBooking tip: reserve your tickets at least two weeks in advance during July and August, as popular routes sell out quickly.`,
        image: "/articles/cyclades-hopping.jpg",
      },
      {
        title: "Overnight Ferries to Crete: What to Expect",
        slug: "overnight-ferries-crete-guide",
        excerpt:
          "Everything you need to know about taking the overnight ferry from Piraeus to Heraklion or Chania.",
        content: `Taking an overnight ferry to Crete is a quintessential Greek travel experience. Both Minoan Lines and Anek Lines operate modern, comfortable vessels on the Piraeus-Heraklion and Piraeus-Chania routes.\n\nThe journey takes approximately 9 hours, departing around 21:00 and arriving at 06:00. You can choose between deck seats, airline-style seats, and private cabins. Cabins range from basic two-berth interiors to luxury suites with sea views.\n\nOnboard amenities are impressive: restaurants serving Greek cuisine, bars with live music, swimming pools on some vessels, shops, and even cinemas. The Knossos Palace by Minoan Lines is particularly well-regarded for its facilities.\n\nPro tip: even if you book a deck ticket, arrive early to claim a comfortable spot. Many travelers bring sleeping bags and camp out on the upper deck under the stars.`,
        image: "/articles/overnight-crete.jpg",
      },
      {
        title: "Ferry Travel with Pets: A Mediterranean Guide",
        slug: "ferry-travel-pets-mediterranean",
        excerpt:
          "Planning to bring your furry friend on a ferry? Here is what you need to know about pet-friendly ferry services across the Mediterranean.",
        content: `Traveling with pets on ferries is increasingly common, and many operators now offer pet-friendly cabins and dedicated areas. Blue Star Ferries leads the way in Greece with designated pet-friendly cabins and outdoor areas on their vessels.\n\nBefore you travel, ensure your pet has a valid EU pet passport with up-to-date vaccinations. Most ferry operators require pets to remain in a carrier or on a leash in public areas. Some vessels have kennels available, while others allow pets in specially designated cabins.\n\nFor the best experience, book a pet-friendly cabin in advance as they are limited in number. Bring plenty of water, food, and familiar items to keep your pet comfortable during the journey. Short routes like Piraeus to Aegina (40 minutes) are great for a first ferry experience with your pet.\n\nRemember to check specific operator policies before booking, as rules can vary between companies and routes.`,
        image: "/articles/pets-ferry.jpg",
      },
      {
        title: "Comparing Fast Ferries vs Conventional: Which Is Right for You?",
        slug: "fast-ferries-vs-conventional",
        excerpt:
          "Speed versus comfort and cost - we break down the differences between high-speed catamarans and traditional ferries in Greece.",
        content: `When planning your Greek island ferry trip, one of the first decisions you will face is choosing between fast ferries and conventional vessels. Each has distinct advantages.\n\nFast ferries (catamarans) like SeaJets' Champion Jet series can reach Mykonos from Piraeus in about 2.5 hours, compared to 5 hours on a conventional ferry. However, they cost roughly 50-70% more and have limited outdoor deck space. They also cannot sail in strong winds (typically above force 7), so cancellations are more common.\n\nConventional ferries from Blue Star Ferries and others offer a more relaxed experience with restaurants, bars, and large outdoor decks. They are more stable in rough seas and rarely cancel due to weather. Vehicle transport is also more affordable on conventional ferries.\n\nOur recommendation: take the fast ferry on the way to your destination if you are pressed for time, and enjoy the slower conventional ferry on the return journey. This way you get the best of both worlds.`,
        image: "/articles/fast-vs-conventional.jpg",
      },
      {
        title: "The Saronic Gulf: Perfect Day Trips from Athens",
        slug: "saronic-gulf-day-trips-athens",
        excerpt:
          "Aegina, Hydra, and Poros are just a short ferry ride from Athens. Here is how to plan the perfect day trip.",
        content: `The Saronic Gulf islands offer the easiest island escape from Athens. With ferries departing from Piraeus throughout the day, you can be on a beautiful Greek island in under an hour.\n\nAegina is the closest major island, just 40 minutes by high-speed ferry from Piraeus. Famous for its pistachio orchards and the ancient Temple of Aphaia, it makes for a perfect half-day trip. Hellenic Seaways operates frequent departures.\n\nHydra, about 90 minutes from Piraeus, is a car-free island with stunning architecture and crystal-clear waters. Artists and writers have long been drawn to its charm. The harbor is one of the most photographed spots in all of Greece.\n\nFor the best experience, catch an early morning ferry (around 08:00) and return on the late afternoon service. This gives you a full day to explore. Weekend ferries can be crowded, so weekday trips are recommended during peak season.`,
        image: "/articles/saronic-gulf.jpg",
      },
      {
        title: "Navigating the Mediterranean: Cross-Border Ferry Routes",
        slug: "mediterranean-cross-border-ferry-routes",
        excerpt:
          "From Marseille to Corsica and Naples to Sicily, explore the best international ferry connections across the Mediterranean.",
        content: `The Mediterranean is connected by an extensive network of ferry routes, making it possible to travel between countries without flying. Some of the most scenic crossings include Marseille to Bastia (Corsica), Naples to Palermo (Sicily), and the historic route from Tangier to southern Europe.\n\nThe Marseille-Bastia crossing takes about 11 hours and offers stunning views of the French Riviera and the Corsican coastline. Overnight services allow you to sleep through the journey and arrive fresh in the morning.\n\nNaples to Palermo is another classic overnight route, taking around 10.5 hours. The ships are modern and well-equipped, with restaurants serving regional Italian cuisine. Arriving by sea into Palermo's harbor with Monte Pellegrino as a backdrop is an unforgettable experience.\n\nWhen booking cross-border routes, pay attention to check-in times, which are typically 2 hours before departure. Also ensure your travel documents are in order, especially for routes crossing between EU and non-EU countries.`,
        image: "/articles/mediterranean-routes.jpg",
      },
    ],
  });

  // ─── Users ───────────────────────────────────────────────────────────
  console.log("Seeding users...");

  const user1 = await prisma.user.create({
    data: {
      name: "Maria Papadopoulou",
      email: "maria@example.com",
      password: HASHED_PASSWORD,
      avatar: "/avatars/maria.jpg",
      credits: 25.0,
    },
  });
  const user2 = await prisma.user.create({
    data: {
      name: "James Wilson",
      email: "james@example.com",
      password: HASHED_PASSWORD,
      avatar: "/avatars/james.jpg",
      credits: 10.0,
    },
  });
  const user3 = await prisma.user.create({
    data: {
      name: "Sophie Laurent",
      email: "sophie@example.com",
      password: HASHED_PASSWORD,
      avatar: "/avatars/sophie.jpg",
      credits: 0,
    },
  });

  // ─── Bookings & Booking Legs ─────────────────────────────────────────
  console.log("Seeding bookings...");

  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      code: "FT-20260415-001",
      status: "upcoming",
      totalPrice: 76.0,
      currency: "EUR",
      type: "standard",
    },
  });
  const bookingLeg1 = await prisma.bookingLeg.create({
    data: {
      bookingId: booking1.id,
      scheduleId: sch1.id,
      passengers: 2,
      vehicles: 0,
      pets: 0,
      seatInfo: "Deck - Economy",
      status: "confirmed",
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: user2.id,
      code: "FT-20260420-002",
      status: "completed",
      totalPrice: 40.0,
      currency: "EUR",
      type: "basic",
    },
  });
  const bookingLeg2 = await prisma.bookingLeg.create({
    data: {
      bookingId: booking2.id,
      scheduleId: sch4.id,
      passengers: 1,
      vehicles: 0,
      pets: 0,
      seatInfo: "Airline Seat - Business",
      status: "completed",
    },
  });

  const booking3 = await prisma.booking.create({
    data: {
      userId: user3.id,
      code: "FT-20260428-003",
      status: "cancelled",
      totalPrice: 66.0,
      currency: "EUR",
      type: "standard",
    },
  });
  const bookingLeg3 = await prisma.bookingLeg.create({
    data: {
      bookingId: booking3.id,
      scheduleId: sch12.id,
      passengers: 2,
      vehicles: 1,
      pets: 0,
      seatInfo: "Cabin - 2 Berth Interior",
      status: "cancelled",
    },
  });

  // ─── Reviews ─────────────────────────────────────────────────────────
  console.log("Seeding reviews...");

  await prisma.review.createMany({
    data: [
      {
        userId: user2.id,
        bookingLegId: bookingLeg2.id,
        title: "Smooth sailing to Santorini",
        content:
          "The Blue Star Naxos was clean and comfortable. Departed right on time and the onboard restaurant had great food. Would definitely book again for my next trip.",
        rating: 5,
      },
      {
        userId: user2.id,
        bookingLegId: bookingLeg2.id,
        title: "Good value for a deck ticket",
        content:
          "Bought the cheapest deck ticket and it was perfectly fine for an 8-hour journey. Plenty of seating inside and out. The WiFi was a bit slow but that is expected at sea.",
        rating: 4,
      },
      {
        userId: user1.id,
        bookingLegId: bookingLeg1.id,
        title: "Beautiful journey to Mykonos",
        content:
          "Woke up early for the 07:30 departure and it was worth it. Watched the sunrise over the Aegean as we left Piraeus. The ferry was modern and well-maintained.",
        rating: 5,
      },
      {
        userId: user1.id,
        bookingLegId: bookingLeg1.id,
        title: "Reliable service as always",
        content:
          "Blue Star Ferries never disappoints. The Patmos is one of the best vessels on the Cyclades routes. Comfortable seats, good food options, and arrived on schedule.",
        rating: 4,
      },
      {
        userId: user3.id,
        bookingLegId: bookingLeg3.id,
        title: "Decent overnight experience",
        content:
          "Took the overnight ferry to Chania. The cabin was small but adequate. The restaurant was crowded during dinner. Overall a decent experience for the price.",
        rating: 3,
      },
      {
        userId: user3.id,
        bookingLegId: bookingLeg3.id,
        title: "Average crossing, nothing special",
        content:
          "The ship was older and showing its age a bit. Air conditioning in the lounge was too cold. That said, we arrived on time and the crew was helpful when we had questions.",
        rating: 3,
      },
      {
        userId: user1.id,
        bookingLegId: bookingLeg1.id,
        title: "Great trip with the family",
        content:
          "Traveled with two kids and they loved the ferry experience. The outdoor deck was perfect for them to run around. Bar had decent coffee and snacks. Five hours flew by.",
        rating: 4,
      },
      {
        userId: user2.id,
        bookingLegId: bookingLeg2.id,
        title: "Perfect way to see the islands",
        content:
          "There is something magical about arriving at an island by sea. The approach to Santorini caldera was breathtaking. The ferry was punctual and the boarding process was well-organized.",
        rating: 5,
      },
    ],
  });

  // ─── Notifications ───────────────────────────────────────────────────
  console.log("Seeding notifications...");

  await prisma.notification.createMany({
    data: [
      {
        userId: user1.id,
        message:
          "Your booking FT-20260415-001 has been confirmed. Departure: April 15, 2026 at 07:30 from Piraeus.",
        read: false,
      },
      {
        userId: user2.id,
        message:
          "Your trip to Santorini is complete! Leave a review and earn 5 credits.",
        read: true,
      },
      {
        userId: user3.id,
        message:
          "Your booking FT-20260428-003 has been cancelled. A refund of 66.00 EUR will be processed within 5-7 business days.",
        read: false,
      },
    ],
  });

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
