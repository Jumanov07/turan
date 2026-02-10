interface ReadingMeter {
  name: string;
}

export interface Reading {
  id: string;
  value: string;
  valveState: "open" | "closed";
  batteryStatus: number | null;
  meter: ReadingMeter;
  readingAt: string;
}
