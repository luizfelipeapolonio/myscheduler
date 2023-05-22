// CSS
import styles from "./Navbar.module.css";

// Icons
import { BsFillCalendarWeekFill, BsFillPersonFill, BsBoxArrowInRight, BsPersonAdd } from "react-icons/bs";

import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdownMenu = (): void => setIsOpen((isOpen) => !isOpen);
    const closeDropdownMenu = (): void => setIsOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <BsFillCalendarWeekFill />
                <h1>myScheduler</h1>
            </div>
            <div className={styles.dropdown}>
                <div className={`${styles.user_container} ${isOpen ? styles.active_menu : ""}`}>
                    <div className={styles.user} onClick={toggleDropdownMenu}>
                        <BsFillPersonFill />
                    </div>
                </div>
                <div className={`${styles.dropdown_menu} ${isOpen ? styles.open : ""}`}>
                    <Link to="/login" onClick={closeDropdownMenu}>
                        <BsBoxArrowInRight />
                        <span>Entrar</span>
                    </Link>
                    <Link to="/register" onClick={closeDropdownMenu}>
                        <BsPersonAdd />
                        <span>Cadastrar</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;