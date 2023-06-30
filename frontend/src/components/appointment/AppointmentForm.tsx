// CSS
import styles from "./AppointmentForm.module.css";

const AppointmentForm = () => {
    return (
        <div className={styles.appointmentForm_container}>
            <h2>Criar compromisso</h2>
            <p>Deixe agendado seus lembretes, eventos ou tarefas</p>
            <form>
                <input type="text" placeholder="Dê um título para o seu compromisso" />
                <fieldset className={styles.appointment_type}>
                    <legend>Tipo</legend>
                    <label>
                        <input name="type" type="radio" value="lembrete" />
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
                        <input name="priority" type="radio" value="media" />
                        <span>Média</span>
                    </label>
                    <label>
                        <input name="priority" type="radio" value="baixa" />
                        <span>Baixa</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_date}>
                    <legend>Data</legend>
                    <p>29 de Junho de 2023</p>
                        <label>
                            <input name="date" type="radio" value="default" />
                            <span>O dia inteiro</span>
                        </label>
                        <label>
                            <input name="date" type="radio" value="hour" />
                            <span>Adicionar horário</span>
                        </label>
                    <div className={styles.hour}>
                        <select>
                            <option value="default">Hora</option>
                            <option>12</option>
                            <option>13</option>
                        </select>
                        <select>
                            <option value="default">Minuto</option>
                        </select>
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