// CSS
import styles from "./SidePanel.module.css";

// Icons
import { FaXmark } from "react-icons/fa6";

// Components
import AppointmentForm from "../appointment/AppointmentForm";

interface SidePanelProps {
    closePanel: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidePanel = ({ closePanel }: SidePanelProps) => {
    return (
        <div className={styles.fade_side}>
            <div className={styles.side_container}>
                <header>
                    <button type="button" onClick={() => closePanel(false)}>
                        <FaXmark />
                    </button>
                </header>
                <AppointmentForm />
            </div>
        </div>
    );
}

export default SidePanel;