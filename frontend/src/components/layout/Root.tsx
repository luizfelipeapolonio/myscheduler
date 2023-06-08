// CSS
import styles from "./Root.module.css";

// Components
import Navbar from "./Navbar";
import DeleteModal from "../DeleteModal";

import { Outlet, ScrollRestoration } from "react-router-dom";
import { useState } from "react";

const Root = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <>  
            {isOpen && <DeleteModal setState={setIsOpen} />}
            <Navbar setState={setIsOpen} />
            <main className={styles.main}>
                <Outlet />
                <ScrollRestoration />
            </main>
        </>
    );
}

export default Root;