// CSS
import styles from "./Scheduler.module.css";

import { useHandleDate } from "../../hooks/useHandleDate";

const Scheduler = () => {
    const { monthDays } = useHandleDate();

    return (
        <div className={styles.scheduler_container}>
            <div>
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
            </div>
            <ul>
                {monthDays.map((day) => (
                    <li key={crypto.randomUUID()}>{day}</li>
                ))}
            </ul>
        </div>
    );
}

export default Scheduler;