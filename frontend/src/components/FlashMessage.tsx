// CSS
import styles from "./FlashMessage.module.css";

interface FlashMessageProps {
    message: string;
    type: "success" | "error";
    marginTop?: string;
    marginBottom?: string;
}

const FlashMessage = ({ message, type, marginTop, marginBottom }: FlashMessageProps) => {
    return (
        <div 
            className={`${styles.flash_container} ${styles[type]}`}
            style={{
                marginTop,
                marginBottom
            }}
        >
            <p>{message}</p>
        </div>
    );
}

export default FlashMessage;