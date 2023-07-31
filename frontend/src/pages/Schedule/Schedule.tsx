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

import { useAppointmentStatusContext } from "../../context/Appointment/AppointmentStatus";

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
    const { getAppointmentsByDate, data, loading } = useHandleAppointment();

    const { created, edited, deleted, setCreated, setEdited, setDeleted } = useAppointmentStatusContext();

    const [appointments, setAppointments] = useState<IAppointment[]>([]);
    const [goToMonth, setGoToMonth] = useState<string>("");
    const [goToYear, setGoToYear] = useState<number>(0);
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
    const [showAppointmentForm, setShowAppointmentForm] = useState<boolean>(false);
    const [showAppointmentCard, setShowAppointmentCard] = useState<boolean>(false);

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
    }, [month]);

    useEffect(() => {
        if(data) {
            if(data.status === "success" && data.payload !== null) {
                setAppointments(data.payload as IAppointment[]);
            }
        }
    }, [data]);

    useEffect(() => {
        if(edited) {
            getAppointmentsByDate({ 
                monthNumber: getMonthNumberByName(month), 
                year:  year.toString()
            });

            setEdited(false);
        }

        if(created) {
            getAppointmentsByDate({ 
                monthNumber: getMonthNumberByName(month), 
                year:  year.toString()
            });

            setCreated(false);
        }

        if(deleted) {
            getAppointmentsByDate({
                monthNumber: getMonthNumberByName(month), 
                year:  year.toString()
            });

            setDeleted(false);
        }

    }, [created, edited, deleted]);

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
                    setShowAppointmentForm={setShowAppointmentForm}
                    setShowAppointmentCard={setShowAppointmentCard}
                />
            </main>
            {isSidePanelOpen && (
                <SidePanel 
                    showAppointmentForm={showAppointmentForm}
                    showAppointmentCard={showAppointmentCard}
                    setShowAppointmentForm={setShowAppointmentForm}
                    setShowAppointmentCard={setShowAppointmentCard}
                    closePanel={setIsSidePanelOpen} 
                />
            )}
        </div>
    );
}

export default Schedule;