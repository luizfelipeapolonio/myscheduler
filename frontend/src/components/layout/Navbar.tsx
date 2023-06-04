// CSS
import styles from "./Navbar.module.css";

// Icons
import { 
    BsFillCalendarWeekFill, 
    BsFillPersonFill, 
    BsBoxArrowInRight, 
    BsPersonAdd, 
    BsBoxArrowLeft 
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { signOut } = useHandleUser();
    const { authUser } = useAuth();

    const toggleDropdownMenu = (): void => setIsOpen((isOpen) => !isOpen);
    const closeDropdownMenu = (): void => setIsOpen(false);

    const logout = (): void => {
        signOut();
        closeDropdownMenu();
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <BsFillCalendarWeekFill />
                <h1>myScheduler</h1>
            </div>
            <div className={styles.dropdown}>
                <div className={`${styles.user_container} ${isOpen ? styles.active_menu : ""}`}>
                    {!authUser ? (
                        <div className={styles.user} onClick={toggleDropdownMenu}>
                            <BsFillPersonFill />
                        </div>
                    ) : (
                        <div className={`${styles.user} ${styles.signed_user}`} onClick={toggleDropdownMenu}>
                            {authUser.name.split("")[0].toUpperCase()}
                        </div>
                    )}
                </div>
                <div className={`${styles.dropdown_menu} ${isOpen ? styles.open : ""}`}>
                {!authUser ? (
                    <>
                        <Link to="/login" onClick={closeDropdownMenu}>
                            <BsBoxArrowInRight />
                            <span>Entrar</span>
                        </Link>
                        <Link to="/register" onClick={closeDropdownMenu}>
                            <BsPersonAdd />
                            <span>Cadastrar</span>
                        </Link>
                    </>
                ) : (
                    <button onClick={logout}>
                        <BsBoxArrowLeft />
                        <span>Sair</span>
                    </button>
                )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;