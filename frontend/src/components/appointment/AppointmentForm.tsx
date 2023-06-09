// CSS
import styles from "./AppointmentForm.module.css";

// Icons
import { FaAngleDown } from "react-icons/fa6";

// Components
import FlashMessage from "../FlashMessage";

import { ICreateAppointmentBody } from "../../types/appointment.types";

import { useState, useEffect } from "react";
import { useHandleDate } from "../../hooks/useHandleDate";
import { useHandleAppointment } from "../../hooks/useHandleAppointment";

// Context
import { useDateToScheduleContext } from "../../context/Date/DateToSchedule";

import { extractValidationMessages } from "../../utils/extractValidationMessages";

type AppointmentType = "lembrete" | "tarefa" | "evento";
type AppointmentPriority = "alta" | "media" | "baixa";
type AppointmentDate = "default" | "hour";

const AppointmentForm = () => {
    const [appointmentTitle, setAppointmentTitle] = useState<string>("");
    const [appointmentType, setAppointmentType] = useState<AppointmentType>("lembrete");
    const [appointmentPriority, setAppointmentPriority] = useState<AppointmentPriority>("media");
    const [appointmentDate, setAppointmentDate] = useState<AppointmentDate>("default");
    const [appointmentDescription, setAppointmentDescription] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");
    const [isHourOpen, setIsHourOpen] = useState<boolean>(false);
    const [isMinuteOpen, setIsMinuteOpen] = useState<boolean>(false);

    const toggleHourSelect = (): void => setIsHourOpen((isOpen) => !isOpen);
    const toggleMinuteSelect = (): void => setIsMinuteOpen((isOpen) => !isOpen);

    const { date } = useDateToScheduleContext();
    const { getMonthNumberByName } = useHandleDate();
    const { createAppointment, reset, data, loading, success, error } = useHandleAppointment();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        if(date === null) return;

        reset();

        const appointment: ICreateAppointmentBody = {
            title: appointmentTitle,
            type: appointmentType,
            priority: appointmentPriority,
            date: {
                day: date.day,
                month: getMonthNumberByName(date.month),
                year: date.year.toString()
            },
            time: appointmentDate === "hour" ? { hour, minute } : undefined,
            description: appointmentDescription ? appointmentDescription : undefined
        }

        await createAppointment(appointment);
    }

    const handleRadioButton = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if(e.target.name === "type") {
            setAppointmentType(e.target.value as AppointmentType);
        } else if(e.target.name === "priority") {
            setAppointmentPriority(e.target.value as AppointmentPriority);
        } else {
            setAppointmentDate(e.target.value as AppointmentDate);
        }
    }

    const handleHour = (e: React.MouseEvent<HTMLSpanElement>): void => {
        if(e.currentTarget.id === "hour") {
            setHour(e.currentTarget.innerText);
        } else {
            setMinute(e.currentTarget.innerText);
        }
    }

    const generateSelectHours = (): JSX.Element[] => {
        const hoursArray: string[] = [];

        for(let i = 0; i <= 23; i++) {
            if(i < 10) {
                hoursArray.push(`0${i}`);
            } else {
                hoursArray.push(i.toString());
            }
        }

        return hoursArray.map((hour) => (
            <span key={hour} id="hour" onClick={handleHour}>
                {hour}
            </span>
        ));
    }

    const generateSelectMinutes = (): JSX.Element[] => {
        const minutesArray: string[] = [];

        for(let i = 0; i <= 59; i++) {
            if(i < 10) {
                minutesArray.push(`0${i}`);
            } else {
                minutesArray.push(i.toString());
            }
        }

        return minutesArray.map((minute) => (
            <span key={minute} id="minute" onClick={handleHour}>
                {minute}
            </span>
        ));
    }

    useEffect(() => {
        if(data) {
            const extractedMessages: string[] | null = extractValidationMessages(data);

            if(extractedMessages !== null) {
                setMessage(extractedMessages[0]);
            }

            if(!data.message.includes("validação")){
                setMessage(data.message);
            }
        }

        if(!data && error) {
            setMessage("Ocorreu um erro! Por favor, tente mais tarde!");
        }

    }, [data, error]);

    useEffect(() => {
        if(message) {
            const timer: number = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div className={styles.appointmentForm_container}>
            <h2>Criar compromisso</h2>
            <p>Deixe agendado seus lembretes, eventos ou tarefas</p>
            {message && (
                <FlashMessage 
                    message={message} 
                    type={success ? "success" :  "error"}
                    marginTop="1rem"
                />
            )}
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Dê um título para o seu compromisso"
                    onChange={(e) => setAppointmentTitle(e.target.value)}
                />
                <fieldset className={styles.appointment_type}>
                    <legend>Tipo</legend>
                    <label>
                        <input 
                            name="type" 
                            type="radio" 
                            value="lembrete" 
                            onChange={handleRadioButton} 
                            defaultChecked 
                        />
                        <span>Lembrete</span>
                    </label>
                    <label>
                        <input 
                            name="type" 
                            type="radio" 
                            value="tarefa" 
                            onChange={handleRadioButton} 
                        />
                        <span>Tarefa</span>
                    </label>
                    <label>
                        <input 
                            name="type" 
                            type="radio" 
                            value="evento"
                            onChange={handleRadioButton}
                        />
                        <span>Evento</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_priority}>
                    <legend>Prioridade</legend>
                    <label>
                        <input 
                            name="priority" 
                            type="radio" 
                            value="alta" 
                            onChange={handleRadioButton}
                        />
                        <span>Alta</span>
                    </label>
                    <label>
                        <input 
                            name="priority" 
                            type="radio" 
                            value="media"
                            onChange={handleRadioButton}
                            defaultChecked 
                        />
                        <span>Média</span>
                    </label>
                    <label>
                        <input 
                            name="priority" 
                            type="radio" 
                            value="baixa"
                            onChange={handleRadioButton}
                        />
                        <span>Baixa</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_date}>
                    <legend>Data</legend>
                        {date && <p>{date.day} de {date.month} de {date.year}</p>}
                        <label>
                            <input 
                                name="date" 
                                type="radio" 
                                value="default"
                                onChange={handleRadioButton} 
                                defaultChecked 
                            />
                            <span>O dia inteiro</span>
                        </label>
                        <label>
                            <input 
                                name="date" 
                                type="radio" 
                                value="hour"
                                onChange={handleRadioButton}
                            />
                            <span>Adicionar horário</span>
                        </label>
                    {appointmentDate === "hour" && (
                        <div className={styles.hour}>
                            <div 
                                tabIndex={0} 
                                className={styles.select} 
                                onClick={toggleHourSelect} 
                                onBlur={() => setIsHourOpen(false)}
                            >
                                {hour && <span>{hour} <FaAngleDown /></span>} 
                                {!hour && <p>Hora <FaAngleDown /></p>}
                                <div className={`${styles.dropdown_select} ${isHourOpen ? styles.open : ""}`}>
                                    {generateSelectHours()}
                                </div>
                            </div>
                            <div
                                tabIndex={0}
                                className={styles.select} 
                                onClick={toggleMinuteSelect} 
                                onBlur={() => setIsMinuteOpen(false)}
                            >
                                {minute && <span>{minute} <FaAngleDown /></span>} 
                                {!minute && <p>Minuto <FaAngleDown /></p>}
                                <div className={`${styles.dropdown_select} ${isMinuteOpen ? styles.open : ""}`}>
                                    {generateSelectMinutes()}
                                </div>
                            </div>
                        </div>
                    )}
                </fieldset>
                <textarea 
                    rows={4} 
                    placeholder="Adicione uma descrição para o seu compromisso..."
                    onChange={(e) => setAppointmentDescription(e.target.value)}
                />
                {loading && <input type="submit" value="Aguarde..." disabled />}
                {!loading && <input type="submit" value="Agendar compromisso" />}
            </form>
        </div>
    );
}

export default AppointmentForm;