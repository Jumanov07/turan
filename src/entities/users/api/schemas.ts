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
  })
  .passthrough();

export const UserRowSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    company: UserCompanySchema.nullable(),
    createdAt: z.string(),
    isArchived: z.boolean(),
  })
  .passthrough();

export const UsersResponseSchema = z
  .object({
    data: z.array(UserRowSchema),
    total: z.number(),
  })
  .passthrough();
