// Types
import { IApiResponse } from "../types/shared.types";
import { ICreateUserBody, ICreateUserResponse } from "../types/user.types";

import { useState } from "react";

// Services
import { register } from "../services/userService";

interface IHandleUser {
    createAndSignInUser: (body: ICreateUserBody) => Promise<void>;
    reset: () => void;
    data: IApiResponse<ICreateUserResponse | null> | null;
    loading: boolean;
    error: boolean;
    success: boolean;
}

export function useHandleUser(): IHandleUser {
    const [data, setData] = useState<IApiResponse<ICreateUserResponse | null> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const createAndSignInUser = async (body: ICreateUserBody): Promise<void> => {
        
        setLoading(true);

        try {
            const registerResponse = await register(body);

            if(registerResponse === null) setError(true);
            if(registerResponse && registerResponse.status === "error") setError(true);
            if(registerResponse && registerResponse.status === "success") setSuccess(true);

            setData(registerResponse);

        } catch(error) {
            console.log("Erro ao cadastrar usuário --> ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const reset = (): void => {
        setData(null);
        setLoading(false);
        setError(false);
        setSuccess(false);
    }

    return { createAndSignInUser, reset, data, loading, error, success };
}