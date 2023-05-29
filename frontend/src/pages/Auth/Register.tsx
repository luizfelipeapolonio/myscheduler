// CSS
import styles from "./Form.module.css";

// Components
import FlashMessage from "../../components/FlashMessage";

// Icons
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill , BsFillPersonFill} from "react-icons/bs";
import { FaLock } from "react-icons/fa";

import { useState, useEffect, FormEvent } from "react";
import { Link } from "react-router-dom";

import { useHandleUser } from "../../hooks/useHandleUser";
import { extractValidationMessages } from "../../utils/extractValidationMessages";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const togglePassword = (): void => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    const toggleConfirmPass = (): void => setIsConfirmPassVisible((isConfirmPassVisible) => !isConfirmPassVisible);

    const { createAndSignInUser, reset, data, error, loading, success } = useHandleUser();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        reset();
        
        const registerBody = {
            email,
            name,
            password,
            confirmPassword
        }

        await createAndSignInUser(registerBody);
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

    // Clean up form message
    useEffect(() => {
        if(message) {
            const timer: number = setTimeout(() => {
                setMessage("");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message]);

    // Reset user request states and message when component mounts
    useEffect(() => { 
        reset();
        setMessage("");
    }, []);
    
    return (
        <div className={styles.form_container}>
            <h1>Criar conta</h1>
            <p>Crie uma conta e mantenha seus compromissos organizados</p>
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
                <div className={styles.name}>
                    <BsFillPersonFill />
                    <input 
                        type="text" 
                        placeholder="Seu nome"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isPasswordVisible ? "text" : "password"} 
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" onClick={togglePassword}>
                        {isPasswordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </button>
                </div>
                <div className={styles.password}>
                    <FaLock />
                    <input 
                        type={isConfirmPassVisible ? "text" : "password"} 
                        placeholder="Confirme sua senha"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button type="button" onClick={toggleConfirmPass}>
                        {isConfirmPassVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                    </button>
                </div>
                {!loading && <input type="submit" value="Cadastrar" />}
                {loading && <input type="submit" value="Aguarde..." disabled />}
            </form>
            <p className={styles.redirect}>
                Já tem uma conta? <Link to="/login">Entre</Link>
            </p>
        </div>
    );
}

export default Register;