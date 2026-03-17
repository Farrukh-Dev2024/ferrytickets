"use client";

import { Settings, Map, Bell, Coins, Star, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserDropdownProps {
  user: {
    name: string;
    email: string;
    avatar?: string | null;
  };
}

export function UserDropdown({ user }: UserDropdownProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const notificationCount = 3;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full"
          />
        }
      >
        <Avatar size="sm">
          {user.avatar && <AvatarImage src={user.avatar} alt={user.name} />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-56">
        <DropdownMenuLabel className="flex flex-col gap-0.5 px-2 py-1.5">
          <span className="text-sm font-medium text-foreground">
            {user.name}
          </span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings className="size-4" />
            Settings
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Map className="size-4" />
            My Trips
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Bell className="size-4" />
            Notifications
            {notificationCount > 0 && (
              <span className="ml-auto inline-flex size-5 items-center justify-center rounded-full bg-cyan-brand text-[10px] font-semibold text-white">
                {notificationCount}
              </span>
            )}
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Coins className="size-4" />
            Credits
          </DropdownMenuItem>

          <DropdownMenuItem>
            <Star className="size-4" />
            Reviews
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem variant="destructive">
          <LogOut className="size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
