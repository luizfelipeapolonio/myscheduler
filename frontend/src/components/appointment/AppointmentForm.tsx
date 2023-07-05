// CSS
import styles from "./AppointmentForm.module.css";

// Icons
import { FaAngleDown } from "react-icons/fa6";

import { useState } from "react";

import { useDateToScheduleContext } from "../../context/Date/DateToSchedule";

const AppointmentForm = () => {
    const [hour, setHour] = useState<string>("");
    const [minute, setMinute] = useState<string>("");
    const [isHourOpen, setIsHourOpen] = useState<boolean>(false);
    const [isMinuteOpen, setIsMinuteOpen] = useState<boolean>(false);

    const toggleHourSelect = (): void => setIsHourOpen((isOpen) => !isOpen);
    const toggleMinuteSelect = (): void => setIsMinuteOpen((isOpen) => !isOpen);

    const { date } = useDateToScheduleContext();

    const handleHour = (e: React.MouseEvent<HTMLSpanElement>): void => {
        if(e.currentTarget.id === "hour") {
            setHour(e.currentTarget.innerText);
        } else {
            setMinute(e.currentTarget.innerText);
        }
    }

    const generateSelectHours = (): JSX.Element[] => {
        const hoursArray: number[] = [];

        for(let i = 0; i <= 23; i++) {
            hoursArray.push(i);
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

    return (
        <div className={styles.appointmentForm_container}>
            <h2>Criar compromisso</h2>
            <p>Deixe agendado seus lembretes, eventos ou tarefas</p>
            <form>
                <input type="text" placeholder="Dê um título para o seu compromisso" />
                <fieldset className={styles.appointment_type}>
                    <legend>Tipo</legend>
                    <label>
                        <input name="type" type="radio" value="lembrete" defaultChecked />
                        <span>Lembrete</span>
                    </label>
                    <label>
                        <input name="type" type="radio" value="tarefa" />
                        <span>Tarefa</span>
                    </label>
                    <label>
                        <input name="type" type="radio" value="evento" />
                        <span>Evento</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_priority}>
                    <legend>Prioridade</legend>
                    <label>
                        <input name="priority" type="radio" value="alta" />
                        <span>Alta</span>
                    </label>
                    <label>
                        <input name="priority" type="radio" value="media" defaultChecked />
                        <span>Média</span>
                    </label>
                    <label>
                        <input name="priority" type="radio" value="baixa" />
                        <span>Baixa</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_date}>
                    <legend>Data</legend>
                        {date && <p>{date.day} de {date.month} de {date.year}</p>}
                        <label>
                            <input name="date" type="radio" value="default" defaultChecked />
                            <span>O dia inteiro</span>
                        </label>
                        <label>
                            <input name="date" type="radio" value="hour" />
                            <span>Adicionar horário</span>
                        </label>
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
                </fieldset>
                <textarea 
                    rows={4} 
                    placeholder="Adicione uma descrição para o seu compromisso..." 
                />
                <input type="submit" value="Agendar compromisso" />
            </form>
        </div>
    );
}

export default AppointmentForm;