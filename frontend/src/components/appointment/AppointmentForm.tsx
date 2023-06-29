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
                        <input name="lembrete" type="radio" value="lembrete" />
                        <span>Lembrete</span>
                    </label>
                    <label>
                        <input name="tarefa" type="radio" value="tarefa" />
                        <span>Tarefa</span>
                    </label>
                    <label>
                        <input name="evento" type="radio" value="evento" />
                        <span>Evento</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_priority}>
                    <legend>Prioridade</legend>
                    <label>
                        <input name="alta" type="radio" value="alta" />
                        <span>Alta</span>
                    </label>
                    <label>
                        <input name="media" type="radio" value="media" />
                        <span>Média</span>
                    </label>
                    <label>
                        <input name="baixa" type="radio" value="baixa" />
                        <span>Baixa</span>
                    </label>
                </fieldset>
                <fieldset className={styles.appointment_date}>
                    <legend>Data</legend>
                    <span>29 de Junho de 2023</span>
                    <label>
                        <input name="all-day" type="radio" value="default" />
                        <span>O dia inteiro</span>
                    </label>
                    <label>
                        <input name="add-hour" type="radio" value="hour" />
                        <span>Adicionar horário</span>
                    </label>
                    <select>
                        <option value="default">Hora</option>
                    </select>
                    <select>
                        <option value="default">Minuto</option>
                    </select>
                </fieldset>
                <textarea 
                    rows={8} 
                    placeholder="Adicione uma descrição para o seu compromisso..." 
                />
                <input type="submit" value="Agendar compromisso" />
            </form>
        </div>
    );
}

export default AppointmentForm;