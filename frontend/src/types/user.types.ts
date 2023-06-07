import { IUser } from "./shared.types";

export interface ICreateUserBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ILoginBody {
    email: string;
    password: string;
}

export interface IUpdateProfileBody {
    name?: string;
    password?: string;
    confirmPassword?: string;
}

export interface ICreateUserResponse {
    token: string;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export type LoginResponse = Omit<ICreateUserResponse, "createdAt">;
export type CurrentUserResponse = Omit<IUser, "password">;

export interface ISignedUser {
    token: string;
    name: string;
    email: string;
}