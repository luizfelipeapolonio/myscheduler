// CSS
import styles from "./SidePanel.module.css";

// Icons
import { FaXmark } from "react-icons/fa6";

// Components
import AppointmentForm from "../appointment/AppointmentForm";
import AppointmentCard from "../appointment/AppointmentCard";

import { useAppointmentToEditContext } from "../../context/Appointment/AppointmentToEdit";

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
    const { appointmentToEdit } = useAppointmentToEditContext();

    const toggleEditForm = (): void => setShowAppointmentForm((show) => !show);

    const close = (): void => {
        closePanel(false);
        setShowAppointmentForm(false);
        setShowAppointmentCard(false);
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
                        <button type="button" onClick={toggleEditForm}>
                            {showAppointmentForm ? "Fechar" : "Editar"}
                        </button>
                    </div>
                )}
                {showAppointmentForm && <AppointmentForm />}
            </div>
        </div>
    );
}

export default SidePanel;