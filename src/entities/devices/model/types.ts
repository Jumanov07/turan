import type { z } from "zod";
import { DevicesResponseSchema } from "./schemas";

export type DevicesResponse = z.infer<typeof DevicesResponseSchema>;
export type Device = DevicesResponse["data"][number];
