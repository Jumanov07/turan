export interface ReadingMeter {
  name: string;
}

export interface Reading {
  id: string;
  value: string;
  valveState: "open" | "closed";
  batteryStatus: number;
  meter: ReadingMeter;
  readingAt: string;
}
