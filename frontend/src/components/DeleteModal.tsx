// CSS
import styles from "./DeleteModal.module.css";

import { useHandleUser } from "../hooks/useHandleUser";

interface DeleteModalProps {
    setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteModal = ({ setState }: DeleteModalProps) => {
    const { deleteUserAccount } = useHandleUser();

    const deleteAccount = (): void => {
        deleteUserAccount();
        setState(false);
    }

    return (
        <div className={styles.fade_modal}>
            <div className={styles.modal_container}>
                <p>
                    Tem certeza que deseja excluir esta conta?
                    <br />
                    Seus dados serão excluídos permanentemente!
                </p>
                <div className={styles.action}>
                    <button onClick={deleteAccount}>Excluir</button>
                    <button onClick={() => setState(false)}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;