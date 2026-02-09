import type { Meter } from "@/entities/meters";

export interface Reading {
  id: string;
  value: string;
  valveState: "open" | "closed";
  batteryStatus: number;
  meter: Meter;
  readingAt: string;
}
