import { z } from "zod";
import { userCreateSchema, userSignInSchema } from "../validation/userSchemas";

export type userCreateBody = z.infer<typeof userCreateSchema>;
export type userSignInBody = z.infer<typeof userSignInSchema>;

export type NewUser = {
    token: string;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export type SignedInUser = Omit<NewUser, "createdAt">;

