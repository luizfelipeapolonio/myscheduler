// CSS
import styles from "./Scheduler.module.css";

import { useDateToScheduleContext } from "../../context/Date/DateToSchedule";

interface SchedulerProps {
    monthDays: (number | string)[];
    today: number;
    month: string;
    year: number;
    OpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scheduler = ({ monthDays, today, month, year, OpenSidePanel }: SchedulerProps) => {
    const { setDate } = useDateToScheduleContext();

    const formatedDay = (day: number): string => {
        if(day < 10) {
            return `0${day}`;
        } else {
            return day.toString();
        }
    }

    const handleSchedule = (day: string | number): void => {
        if(typeof day === "string") return;

        OpenSidePanel(true);

        const date = {
            day: formatedDay(day),
            month,
            year
        }

        setDate(date);
    }

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
                    <li 
                        className={
                            `${today === day ? styles.today : ""} 
                             ${typeof day === "string" ?  styles.inactive : ""}`
                        }
                        key={crypto.randomUUID()}
                        onClick={() => handleSchedule(day)}
                    >
                        {day}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Scheduler;