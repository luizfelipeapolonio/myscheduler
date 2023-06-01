import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface IAuthContextData {
    changed: boolean;
    setChanged: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = createContext<IAuthContextData>(null!);

export const useAuthContext = (): IAuthContextData => {
    return useContext(AuthContext);
}