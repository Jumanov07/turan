import { z } from "zod";
import { ROLE } from "@/shared/constants";

const RoleSchema = z.enum([
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
]);

const UserCompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string().default(""),
    createdAt: z.string().default(""),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();

export const UserRowSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    company: UserCompanySchema.nullable().default(null),
    passwordChange: z.boolean().default(false),
    createdAt: z.string().default(""),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();

export const UsersResponseSchema = z
  .object({
    data: z.array(UserRowSchema),
    total: z.number(),
  })
  .passthrough();
