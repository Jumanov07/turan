import type { z } from "zod";
import { ForgotFormSchema, SignInFormSchema } from "./schema";

export type SignInFormValues = z.infer<typeof SignInFormSchema>;

export type ForgotFormValues = z.infer<typeof ForgotFormSchema>;
