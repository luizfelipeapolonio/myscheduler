// CSS
import styles from "./Schedule.module.css";

// Components
import MiniCalendar from "../../components/schedule/MiniCalendar";
import Scheduler from "../../components/schedule/Scheduler";
import SidePanel from "../../components/schedule/SidePanel";

// Types
import { IAppointment } from "../../types/shared.types";

import { useEffect, useState } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";
import { useHandleDate } from "../../hooks/useHandleDate";
import { useHandleAppointment } from "../../hooks/useHandleAppointment";

const Schedule = () => {
    const { reset } = useHandleUser();
    const {
        getToday, 
        goToDate, 
        previousMonth, 
        nextMonth, 
        getMonthNumberByName, 
        month, 
        year, 
        monthDays, 
        today 
    } = useHandleDate();
    const { getAppointmentsByDate, data, reset: resetAppointments, loading } = useHandleAppointment();

    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [goToMonth, setGoToMonth] = useState<string>("");
    const [goToYear, setGoToYear] = useState<number>(0);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);

    useEffect(() => {
        reset();
    }, []);

    // Go to a specific month by clicking on the mini calendar
    useEffect(() => {
        if(goToMonth.length > 0 && goToYear !== 0) {
            goToDate(goToMonth, goToYear);
        }
    }, [goToMonth, goToYear]);

    useEffect(() => {
       if(month) {
            getAppointmentsByDate({ 
                monthNumber: getMonthNumberByName(month), 
                year:  year.toString()
            });
        }

        resetAppointments();
        setAppointments([]);
    }, [month]);

    useEffect(() => {
        if(data) {
            if(data.status === "success" && data.payload !== null) {
                setAppointments(data.payload as IAppointment[]);
            }
        }
    }, [data]);

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
                    appointments={appointments}
                    appointmentsLoading={loading}
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