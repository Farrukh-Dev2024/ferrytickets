"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="mb-10 text-center">
        <Mail className="mx-auto mb-3 size-12 text-[#00BCD4]" />
        <h1 className="mb-3 text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground">
          Have a question or need help? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardContent className="pt-6">
              {submitted ? (
                <div className="flex flex-col items-center gap-3 py-12 text-center">
                  <Send className="size-12 text-[#00BCD4]" />
                  <h2 className="text-xl font-bold">Message Sent!</h2>
                  <p className="text-sm text-muted-foreground">
                    Thank you for reaching out. We will get back to you within
                    24 hours.
                  </p>
                  <Button
                    className="mt-4 bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Name
                    </label>
                    <Input
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Email
                    </label>
                    <Input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Subject
                    </label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value: unknown) =>
                        setFormData({ ...formData, subject: String(value ?? "") })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="booking">Booking Inquiry</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="refund">Refund Request</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#00BCD4]/50"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <Phone className="size-8 text-[#00BCD4]" />
              <h3 className="font-semibold">Phone</h3>
              <a
                href={brand.phone.href}
                className="text-sm text-[#00BCD4] hover:underline"
              >
                {brand.phone.display}
              </a>
              <p className="text-xs text-muted-foreground">
                {brand.phone.hours}
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <Mail className="size-8 text-[#00BCD4]" />
              <h3 className="font-semibold">Email</h3>
              <a
                href={`mailto:${brand.email}`}
                className="text-sm text-[#00BCD4] hover:underline"
              >
                {brand.email}
              </a>
              <p className="text-xs text-muted-foreground">
                We reply within 24 hours
              </p>
            </CardContent>
          </Card>
          <Card className="transition-shadow hover:shadow-md">
            <CardContent className="flex flex-col items-center gap-2 pt-6 text-center">
              <MapPin className="size-8 text-[#00BCD4]" />
              <h3 className="font-semibold">Office</h3>
              <p className="text-sm text-muted-foreground">
                123 Akti Miaouli Street
                <br />
                Piraeus 185 35
                <br />
                Athens, Greece
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
