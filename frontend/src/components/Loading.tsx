// CSS
import styles from "./Loading.module.css";

interface LoadingProps {
    type: "default" | "full";
}

const Loading = ({ type }: LoadingProps) => {
    return (
        <div className={`${styles.loading_container} ${styles[type]}`}>
            <div className={styles.spinner}></div>
            {type === "full" && <p>Carregando...</p>}
        </div>
    );
}

export default Loading;