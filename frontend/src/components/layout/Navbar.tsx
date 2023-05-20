// CSS
import styles from "./Navbar.module.css";

import { BsFillCalendarWeekFill, BsFillPersonFill, BsBoxArrowInRight, BsPersonAdd } from "react-icons/bs";

import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <BsFillCalendarWeekFill />
                <h1>myScheduler</h1>
            </div>
            <div className={styles.dropdown}>
                <div className={styles.user_container}>
                    <div className={styles.user}>
                        <BsFillPersonFill />
                    </div>
                </div>
                <div className={styles.dropdown_menu}>
                    <Link to="/login">
                        <BsBoxArrowInRight />
                        <span>Entrar</span>
                    </Link>
                    <Link to="#">
                        <BsPersonAdd />
                        <span>Cadastrar</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;