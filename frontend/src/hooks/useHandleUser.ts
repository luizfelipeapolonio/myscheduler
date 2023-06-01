// Types
import { IApiResponse } from "../types/shared.types";
import { ICreateUserBody, ICreateUserResponse, ILoginBody, ILoginResponse, ISignedUser } from "../types/user.types";

import { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth/AuthContext";

// Services
import { register, login } from "../services/userService";

type UserResponse = ICreateUserResponse | ILoginResponse;

interface IHandleUser {
    createAndSignInUser: (body: ICreateUserBody) => Promise<void>;
    signIn: (body: ILoginBody) => Promise<void>;
    signOut: () => void;
    reset: () => void;
    data: IApiResponse<UserResponse | null> | null;
    loading: boolean;
    error: boolean;
    success: boolean;
}

export function useHandleUser(): IHandleUser {
    const [data, setData] = useState<IApiResponse<UserResponse | null> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const { setChanged } = useAuthContext();

    useEffect(() => {
        if(data) {
            setChanged(true);
        } else {
            setChanged(false);
        }
    }, [data]);

    const createAndSignInUser = async (body: ICreateUserBody): Promise<void> => {
        
        setLoading(true);

        try {
            const registerResponse = await register(body);

            if(registerResponse === null) setError(true);
            if(registerResponse && registerResponse.status === "error") setError(true);

            if(registerResponse && registerResponse.status === "success") {
                if(registerResponse.payload !== null) {
                    const signedUser: ISignedUser = {
                        token: registerResponse.payload.token,
                        name: registerResponse.payload.name,
                        email: registerResponse.payload.email
                    }
                    
                    localStorage.setItem("user", JSON.stringify(signedUser));
                }
                
                setSuccess(true);
            };

            setData(registerResponse);

        } catch(error) {
            console.log("Erro ao cadastrar usuário --> ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const signIn = async (body: ILoginBody): Promise<void> => {
        
        setLoading(true);

        try {
            const signInResponse = await login(body);

            if(signInResponse === null) setError(true);
            if(signInResponse && signInResponse.status === "error") setError(true);

            if(signInResponse && signInResponse.status === "success") {
                if(signInResponse.payload !== null) {
                    const signedUser: ISignedUser = {
                        token: signInResponse.payload.token,
                        name: signInResponse.payload.name,
                        email: signInResponse.payload.email
                    }

                    localStorage.setItem("user", JSON.stringify(signedUser));
                }

                setSuccess(true);
            }

            setData(signInResponse);

        } catch(error) {
            console.log("Erro ao logar usuário --> ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const signOut = (): void => {
        localStorage.removeItem("user");
        setChanged(true);
    }

    const reset = (): void => {
        setData(null);
        setError(false);
        setSuccess(false);
    }

    return { createAndSignInUser, signIn, signOut, reset, data, loading, error, success };
}