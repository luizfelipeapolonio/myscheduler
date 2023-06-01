// Types
import { ISignedUser } from "../types/user.types";

import { useState, useEffect } from "react";

import { useAuthContext } from "../context/Auth/AuthContext";

export interface IUseAuth {
    authUser: ISignedUser | null;
    loading: boolean;
}

export function useAuth(): IUseAuth {
    const [authUser, setAuthUser] = useState<ISignedUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const context = useAuthContext();

    useEffect(() => {
        const getUserFromLocalStorage = (): void => {
            const getUser: string | null = localStorage.getItem("user");
            const signedUser: ISignedUser | null = getUser ? JSON.parse(getUser) : null;
        
            setAuthUser(signedUser);
        }
       
        getUserFromLocalStorage(); 
        setLoading(false);
    }, [context]);

    return { authUser, loading };
}
