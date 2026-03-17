"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreditCard,
  Shield,
  Leaf,
  MessageSquare,
  Lock,
  Crown,
  Ship,
} from "lucide-react";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useBookingStore } from "@/stores/bookingStore";
import { cn } from "@/lib/utils";

type PaymentMethod = "credit-card" | "paypal" | "bank-transfer";

export default function PaymentPage() {
  const router = useRouter();
  const {
    tripType,
    fromPort,
    toPort,
    departDate,
    returnDate,
    passengers,
    seatSelections,
    selectedFerries,
  } = useBookingStore();

  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("credit-card");
  const [travelInsurance, setTravelInsurance] = useState(false);
  const [co2Offset, setCo2Offset] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [bookingType, setBookingType] = useState<"basic" | "gold">("basic");

  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  const isReturn = tripType === "return";
  const fromName = fromPort?.name || "Origin";
  const toName = toPort?.name || "Destination";
  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  // Price calculation
  const baseFare = 39.5 * totalPassengers;
  const returnFare = isReturn ? 39.5 * totalPassengers : 0;

  const seatPriceMap: Record<string, number> = {
    deck: 0,
    economy: 5,
    business: 25,
    "cabin-2berth": 45,
    "cabin-4berth": 35,
  };

  const outboundSeatPrice =
    (seatPriceMap[seatSelections["outbound"] || "deck"] || 0) *
    totalPassengers;
  const returnSeatPrice = isReturn
    ? (seatPriceMap[seatSelections["return"] || "deck"] || 0) *
      totalPassengers
    : 0;
  const totalSeatUpgrade = outboundSeatPrice + returnSeatPrice;

  const insuranceCost = travelInsurance ? 12.5 * totalPassengers : 0;
  const co2Cost = co2Offset ? 2.0 : 0;
  const smsCost = smsNotifications ? 1.5 : 0;
  const totalExtras = insuranceCost + co2Cost + smsCost;
  const goldUpgrade = bookingType === "gold" ? 15 : 0;

  const total =
    baseFare + returnFare + totalSeatUpgrade + totalExtras + goldUpgrade;

  const handlePay = () => {
    if (!acceptTerms) return;
    // In a real app, process payment here
    router.push("/booking/confirmation");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Booking steps */}
      <div className="mb-8">
        <BookingSteps currentStep={4} />
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left column - 2/3 */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Extra services */}
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <h2 className="text-lg font-bold">Extra Services</h2>

              {/* Travel insurance */}
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50">
                <Checkbox
                  checked={travelInsurance}
                  onCheckedChange={(v) => setTravelInsurance(v === true)}
                  className="mt-0.5"
                />
                <div className="flex flex-1 items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Shield className="mt-0.5 size-5 text-blue-500" />
                    <div>
                      <p className="font-medium">Travel Insurance</p>
                      <p className="text-sm text-muted-foreground">
                        Coverage for trip cancellation, delays, medical
                        emergencies, and lost luggage.
                      </p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-semibold">
                    +&euro;12.50
                    <span className="text-xs font-normal text-muted-foreground">
                      {" "}
                      /person
                    </span>
                  </span>
                </div>
              </label>

              {/* CO2 offset */}
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-green-200 bg-green-50/50 p-4 transition-colors hover:bg-green-50">
                <Checkbox
                  checked={co2Offset}
                  onCheckedChange={(v) => setCo2Offset(v === true)}
                  className="mt-0.5"
                />
                <div className="flex flex-1 items-start justify-between">
                  <div className="flex items-start gap-2">
                    <Leaf className="mt-0.5 size-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800">
                        Carbon Offset
                      </p>
                      <p className="text-sm text-green-700/70">
                        Offset the CO2 emissions of your ferry trip by
                        supporting verified reforestation projects.
                      </p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-semibold text-green-700">
                    +&euro;2.00
                  </span>
                </div>
              </label>

              {/* SMS notifications */}
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors hover:bg-gray-50">
                <Checkbox
                  checked={smsNotifications}
                  onCheckedChange={(v) => setSmsNotifications(v === true)}
                  className="mt-0.5"
                />
                <div className="flex flex-1 items-start justify-between">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="mt-0.5 size-5 text-purple-500" />
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-muted-foreground">
                        Receive real-time updates about your ferry schedule,
                        delays, and gate changes via SMS.
                      </p>
                    </div>
                  </div>
                  <span className="whitespace-nowrap font-semibold">
                    +&euro;1.50
                  </span>
                </div>
              </label>
            </CardContent>
          </Card>

          {/* Payment method */}
          <Card>
            <CardContent className="flex flex-col gap-4 pt-6">
              <h2 className="text-lg font-bold">Payment Method</h2>

              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                className="flex flex-col gap-3"
              >
                {/* Credit card */}
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                    paymentMethod === "credit-card" && "border-[#00BCD4] bg-cyan-50/50"
                  )}
                >
                  <RadioGroupItem value="credit-card" />
                  <CreditCard className="size-5" />
                  <span className="font-medium">Credit / Debit Card</span>
                  <div className="ml-auto flex gap-1">
                    <div className="flex h-6 w-10 items-center justify-center rounded bg-blue-600 text-[8px] font-bold text-white">
                      VISA
                    </div>
                    <div className="flex h-6 w-10 items-center justify-center rounded bg-red-500 text-[8px] font-bold text-white">
                      MC
                    </div>
                  </div>
                </label>

                {/* PayPal */}
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                    paymentMethod === "paypal" && "border-[#00BCD4] bg-cyan-50/50"
                  )}
                >
                  <RadioGroupItem value="paypal" />
                  <div className="flex h-5 w-16 items-center justify-center rounded bg-[#003087] text-[9px] font-bold text-white">
                    PayPal
                  </div>
                  <span className="font-medium">PayPal</span>
                </label>

                {/* Bank transfer */}
                <label
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                    paymentMethod === "bank-transfer" && "border-[#00BCD4] bg-cyan-50/50"
                  )}
                >
                  <RadioGroupItem value="bank-transfer" />
                  <span className="font-medium">Bank Transfer</span>
                </label>
              </RadioGroup>

              {/* Credit card form */}
              {paymentMethod === "credit-card" && (
                <div className="mt-2 flex flex-col gap-4 rounded-lg border bg-gray-50 p-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Card Number</Label>
                    <Input
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <Label>Expiry Date</Label>
                      <Input
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label>CVV</Label>
                      <Input
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        maxLength={4}
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Cardholder Name</Label>
                    <Input
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      placeholder="Name as shown on card"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Terms and pay */}
          <div className="flex flex-col gap-4">
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox
                checked={acceptTerms}
                onCheckedChange={(v) => setAcceptTerms(v === true)}
                className="mt-0.5"
              />
              <span className="text-sm text-muted-foreground">
                I agree to the{" "}
                <span className="text-[#00BCD4] underline">
                  Terms and Conditions
                </span>{" "}
                and{" "}
                <span className="text-[#00BCD4] underline">
                  Privacy Policy
                </span>
                . I understand that my booking is subject to the ferry
                operator&apos;s cancellation policy.
              </span>
            </label>

            <Button
              className="h-14 w-full bg-[#FFC107] text-lg font-bold text-black shadow-md hover:bg-[#FFB300] disabled:opacity-50"
              disabled={!acceptTerms}
              onClick={handlePay}
            >
              <Lock className="mr-2 size-5" />
              Pay Now &mdash; &euro;{total.toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Right column - 1/3 */}
        <div className="flex flex-col gap-6">
          {/* Order summary */}
          <Card>
            <CardContent className="flex flex-col gap-3 pt-6">
              <h3 className="text-lg font-bold">Order Summary</h3>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <Ship className="size-4 text-[#00BCD4]" />
                  <span>
                    {fromName} &rarr; {toName}
                  </span>
                </div>
                {isReturn && (
                  <div className="flex items-center gap-2 text-sm">
                    <Ship className="size-4 text-[#00BCD4]" />
                    <span>
                      {toName} &rarr; {fromName}
                    </span>
                  </div>
                )}
                {departDate && (
                  <p className="text-sm text-muted-foreground">
                    {departDate.toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                )}
                <p className="text-sm text-muted-foreground">
                  {totalPassengers} passenger
                  {totalPassengers !== 1 ? "s" : ""}
                </p>
              </div>

              <Separator />

              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span>Base fare (outbound)</span>
                  <span>&euro;{baseFare.toFixed(2)}</span>
                </div>
                {isReturn && (
                  <div className="flex justify-between">
                    <span>Base fare (return)</span>
                    <span>&euro;{returnFare.toFixed(2)}</span>
                  </div>
                )}
                {totalSeatUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Seat upgrades</span>
                    <span>&euro;{totalSeatUpgrade.toFixed(2)}</span>
                  </div>
                )}
                {totalExtras > 0 && (
                  <div className="flex justify-between">
                    <span>Extra services</span>
                    <span>&euro;{totalExtras.toFixed(2)}</span>
                  </div>
                )}
                {goldUpgrade > 0 && (
                  <div className="flex justify-between">
                    <span>Gold upgrade</span>
                    <span>&euro;{goldUpgrade.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-xl font-bold">
                  &euro;{total.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Booking type toggle */}
          <Card>
            <CardContent className="flex flex-col gap-3 pt-6">
              <h3 className="font-bold">Booking Type</h3>

              <div
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-4 transition-all",
                  bookingType === "basic"
                    ? "border-[#00BCD4] bg-cyan-50/50"
                    : "border-gray-200"
                )}
                onClick={() => setBookingType("basic")}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">Basic</span>
                  <Badge variant="secondary">Standard</Badge>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Standard boarding and services included with your ticket.
                </p>
              </div>

              <div
                className={cn(
                  "cursor-pointer rounded-lg border-2 p-4 transition-all",
                  bookingType === "gold"
                    ? "border-[#FFC107] bg-yellow-50/50"
                    : "border-gray-200"
                )}
                onClick={() => setBookingType("gold")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="size-4 text-[#FFC107]" />
                    <span className="font-medium">Gold</span>
                  </div>
                  <span className="font-semibold text-[#FFC107]">
                    +&euro;15.00
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Priority boarding, access to the VIP lounge, and dedicated
                  customer support.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
