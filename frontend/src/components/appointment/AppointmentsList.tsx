// CSS
import styles from "./AppointmentsList.module.css";

import { IAppointment } from "../../types/shared.types";

import { useState, useEffect } from "react";
import { useHandleAppointment } from "../../hooks/useHandleAppointment";

// Context
import { useAppointmentToEditContext } from "../../context/Appointment/AppointmentToEdit";
import { useAppointmentStatusContext } from "../../context/Appointment/AppointmentStatus";

interface AppointmentsListProps {
    setShowSidePanel: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAppointmentCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppointmentsList = ({ setShowSidePanel, setShowAppointmentCard }: AppointmentsListProps) => {
    const [allAppointments, setAllAppointments] = useState<IAppointment[] | null>(null);

    const { getAllAppointments, data } = useHandleAppointment();
    const { setAppointmentToEdit } = useAppointmentToEditContext();
    const { created, edited, deleted } = useAppointmentStatusContext();

    useEffect(() => { getAllAppointments() }, []);

    useEffect(() => {
        if(data) {
            if(data.payload && data.status === "success") {
                setAllAppointments(data.payload as IAppointment[]);
            }
        }
    }, [data]);

    useEffect(() => {
        if(created) getAllAppointments();
        if(edited) getAllAppointments();
        if(deleted) getAllAppointments();
    }, [created, edited, deleted]);

    const showAppointment = (appointment: IAppointment): void => {
        setAppointmentToEdit(appointment);
        setShowSidePanel(true);
        setShowAppointmentCard(true);
    }

    return (
        <div className={styles.appointmentsList_container}>
            <h1>Todos os compromissos:</h1>
            {allAppointments && allAppointments.length === 0 && 
                <p className={styles.no_appointments}>Ainda não há compromissos</p>
            }
            {allAppointments && (
                <div className={styles.appointments}>
                    {allAppointments.map((appointment) => (
                        <p 
                            key={appointment.id} 
                            className={styles[appointment.priority]}
                            onClick={() => showAppointment(appointment)}
                        >
                            {appointment.title}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}

export default AppointmentsList;