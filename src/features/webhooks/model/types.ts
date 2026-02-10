import type { z } from "zod";
import { WebhookFormSchema } from "./schema";

export type WebhookFormValues = z.infer<typeof WebhookFormSchema>;
