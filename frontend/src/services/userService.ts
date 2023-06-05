// Types
import { IApiResponse } from "../types/shared.types";
import { 
    ICreateUserBody, 
    ILoginBody, 
    ICreateUserResponse, 
    LoginResponse, 
    CurrentUserResponse 
} from "../types/user.types";

const api: string = "http://localhost:5000/api";

export const register = async (body: ICreateUserBody): Promise<IApiResponse<ICreateUserResponse | null> | null> => {
    try {
        const response = await fetch(api + "/users/register", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data: IApiResponse<ICreateUserResponse | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro na criação de usuário --> ", error);
        return null;
    }
}

export const login = async (body: ILoginBody): Promise<IApiResponse<LoginResponse | null> | null> => {
    try {
        const response = await fetch(api + "/users/login", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data: IApiResponse<LoginResponse | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro no login de usuário --> ", error);
        return null;
    }
}

export const currentUser = async (token: string): Promise<IApiResponse<CurrentUserResponse | null> | null> => {
    try {
        const response = await fetch(api + "/users/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const data: IApiResponse<CurrentUserResponse | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao buscar usuário logado --> ", error);
        return null;
    }
}