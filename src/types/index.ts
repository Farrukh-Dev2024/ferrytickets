export interface Country {
  id: string;
  name: string;
  code: string;
  flag: string;
  illustration: string;
  regions: Region[];
}

export interface Region {
  id: string;
  name: string;
  countryId: string;
  ports: Port[];
}

export interface Port {
  id: string;
  name: string;
  code: string;
  regionId: string;
  countryId: string;
  lat: number;
  lng: number;
}

export interface FerryOperator {
  id: string;
  name: string;
  logo: string;
  code: string;
}

export interface Vessel {
  id: string;
  name: string;
  operatorId: string;
  operator?: FerryOperator;
  capacity: number;
  amenities: string[];
  photos: string[];
}

export interface Route {
  id: string;
  fromPortId: string;
  toPortId: string;
  fromPort?: Port;
  toPort?: Port;
  operatorId: string;
  operator?: FerryOperator;
  vesselId: string;
  vessel?: Vessel;
}

export interface Schedule {
  id: string;
  routeId: string;
  route?: Route;
  departureTime: string;
  arrivalTime: string;
  duration: number;
  date: string;
  pricing?: Pricing[];
}

export interface Pricing {
  id: string;
  scheduleId: string;
  basePrice: number;
  currency: string;
  discount: number | null;
}

export interface Booking {
  id: string;
  userId: string;
  code: string;
  status: "upcoming" | "completed" | "cancelled" | "edited";
  totalPrice: number;
  currency: string;
  type: "basic" | "gold";
  legs: BookingLeg[];
  createdAt: string;
}

export interface BookingLeg {
  id: string;
  bookingId: string;
  scheduleId: string;
  schedule?: Schedule;
  passengers: number;
  vehicles: number;
  pets: number;
  seatInfo: string | null;
  status: string;
}

export interface Review {
  id: string;
  userId: string;
  user?: { name: string; avatar: string | null };
  bookingLegId: string;
  title: string;
  content: string;
  rating: number;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  slug: string;
  createdAt: string;
}

export interface Currency {
  id: string;
  code: string;
  symbol: string;
  name: string;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface DelayData {
  month: string;
  low: number;
  medium: number;
  high: number;
}

export interface PassengerInfo {
  type: "adult" | "child" | "infant";
  firstName: string;
  lastName: string;
  idNumber: string;
  nationality: string;
}

export interface BookingFormData {
  tripType: "simple" | "return" | "island-hopping";
  fromPort: Port | null;
  toPort: Port | null;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: { adults: number; children: number; infants: number };
  vehicles: { cars: number; motorcycles: number; bicycles: number };
  pets: number;
}
