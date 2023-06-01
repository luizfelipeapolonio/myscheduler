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

export interface ICreateUserResponse {
    token: string;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export type ILoginResponse = Omit<ICreateUserResponse, "createdAt">;

export interface ISignedUser {
    token: string;
    name: string;
    email: string;
}