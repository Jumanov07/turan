import type { z } from "zod";
import { createUserFormSchema } from "./schema";

export type UserFormValues = z.infer<ReturnType<typeof createUserFormSchema>>;
