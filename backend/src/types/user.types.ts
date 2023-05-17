import { z } from "zod";
import { User } from "@prisma/client";
import { createUserSchema, signInUserSchema, updateUserSchema } from "../validation/userSchemas";

export type CreateUserBody = z.infer<typeof createUserSchema>;
export type SignInUserBody = z.infer<typeof signInUserSchema>;
export type UpdateUserBody = z.infer<typeof updateUserSchema>;

export type NewUser = {
    token: string;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export type SignedInUser = Omit<NewUser, "createdAt">;
export type AuthUser = Omit<User, "password">;


