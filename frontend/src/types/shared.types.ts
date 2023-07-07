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

export interface IAppointment {
    id: string;
    type: string;
    title: string;
    description: string | null;
    priority: string;
    date: Date;
    time: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}