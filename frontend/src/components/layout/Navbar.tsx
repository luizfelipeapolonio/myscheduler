// CSS
import styles from "./Navbar.module.css";

// Components
import AuthUser from "./AuthUser";

// Icons
import { 
    BsFillCalendarWeekFill, 
    BsFillPersonFill, 
    BsBoxArrowInRight, 
    BsPersonAdd, 
    BsBoxArrowLeft,
    BsPersonCircle,
    BsPersonFillExclamation 
} from "react-icons/bs";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";
import { useAuth } from "../../hooks/useAuth";

interface NavbarProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({ setState }: NavbarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const { signOut } = useHandleUser();
    const { authUser } = useAuth();

    const toggleDropdownMenu = (): void => setIsOpen((isOpen) => !isOpen);
    const closeDropdownMenu = (): void => setIsOpen(false);

    const logout = (): void => {
        signOut();
        closeDropdownMenu();
    }

    const openDeleteModal = (): void => {
        setState(true);
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
                        <AuthUser 
                            authUser={authUser}
                            type="default"
                            toggleDropdownMenu={toggleDropdownMenu} 
                        />
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
                    <>
                        <AuthUser authUser={authUser} type="full" align="center" />
                        <Link to="/user" onClick={closeDropdownMenu}>
                            <BsPersonCircle />
                            Editar Perfil
                        </Link>
                        <button onClick={openDeleteModal}>
                            <BsPersonFillExclamation />
                            <span>Excluir Conta</span>
                        </button>
                        <button onClick={logout}>
                            <BsBoxArrowLeft />
                            <span>Sair</span>
                        </button>
                    </>
                )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;