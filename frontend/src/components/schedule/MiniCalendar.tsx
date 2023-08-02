// CSS
import styles from "./MiniCalendar.module.css";

import { useHandleDate } from "../../hooks/useHandleDate";

interface MiniCalendarProps {
    setMonth: React.Dispatch<React.SetStateAction<string>>;
    setYear: React.Dispatch<React.SetStateAction<number>>;
}

const MiniCalendar = ({ setMonth, setYear }: MiniCalendarProps) => {
    const {  getToday, nextMonth, previousMonth, month, year, monthDays, today } = useHandleDate();

    const goToDate = (): void => {
        setMonth(month);
        setYear(year);
    }

    return (
        <div className={styles.miniCalendar_container}>
            <header>
                {!month || !year ? 
                    <span>Carregando...</span> : 
                    <span>{month} de {year}</span>
                }
                <div className={styles.actions}>
                    <button type="button" onClick={getToday}>Hoje</button>
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
                        onClick={goToDate}
                    >
                        {day}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MiniCalendar;