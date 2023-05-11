import { z } from "zod";
import { userCreateSchema } from "../validation/userSchemas";

export type userCreateBody = z.infer<typeof userCreateSchema>;

export type SignedInUser = {
    token: string;
    id: string;
    name: string;
    email: string;
}

