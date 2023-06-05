// Types
import { ISignedUser } from "../types/user.types";

import { useState, useEffect } from "react";
import { useAuthContext } from "../context/Auth/AuthContext";

// Utils
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";

export interface IUseAuth {
    authUser: ISignedUser | null;
    loading: boolean;
}

export function useAuth(): IUseAuth {
    const [authUser, setAuthUser] = useState<ISignedUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const context = useAuthContext();

    useEffect(() => {
        const signedUser: ISignedUser | null = getUserFromLocalStorage();
        setAuthUser(signedUser);
        
        setLoading(false);
    }, [context]);

    return { authUser, loading };
}
