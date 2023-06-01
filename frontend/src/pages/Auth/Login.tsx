// CSS
import styles from "./Form.module.css";

// Icons
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import { FaLock } from "react-icons/fa";

// Components
import FlashMessage from "../../components/FlashMessage";

import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";

// Utils
import { extractValidationMessages } from "../../utils/extractValidationMessages";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePassword = (): void => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);

    const { signIn, reset, data, error, success, loading } = useHandleUser();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        reset();

        const loginBody = {
            email,
            password
        }

        await signIn(loginBody);
    }

    useEffect(() => {
        if(data) {
            const extractedMessages: string[] | null = extractValidationMessages(data);

            if(extractedMessages !== null) {
                setMessage(extractedMessages[0]);
            }

            if(!data.message.includes("validação")) {
                setMessage(data.message);
            }
        }

        if(!data && error) {
            setMessage("Ocorreu um erro! Por favor, tente mais tarde");
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

    useEffect(() => {
        reset();
        setMessage("");
    }, []);

    return (
        <div className={styles.form_container}>
            <h1>Login</h1>
            <p>Faça login e comece agora mesmo a organizar seus compromissos!</p>
            {message && (
                <FlashMessage 
                    message={message}
                    type={success ? "success" : "error"}
                    marginBottom="2rem"
                />
            )}
            <form onSubmit={handleSubmit}>
                <div className={styles.email}>
                    <BsFillEnvelopeFill />
                    <input 
                        type="email" 
                        placeholder="Seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoFocus
                    />
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isPasswordVisible ? "text" : "password"} 
                        placeholder="Sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <button type="button" onClick={togglePassword}>
                        {isPasswordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </button>
                </div>
                {!loading && <input type="submit" value="Entrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
            </form>
            <p className={styles.redirect}>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
        </div>
    );
}

export default Login;