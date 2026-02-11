import type { z } from "zod";
import { MeterFormSchema } from "./schema";

export type MeterFormValues = z.infer<typeof MeterFormSchema>;
