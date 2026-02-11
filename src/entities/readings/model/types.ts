import type { z } from "zod";
import { ReadingsResponseSchema } from "./schemas";

export type ReadingsResponse = z.infer<typeof ReadingsResponseSchema>;
export type Reading = ReadingsResponse["data"][number];
