import { z } from "zod";

const ValveStatusSchema = z.enum(["open", "closed"]);
const MeterStatusSchema = z.enum(["normal", "warning", "error"]);

export const MeterSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    password: z.string(),
    customerID: z.string().nullable().default(null),
    client: z.string().nullable().default(null),
    address: z.string().nullable().default(null),
    descriptions: z.string().nullable().default(null),
    valveStatus: ValveStatusSchema,
    valveStatusChange: z.string().nullable().default(null),
    batteryStatus: z.string().nullable().default(null),
    lastReading: z.number().nullable().default(null),
    pendingCommand: z.string().nullable().default(null),
    status: MeterStatusSchema,
    errorMessage: z.string().nullable().default(null),
    isArchived: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .passthrough();

export const MetersResponseSchema = z
  .object({
    data: z.array(MeterSchema),
    total: z.number(),
  })
  .passthrough();
