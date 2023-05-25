export interface IApiResponse<T extends object | null> {
    status: "error" | "success";
    message: string;
    payload: T;
}

export interface IUser {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}