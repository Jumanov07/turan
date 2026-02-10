import { z } from "zod";
import { ROLE } from "@/shared/constants";

const RoleSchema = z.enum([
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
]);

const DeviceUserSchema = z
  .object({
    id: z.number(),
    email: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    role: RoleSchema,
    passwordChange: z.boolean().default(false),
    createdAt: z.string().default(""),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();

export const DeviceSchema = z
  .object({
    id: z.number(),
    deviceId: z.string(),
    verified: z.boolean(),
    createdAt: z.string(),
    isArchived: z.boolean().default(false),
    user: DeviceUserSchema.nullable().default(null),
  })
  .passthrough();

export const DevicesResponseSchema = z
  .object({
    data: z.array(DeviceSchema),
    total: z.number(),
  })
  .passthrough();
