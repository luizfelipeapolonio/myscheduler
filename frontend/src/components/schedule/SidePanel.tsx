// CSS
import styles from "./SidePanel.module.css";

// Icons
import { FaXmark } from "react-icons/fa6";

// Components
import AppointmentForm from "../appointment/AppointmentForm";
import AppointmentCard from "../appointment/AppointmentCard";

import { useHandleAppointment } from "../../hooks/useHandleAppointment";

import { useAppointmentToEditContext } from "../../context/Appointment/AppointmentToEdit";
import { useAppointmentStatusContext } from "../../context/Appointment/AppointmentStatus";

interface SidePanelProps {
    showAppointmentForm: boolean;
    showAppointmentCard: boolean;
    setShowAppointmentForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAppointmentCard: React.Dispatch<React.SetStateAction<boolean>>;
    closePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidePanel = ({ 
    showAppointmentForm, 
    showAppointmentCard, 
    setShowAppointmentForm, 
    setShowAppointmentCard,
    closePanel 
}: SidePanelProps) => {
    const { appointmentToEdit, setAppointmentToEdit } = useAppointmentToEditContext();
    const { setDeleted } = useAppointmentStatusContext();

    const { deleteAppointment } = useHandleAppointment();

    const toggleEditForm = (): void => setShowAppointmentForm((show) => !show);

    const close = (): void => {
        closePanel(false);
        setShowAppointmentForm(false);
        setShowAppointmentCard(false);
        setAppointmentToEdit(null);
    }

    const excludeAppointment = async (body: { id: string }): Promise<void> => {
        await deleteAppointment(body);
        setDeleted(true);
        close();
    }

    return (
        <div className={styles.fade_side}>
            <div className={styles.side_container}>
                <header>
                    <button type="button" onClick={close}>
                        <FaXmark />
                    </button>
                </header>
                {showAppointmentCard && appointmentToEdit && (
                    <div className={styles.edit_actions}>
                        <AppointmentCard appointment={appointmentToEdit} />
                        <div className={styles.buttons}>
                            <button type="button" onClick={toggleEditForm}>
                                {showAppointmentForm ? "Fechar" : "Editar"}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => excludeAppointment({ id: appointmentToEdit.id })}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                )}
                {showAppointmentForm && <AppointmentForm />}
            </div>
        </div>
    );
}

export default SidePanel;