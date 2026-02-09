export interface Meter {
  id: number;
  name: string;
  password: string;
  customerID: string | null;
  client: string | null;
  address: string | null;
  descriptions: string | null;
  valveStatus: "open" | "closed";
  valveStatusChange: string | null;
  batteryStatus: string | null;
  lastReading: number | null;
  pendingCommand: string | null;
  status: "normal" | "warning" | "error";
  errorMessage: string | null;
  createdAt: string;
  updatedAt: string;
  isArchived: boolean;
}
