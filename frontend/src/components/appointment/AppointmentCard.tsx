// CSS
import styles from "./AppointmentCard.module.css";

// Icons
import { BsArrowDownUp, BsCalendarWeek } from "react-icons/bs";
import { FaListCheck, FaAlignJustify, FaRegClock } from "react-icons/fa6";

// Types
import { IAppointment } from "../../types/shared.types";

import { useHandleDate } from "../../hooks/useHandleDate";

interface AppointmentCardProps {
    appointment: IAppointment;
}

const AppointmentCard = ({ appointment }: AppointmentCardProps) => {
    const { getMonthNameByNumber } = useHandleDate();

    const monthNumber: string = appointment.date.toString().split("T")[0].split("-")[1];
    const day: string = appointment.date.toString().split("T")[0].split("-")[2];
    const year: string = appointment.date.toString().split("T")[0].split("-")[0];

    const formatedDate: string = `${day} de ${getMonthNameByNumber(monthNumber)} de ${year}`;

    return (
        <div className={styles.appointmentCard_container}>
            <div className={styles.info}>
                <h2>{appointment.title}</h2>
                <div className={styles.type}>
                    <FaListCheck />
                    <span>Tipo: </span>
                    <p>{appointment.type}</p>
                </div>
                <div className={styles.priority}>
                    <BsArrowDownUp />
                    <span>Prioridade: </span>
                    <span className={styles[appointment.priority]}></span>
                    <p>{appointment.priority}</p>
                </div>
                <div className={styles.date}>
                    <BsCalendarWeek />
                    <span>Data: </span>
                    <p>{formatedDate}</p>
                </div>
                {appointment.time && (
                    <div className={styles.time}>
                        <FaRegClock />
                        <span>Horário: </span>
                        <p>{appointment.time}</p>
                    </div>
                )}
                {appointment.description && (
                    <div className={styles.description}>
                        <FaAlignJustify />
                        <span>Descrição: </span>
                        <p>{appointment.description}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AppointmentCard;