// CSS
import styles from "./Root.module.css";

// Components
import Navbar from "./Navbar";

import { Outlet, ScrollRestoration } from "react-router-dom";

const Root = () => {
    return (
        <>
            <Navbar />
            <main className={styles.main}>
                <Outlet />
                <ScrollRestoration />
            </main>
        </>
    );
}

export default Root;