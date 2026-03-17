"use client";

import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBookingStore } from "@/stores/bookingStore";
import { User, Mail, Phone } from "lucide-react";

const passengerSchema = z.object({
  title: z.enum(["Mr", "Mrs", "Ms"], { message: "Title is required" }),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  idNumber: z
    .string()
    .min(5, "ID/Passport number must be at least 5 characters"),
  nationality: z.string().min(2, "Please select a nationality"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  type: z.enum(["adult", "child", "infant"]),
});

const formSchema = z.object({
  passengers: z.array(passengerSchema).min(1),
  contactEmail: z.string().email("Please enter a valid email address"),
  contactPhone: z
    .string()
    .min(7, "Phone number must be at least 7 characters"),
});

type FormData = z.infer<typeof formSchema>;

const nationalities = [
  "Greek",
  "British",
  "German",
  "French",
  "Italian",
  "Spanish",
  "Dutch",
  "American",
  "Canadian",
  "Australian",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Austrian",
  "Swiss",
  "Belgian",
  "Portuguese",
  "Irish",
  "Polish",
  "Czech",
  "Other",
];

export default function PassengersPage() {
  const router = useRouter();
  const { passengers, setPassengerDetails } = useBookingStore();

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  // Build initial passenger list with types
  const initialPassengers: FormData["passengers"] = [
    ...Array.from({ length: passengers.adults }, () => ({
      title: "Mr" as const,
      firstName: "",
      lastName: "",
      idNumber: "",
      nationality: "",
      dateOfBirth: "",
      type: "adult" as const,
    })),
    ...Array.from({ length: passengers.children }, () => ({
      title: "Mr" as const,
      firstName: "",
      lastName: "",
      idNumber: "",
      nationality: "",
      dateOfBirth: "",
      type: "child" as const,
    })),
    ...Array.from({ length: passengers.infants }, () => ({
      title: "Mr" as const,
      firstName: "",
      lastName: "",
      idNumber: "",
      nationality: "",
      dateOfBirth: "",
      type: "infant" as const,
    })),
  ];

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      passengers: initialPassengers,
      contactEmail: "",
      contactPhone: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "passengers",
  });

  const onSubmit = (data: FormData) => {
    const details = data.passengers.map((p) => ({
      type: p.type,
      firstName: p.firstName,
      lastName: p.lastName,
      idNumber: p.idNumber,
      nationality: p.nationality,
    }));
    setPassengerDetails(details);
    router.push("/booking/payment");
  };

  const getPassengerLabel = (type: string, index: number) => {
    const typeLabel =
      type === "adult" ? "Adult" : type === "child" ? "Child" : "Infant";
    return `${typeLabel} ${index + 1}`;
  };

  // Track per-type index for labeling
  let adultIdx = 0;
  let childIdx = 0;
  let infantIdx = 0;

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Booking steps */}
      <div className="mb-8">
        <BookingSteps currentStep={3} />
      </div>

      <h1 className="mb-2 text-2xl font-bold">Passenger Information</h1>
      <p className="mb-6 text-sm text-muted-foreground">
        Please enter the details for each passenger exactly as they appear on
        their ID or passport.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Passenger forms */}
        {fields.map((field, index) => {
          const type = field.type;
          let typeIndex: number;
          if (type === "adult") {
            typeIndex = adultIdx++;
          } else if (type === "child") {
            typeIndex = childIdx++;
          } else {
            typeIndex = infantIdx++;
          }
          const label = getPassengerLabel(type, typeIndex);

          return (
            <Card key={field.id}>
              <CardContent className="flex flex-col gap-4 pt-6">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <User className="size-5 text-[#00BCD4]" />
                  {label}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {/* Title */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Title</Label>
                    <Select
                      onValueChange={(val) =>
                        setValue(
                          `passengers.${index}.title`,
                          val as "Mr" | "Mrs" | "Ms"
                        )
                      }
                      defaultValue={watch(`passengers.${index}.title`)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mr">Mr</SelectItem>
                        <SelectItem value="Mrs">Mrs</SelectItem>
                        <SelectItem value="Ms">Ms</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.passengers?.[index]?.title && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.title?.message}
                      </p>
                    )}
                  </div>

                  {/* First name */}
                  <div className="flex flex-col gap-1.5">
                    <Label>First Name</Label>
                    <Input
                      {...register(`passengers.${index}.firstName`)}
                      placeholder="First name"
                    />
                    {errors.passengers?.[index]?.firstName && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.firstName?.message}
                      </p>
                    )}
                  </div>

                  {/* Last name */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Last Name</Label>
                    <Input
                      {...register(`passengers.${index}.lastName`)}
                      placeholder="Last name"
                    />
                    {errors.passengers?.[index]?.lastName && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.lastName?.message}
                      </p>
                    )}
                  </div>

                  {/* ID/Passport */}
                  <div className="flex flex-col gap-1.5">
                    <Label>ID / Passport Number</Label>
                    <Input
                      {...register(`passengers.${index}.idNumber`)}
                      placeholder="e.g. AB1234567"
                    />
                    {errors.passengers?.[index]?.idNumber && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.idNumber?.message}
                      </p>
                    )}
                  </div>

                  {/* Nationality */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Nationality</Label>
                    <Select
                      onValueChange={(val: unknown) =>
                        setValue(`passengers.${index}.nationality`, val as string)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select nationality" />
                      </SelectTrigger>
                      <SelectContent>
                        {nationalities.map((nat) => (
                          <SelectItem key={nat} value={nat}>
                            {nat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.passengers?.[index]?.nationality && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.nationality?.message}
                      </p>
                    )}
                  </div>

                  {/* Date of birth */}
                  <div className="flex flex-col gap-1.5">
                    <Label>Date of Birth</Label>
                    <Input
                      type="date"
                      {...register(`passengers.${index}.dateOfBirth`)}
                    />
                    {errors.passengers?.[index]?.dateOfBirth && (
                      <p className="text-xs text-red-500">
                        {errors.passengers[index]?.dateOfBirth?.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Contact details */}
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Mail className="size-5 text-[#00BCD4]" />
              Contact Details
            </div>
            <p className="text-sm text-muted-foreground">
              We&apos;ll send your booking confirmation and travel updates to
              these details.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("contactEmail")}
                    placeholder="email@example.com"
                    className="pl-9"
                    type="email"
                  />
                </div>
                {errors.contactEmail && (
                  <p className="text-xs text-red-500">
                    {errors.contactEmail.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...register("contactPhone")}
                    placeholder="+30 210 1234567"
                    className="pl-9"
                    type="tel"
                  />
                </div>
                {errors.contactPhone && (
                  <p className="text-xs text-red-500">
                    {errors.contactPhone.message}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            className="h-12"
            onClick={() => router.push("/booking/select-seat")}
          >
            Back
          </Button>
          <Button
            type="submit"
            className="h-12 min-w-[200px] bg-[#00BCD4] text-base font-semibold text-white hover:bg-[#00ACC1]"
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
