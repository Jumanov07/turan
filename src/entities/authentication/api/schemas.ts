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
    address: z.string().default(""),
    createdAt: z.string().default(""),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();

const AuthDeviceSchema = z
  .object({
    id: z.number(),
    deviceId: z.string(),
    verified: z.boolean(),
    createdAt: z.string(),
    isArchived: z.boolean().default(false),
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
    passwordChange: z.boolean().default(false),
    company: AuthCompanySchema.nullable().default(null),
    devices: z.array(AuthDeviceSchema).default([]),
    createdAt: z.string().default(""),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();
