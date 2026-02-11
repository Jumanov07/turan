import type { z } from "zod";
import { GroupFormSchema } from "./schema";

export type GroupFormValues = z.infer<typeof GroupFormSchema>;
