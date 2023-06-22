// CSS
import styles from "./Schedule.module.css";

import MiniCalendar from "../../components/schedule/MiniCalendar";
import Scheduler from "../../components/schedule/Scheduler";

import { useEffect } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";

const Schedule = () => {
    const { reset } = useHandleUser();

    useEffect(() => {
        reset();
    }, []);

    return (
        <div className={styles.schedule_container}>
            <aside>
                <MiniCalendar />
            </aside>
            <main>
                <Scheduler />
            </main>
        </div>
    );
}

export default Schedule;