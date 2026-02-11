import type { z } from "zod";
import { CompanyFormSchema } from "./schema";

export type CompanyFormValues = z.infer<typeof CompanyFormSchema>;
