// CSS
import styles from "./Schedule.module.css";

// Components
import MiniCalendar from "../../components/schedule/MiniCalendar";
import Scheduler from "../../components/schedule/Scheduler";
import SidePanel from "../../components/schedule/SidePanel";

import { useEffect, useState } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";
import { useHandleDate } from "../../hooks/useHandleDate";

const Schedule = () => {
    const { reset } = useHandleUser();
    const { getToday, goToDate, previousMonth, nextMonth, month, year, monthDays, today } = useHandleDate();

    const [goToMonth, setGoToMonth] = useState<string>("");
    const [goToYear, setGoToYear] = useState<number>(0);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    useEffect(() => {
        reset();
    }, []);

    useEffect(() => {
        if(goToMonth.length > 0 && goToYear !== 0) {
            goToDate(goToMonth, goToYear);
        }
    }, [goToMonth, goToYear]);

    return (
        <div className={styles.schedule_container}>
            <aside>
                <MiniCalendar setMonth={setGoToMonth} setYear={setGoToYear} />
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
                <Scheduler 
                    monthDays={monthDays} 
                    today={today}
                    month={month}
                    year={year}
                    OpenSidePanel={setIsSidePanelOpen} 
                />
            </main>
            {isSidePanelOpen && (
                <SidePanel closePanel={setIsSidePanelOpen} />
            )}
        </div>
    );
}

export default Schedule;