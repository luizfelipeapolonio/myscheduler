export interface ICreateUserBody {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ICreateUserResponse {
    token: string;
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface ISignedUser {
    token: string;
    name: string;
    email: string;
}