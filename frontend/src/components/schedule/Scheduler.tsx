// CSS
import styles from "./Scheduler.module.css";

// Components
import Loading from "../Loading";

// Types
import { IAppointment } from "../../types/shared.types";

// Hooks
import { useState, useEffect } from "react";
import { useHandleDate } from "../../hooks/useHandleDate";

// Context
import { useDateToScheduleContext } from "../../context/Date/DateToSchedule";
import { useAppointmentToEditContext } from "../../context/Appointment/AppointmentToEdit";

// Utils
import { extractDate } from "../../utils/extractDate";

interface SchedulerProps {
    monthDays: (number | string)[];
    today: number;
    month: string;
    year: number;
    appointments: IAppointment[];
    appointmentsLoading: boolean;
    OpenSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAppointmentForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAppointmentCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const Scheduler = ({ 
    monthDays, 
    today, 
    month, 
    year, 
    appointments, 
    appointmentsLoading, 
    OpenSidePanel,
    setShowAppointmentForm,
    setShowAppointmentCard
}: SchedulerProps) => {
    const [delayedMonthDays, setDelayedMonthDays] = useState<(string | number)[]>([]);
    
    const { setDate } = useDateToScheduleContext();
    const { setAppointmentToEdit } = useAppointmentToEditContext();

    const { getMonthNameByNumber } = useHandleDate();

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
        setShowAppointmentForm(true);

        const date = {
            day: formatedDay(day),
            month,
            year
        }

        setDate(date);
    }

    const handleEdit = (e: React.MouseEvent<HTMLParagraphElement>, appointment: IAppointment): void => {
        e.stopPropagation();
        
        OpenSidePanel(true);
        setAppointmentToEdit(appointment);
        setShowAppointmentCard(true);

        const monthNumber: string = extractDate(appointment, "month");

        const day: string = extractDate(appointment, "day");
        const month: string = getMonthNameByNumber(monthNumber);
        const year: number = parseInt(extractDate(appointment, "year"));

        const date = {
            day,
            month,
            year
        }

        setDate(date);
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
            <div className={styles.week_days}>
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
                                typeof day === "number" && formatedDay(day) === extractDate(appointment, "day") && (
                                    <p 
                                        key={appointment.id} 
                                        className={`${styles[appointment.priority]}`}
                                        onClick={(e) => handleEdit(e, appointment)}
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