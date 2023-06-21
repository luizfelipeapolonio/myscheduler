// CSS
import styles from "./MiniCalendar.module.css";

import { useHandleDate } from "../../hooks/useHandleDate";

const MiniCalendar = () => {
    const { nextMonth, previousMonth, month, year, monthDays, today } = useHandleDate();

    return (
        <div className={styles.miniCalendar_container}>
            <header>
                <span>{month} de {year}</span>
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
                        className={
                            `${today === day ? styles.today : ""} 
                             ${typeof day === "string" ?  styles.inactive : ""}`
                        } 
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