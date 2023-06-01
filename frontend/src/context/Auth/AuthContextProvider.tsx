import { useState, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface ChildrenProp {
    children?: ReactNode;
}

export const AuthContextProvider = ({ children }: ChildrenProp) => {
    const [changed, setChanged] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ changed, setChanged }}>
            {children}
        </AuthContext.Provider>
    );
}