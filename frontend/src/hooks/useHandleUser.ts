// Types
import { IApiResponse } from "../types/shared.types";
import { 
    ICreateUserBody, 
    ICreateUserResponse, 
    ILoginBody,
    IUpdateProfileBody,
    LoginResponse, 
    CurrentUserResponse,
    ISignedUser
} from "../types/user.types";

import { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth/AuthContext";

// Services
import { register, login, currentUser, update } from "../services/userService";

// Utils
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";

type UserResponse = ICreateUserResponse | LoginResponse | CurrentUserResponse;

interface IHandleUser {
    createAndSignInUser: (body: ICreateUserBody) => Promise<void>;
    signIn: (body: ILoginBody) => Promise<void>;
    signOut: () => void;
    getCurrentUser: () => Promise<void>;
    updateProfile: (body: IUpdateProfileBody) => Promise<void>;
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

    const getCurrentUser = async (): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const user = await currentUser(localStorageUser.token);

            if(user === null) setError(true);
            if(user && user.status === "error") setError(true);
            if(user && user.status === "success") setSuccess(true);

            setData(user);

        } catch(error) {
            console.log("Erro ao buscar usuário logado --> ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const updateProfile = async (body: IUpdateProfileBody): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const updateProfileResponse = await update(body, localStorageUser.token);

            if(updateProfileResponse === null) setError(true);
            if(updateProfileResponse && updateProfileResponse.status === "error") setError(true);

            if(updateProfileResponse && updateProfileResponse.status === "success") {
                if(updateProfileResponse.payload !== null) {
                    const updatedLocalStorageUser = {
                        token: localStorageUser.token,
                        name: updateProfileResponse.payload.name,
                        email: localStorageUser.email
                    }

                    localStorage.setItem("user", JSON.stringify(updatedLocalStorageUser));
                }
                setSuccess(true)
            };

            setData(updateProfileResponse);

        } catch(error) {
            console.log("Erro ao atualizar perfil de usuário --> ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const signOut = (): void => {
        localStorage.removeItem("user");
        setChanged((changed) => !changed);
    }

    const reset = (): void => {
        setData(null);
        setError(false);
        setSuccess(false);
    }

    return { 
        createAndSignInUser, 
        signIn, 
        signOut, 
        getCurrentUser,
        updateProfile,
        reset, 
        data, 
        loading, 
        error, 
        success 
    };
}