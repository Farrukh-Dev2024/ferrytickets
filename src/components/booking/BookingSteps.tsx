import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  { number: 1, label: "Select ferry" },
  { number: 2, label: "Select seat" },
  { number: 3, label: "Passengers" },
  { number: 4, label: "Payment" },
];

interface BookingStepsProps {
  currentStep: 1 | 2 | 3 | 4;
}

export function BookingSteps({ currentStep }: BookingStepsProps) {
  return (
    <div className="flex w-full items-center justify-between">
      {steps.map((step, index) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isPending = step.number > currentStep;

        return (
          <div key={step.number} className="flex flex-1 items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  isCompleted && "bg-green-500 text-white",
                  isActive && "bg-[#00BCD4] text-white",
                  isPending && "bg-gray-200 text-gray-500"
                )}
              >
                {isCompleted ? <Check className="size-4" /> : step.number}
              </div>
              <span
                className={cn(
                  "hidden text-xs font-medium sm:block",
                  isCompleted && "text-green-600",
                  isActive && "text-[#00BCD4]",
                  isPending && "text-gray-400"
                )}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "mx-2 h-0.5 flex-1",
                  step.number < currentStep ? "bg-green-500" : "bg-gray-200"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
