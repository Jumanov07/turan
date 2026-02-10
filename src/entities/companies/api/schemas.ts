import { z } from "zod";
import { ROLE } from "@/shared/constants";

const RoleSchema = z.enum([
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
]);

const CompanyUserSchema = z
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

const CompanyApiKeySchema = z
  .object({
    key: z.string(),
    createdAt: z.string().default(""),
  })
  .passthrough();

export const CompanySchema = z
  .object({
    id: z.number(),
    name: z.string(),
    address: z.string(),
    users: z.array(CompanyUserSchema).default([]),
    key: CompanyApiKeySchema.nullable().default(null),
    createdAt: z.string(),
    updatedAt: z.string().default(""),
    isArchived: z.boolean().default(false),
  })
  .passthrough();

export const CompaniesResponseSchema = z.array(CompanySchema);
