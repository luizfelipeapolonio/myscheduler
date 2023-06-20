// CSS
import styles from "./MiniCalendar.module.css";

import { useHandleDate } from "../../hooks/useHandleDate";

const MiniCalendar = () => {
    const { nextMonth, previousMonth, month, year, monthDays, today } = useHandleDate();

    // console.log("MÊS: ", month);
    // console.log("ANO: ", year);
    // console.log("DIAS: ", monthDays);
    console.log("HOJE: ", today);

    return (
        <div className={styles.miniCalendar_container}>
            <header>
                <div className={styles.month_year}>
                    <span>{month}</span>
                    <span>{year}</span>
                </div>
                <div className={styles.actions}>
                    <button type="button" onClick={previousMonth}>{"<"}</button>
                    <button type="button" onClick={nextMonth}>{">"}</button>
                </div>
            </header>
            <ul>
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
                {monthDays.map((day) => (
                    <li 
                        className={today === day ? `${styles.today}` : ""} 
                        key={crypto.randomUUID()}
                    >
                        {day}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MiniCalendar;