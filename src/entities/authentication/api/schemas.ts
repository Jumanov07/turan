import { z } from "zod";
import { ROLE } from "@/shared/constants";

const RoleSchema = z.enum([
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
]);

const AuthCompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();

export const SignInResponseSchema = z
  .object({
    accessToken: z.string(),
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    passwordChange: z.boolean(),
    company: AuthCompanySchema.nullable(),
  })
  .passthrough();
