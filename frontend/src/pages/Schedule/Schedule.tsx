// CSS
import styles from "./Schedule.module.css";

import MiniCalendar from "../../components/schedule/MiniCalendar";
import Scheduler from "../../components/schedule/Scheduler";

import { useEffect } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";
import { useHandleDate } from "../../hooks/useHandleDate";

const Schedule = () => {
    const { reset } = useHandleUser();
    const { getToday, previousMonth, nextMonth, month, year, monthDays, today } = useHandleDate();

    // const [month, setMonth] = useState<string>("");
    // const [year, setYear] = useState<number>(0);

    useEffect(() => {
        reset();
    }, []);

    return (
        <div className={styles.schedule_container}>
            <aside>
                <MiniCalendar />
            </aside>
            <main>
                <header className={styles.header_actions}>
                    <div className={styles.buttons}>
                        <button type="button" onClick={previousMonth}>{"<"}</button>
                        <button type="button" onClick={getToday}>Hoje</button>
                        <button type="button" onClick={nextMonth}>{">"}</button>
                    </div>
                    <span>{month} de {year}</span>
                </header>
                <Scheduler monthDays={monthDays} today={today} />
            </main>
        </div>
    );
}

export default Schedule;