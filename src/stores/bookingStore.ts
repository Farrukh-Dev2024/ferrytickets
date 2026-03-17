import { create } from "zustand";
import type { Port, PassengerInfo } from "@/types";

interface Passengers {
  adults: number;
  children: number;
  infants: number;
}

interface Vehicles {
  cars: number;
  motorcycles: number;
  bicycles: number;
}

type TripType = "simple" | "return" | "island-hopping";

interface BookingState {
  tripType: TripType;
  fromPort: Port | null;
  toPort: Port | null;
  departDate: Date | null;
  returnDate: Date | null;
  passengers: Passengers;
  vehicles: Vehicles;
  pets: number;
  selectedFerries: Record<string, string>;
  seatSelections: Record<string, string>;
  passengerDetails: PassengerInfo[];
}

interface BookingActions {
  setTripType: (tripType: TripType) => void;
  setFromPort: (port: Port | null) => void;
  setToPort: (port: Port | null) => void;
  swapPorts: () => void;
  setDepartDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  updatePassengers: (passengers: Partial<Passengers>) => void;
  updateVehicles: (vehicles: Partial<Vehicles>) => void;
  setPets: (pets: number) => void;
  selectFerry: (legId: string, scheduleId: string) => void;
  setSeatSelection: (legId: string, seatId: string) => void;
  setPassengerDetails: (details: PassengerInfo[]) => void;
  reset: () => void;
}

const initialState: BookingState = {
  tripType: "simple",
  fromPort: null,
  toPort: null,
  departDate: null,
  returnDate: null,
  passengers: { adults: 1, children: 0, infants: 0 },
  vehicles: { cars: 0, motorcycles: 0, bicycles: 0 },
  pets: 0,
  selectedFerries: {},
  seatSelections: {},
  passengerDetails: [],
};

export const useBookingStore = create<BookingState & BookingActions>()(
  (set) => ({
    ...initialState,

    setTripType: (tripType) => set({ tripType }),

    setFromPort: (port) => set({ fromPort: port }),

    setToPort: (port) => set({ toPort: port }),

    swapPorts: () =>
      set((state) => ({
        fromPort: state.toPort,
        toPort: state.fromPort,
      })),

    setDepartDate: (date) => set({ departDate: date }),

    setReturnDate: (date) => set({ returnDate: date }),

    updatePassengers: (passengers) =>
      set((state) => ({
        passengers: { ...state.passengers, ...passengers },
      })),

    updateVehicles: (vehicles) =>
      set((state) => ({
        vehicles: { ...state.vehicles, ...vehicles },
      })),

    setPets: (pets) => set({ pets }),

    selectFerry: (legId, scheduleId) =>
      set((state) => ({
        selectedFerries: { ...state.selectedFerries, [legId]: scheduleId },
      })),

    setSeatSelection: (legId, seatId) =>
      set((state) => ({
        seatSelections: { ...state.seatSelections, [legId]: seatId },
      })),

    setPassengerDetails: (details) => set({ passengerDetails: details }),

    reset: () => set(initialState),
  })
);
