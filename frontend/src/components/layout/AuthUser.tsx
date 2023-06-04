// CSS
import styles from "./AuthUser.module.css";

// Types
import { ISignedUser } from "../../types/user.types";

interface AuthUserProps {
    authUser: ISignedUser | null;
    type: "default" | "full";
    toggleDropdownMenu?: () => void;
    align?: "center";
}

const AuthUser = ({ authUser, type, toggleDropdownMenu, align }: AuthUserProps) => {
    return (
        <div className={styles.signed_container}>
            {authUser && (
                <>
                    <div 
                        className={styles.signed_user} 
                        onClick={toggleDropdownMenu}
                        style={{ margin: align ? "0 auto" : "" }}
                    >
                        <p>{authUser.name.split("")[0].toUpperCase()}</p>
                    </div>
                    {type === "full" ? (
                        <div className={styles.signed_full}>
                            <p>{authUser.name}</p>
                            <p>{authUser.email}</p>
                        </div>
                    ) :  null}
                </>
            )}
        </div>
    );
}

export default AuthUser;