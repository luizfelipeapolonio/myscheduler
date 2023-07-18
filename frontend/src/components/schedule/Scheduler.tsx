// CSS
import styles from "./Scheduler.module.css";

// Components
import Loading from "../Loading";

// Types
import { IAppointment } from "../../types/shared.types";

import { useState, useEffect } from "react";

import { useDateToScheduleContext } from "../../context/Date/DateToSchedule";

interface SchedulerProps {
    monthDays: (number | string)[];
    today: number;
    month: string;
    year: number;
    appointments: IAppointment[];
    appointmentsLoading: boolean;
    OpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scheduler = ({ monthDays, today, month, year, appointments, appointmentsLoading, OpenSidePanel }: SchedulerProps) => {
    const [delayedMonthDays, setDelayedMonthDays] = useState<(string | number)[]>([]);
    
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

    const extractDay = (appointment: IAppointment): string => {
        return appointment.date.toString().split("T")[0].split("-")[2];
    }

    useEffect(() => {
        if(monthDays.length > 0) {
            const delay = setTimeout(() => setDelayedMonthDays(monthDays), 500);

            return () => clearTimeout(delay);
        }
    }, [monthDays, month]);

    useEffect(() => setDelayedMonthDays([]), [month]);

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
            {appointmentsLoading || delayedMonthDays.length === 0 ? <Loading type="default" /> : (
                <ul>
                    {delayedMonthDays.map((day) => (
                        <li 
                            className={
                                `${today === day ? styles.today : ""} 
                                ${typeof day === "string" ?  styles.inactive : ""}`
                            }
                            key={crypto.randomUUID()}
                            onClick={() => handleSchedule(day)}
                        >
                            <span>{day}</span>
                            {appointments.length > 0 && appointments.map((appointment) => (
                                typeof day === "number" && formatedDay(day) === extractDay(appointment) && (
                                    <p 
                                        key={appointment.id} 
                                        className={`${styles[appointment.priority]}`}
                                    >
                                        {appointment.title}
                                    </p>
                                )
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Scheduler;