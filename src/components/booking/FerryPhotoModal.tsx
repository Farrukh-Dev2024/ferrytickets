"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const gradients = [
  "from-[#00BCD4] to-[#004D61]",
  "from-[#FFC107] to-[#FF6F00]",
  "from-[#4CAF50] to-[#1B5E20]",
  "from-[#9C27B0] to-[#4A148C]",
  "from-[#F44336] to-[#B71C1C]",
  "from-[#2196F3] to-[#0D47A1]",
];

interface FerryPhotoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  photos: string[];
  vesselName: string;
}

export function FerryPhotoModal({
  open,
  onOpenChange,
  photos,
  vesselName,
}: FerryPhotoModalProps) {
  const [current, setCurrent] = useState(0);
  const total = Math.max(photos.length, 1);

  const goNext = () => setCurrent((prev) => (prev + 1) % total);
  const goPrev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-2xl"
        showCloseButton={false}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <DialogTitle>{vesselName}</DialogTitle>
          <DialogClose
            render={<Button variant="ghost" size="icon-sm" />}
          >
            <X className="size-4" />
          </DialogClose>
        </div>

        {/* Main image */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg">
          {photos.length > 0 && photos[current] ? (
            <img
              src={photos[current]}
              alt={`${vesselName} photo ${current + 1}`}
              className="size-full object-cover"
            />
          ) : (
            <div
              className={cn(
                "flex size-full items-center justify-center bg-gradient-to-br text-white text-lg font-semibold",
                gradients[current % gradients.length]
              )}
            >
              {vesselName} - Photo {current + 1}
            </div>
          )}

          {/* Navigation arrows */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
              >
                <ChevronRight className="size-5" />
              </button>
            </>
          )}

          {/* Counter */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white">
            {current + 1} / {total}
          </div>
        </div>

        {/* Thumbnail strip */}
        {total > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={cn(
                  "size-14 shrink-0 overflow-hidden rounded-md transition-all",
                  current === i
                    ? "ring-2 ring-[#00BCD4] ring-offset-1"
                    : "opacity-60 hover:opacity-100"
                )}
              >
                {photos[i] ? (
                  <img
                    src={photos[i]}
                    alt={`Thumbnail ${i + 1}`}
                    className="size-full object-cover"
                  />
                ) : (
                  <div
                    className={cn(
                      "flex size-full items-center justify-center bg-gradient-to-br text-[10px] font-medium text-white",
                      gradients[i % gradients.length]
                    )}
                  >
                    {i + 1}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
