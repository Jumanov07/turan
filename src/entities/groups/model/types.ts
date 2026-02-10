import type { z } from "zod";
import { GroupsResponseSchema } from "./schemas";

export type GroupsResponse = z.infer<typeof GroupsResponseSchema>;
export type Group = GroupsResponse["data"][number];
