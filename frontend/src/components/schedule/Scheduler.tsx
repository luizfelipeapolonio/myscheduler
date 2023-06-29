// CSS
import styles from "./Scheduler.module.css";

interface SchedulerProps {
    monthDays: (number | string)[];
    today: number;
    OpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scheduler = ({ monthDays, today, OpenSidePanel }: SchedulerProps) => {
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
                        onClick={typeof day === "number" ? () => OpenSidePanel(true) : undefined}
                    >
                        {day}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Scheduler;