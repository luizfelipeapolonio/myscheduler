import { z } from "zod";
import { userCreateSchema } from "../validation/userSchemas";

export type userCreateBody = z.infer<typeof userCreateSchema>;

