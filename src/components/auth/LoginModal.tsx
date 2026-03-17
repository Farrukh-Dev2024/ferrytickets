"use client";

import { useState } from "react";
import { Facebook, Mail, Lock, Eye, EyeOff, Ship } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

interface LoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginModal({ open, onOpenChange }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: handle login
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-[820px] overflow-hidden p-0"
      >
        <div className="flex min-h-[520px]">
          {/* Left side: Login form */}
          <div className="flex flex-1 flex-col justify-center p-6 sm:p-8">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-xl font-semibold">
                Sign in to your account
              </DialogTitle>
              <DialogDescription>
                Access your bookings, manage trips, and more.
              </DialogDescription>
            </DialogHeader>

            {/* Social login buttons */}
            <div className="flex flex-col gap-2.5">
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#1877F2]/90 hover:text-white"
              >
                <Facebook className="size-4" />
                Continue with Facebook
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2"
              >
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 bg-black text-white border-black hover:bg-black/90 hover:text-white"
              >
                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Continue with Apple
              </Button>
            </div>

            {/* Separator */}
            <div className="relative my-6 flex items-center">
              <Separator className="flex-1" />
              <span className="px-3 text-xs text-muted-foreground uppercase">
                or
              </span>
              <Separator className="flex-1" />
            </div>

            {/* Email/Password form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="login-email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label
                  htmlFor="remember-me"
                  className="flex items-center gap-2 text-sm font-normal cursor-pointer"
                >
                  <Checkbox
                    id="remember-me"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  Remember me
                </Label>
                <button
                  type="button"
                  className="text-sm text-cyan-brand hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-cyan-brand text-white hover:bg-cyan-brand/90"
              >
                Sign in
              </Button>
            </form>

            <p className="mt-4 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <button
                type="button"
                className="font-medium text-cyan-brand hover:underline"
              >
                Create one
              </button>
            </p>
          </div>

          {/* Right side: Decorative area (hidden on mobile) */}
          <div className="hidden md:flex md:w-[340px] flex-col items-center justify-center bg-gradient-to-br from-cyan-brand to-cyan-700 p-8 text-white">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-white/20">
                <Ship className="size-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold">
                Your journey starts here
              </h3>
              <p className="text-sm text-white/80">
                Book ferry tickets across the Greek islands and beyond. Manage
                your trips, earn credits, and travel with ease.
              </p>
              <div className="mt-4 flex gap-6 text-xs text-white/70">
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">500+</span>
                  Routes
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">50+</span>
                  Islands
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl font-bold text-white">1M+</span>
                  Travelers
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
