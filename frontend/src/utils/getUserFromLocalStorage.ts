import { ISignedUser } from "../types/user.types";

export const getUserFromLocalStorage = (): ISignedUser | null => {
    const getUser: string | null = localStorage.getItem("user");
    const signedUser: ISignedUser | null = getUser ? JSON.parse(getUser) : null;

    return signedUser;
}