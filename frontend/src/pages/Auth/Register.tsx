// CSS
import styles from "./Form.module.css";

// Icons
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill , BsFillPersonFill} from "react-icons/bs";
import { FaLock } from "react-icons/fa";

import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

import { useHandleUser } from "../../hooks/useHandleUser";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const togglePassword = (): void => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    const toggleConfirmPass = (): void => setIsConfirmPassVisible((isConfirmPassVisible) => !isConfirmPassVisible);

    const { createAndSignInUser, data, error, loading } = useHandleUser();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        const registerBody = {
            email,
            name,
            password,
            confirmPassword
        }

        await createAndSignInUser(registerBody);

    }
    console.log("REGISTER COMPONENT --> ", data);
    console.log("REGISTER ERROR --> ", error);
    console.log("REGISTER LOADING --> ", loading);

    return (
        <div className={styles.form_container}>
            <h1>Criar conta</h1>
            <p>Crie uma conta e mantenha seus compromissos organizados</p>
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
                <input type="submit" value="Cadastrar" />
            </form>
            <p className={styles.redirect}>
                Já tem uma conta? <Link to="/login">Entre</Link>
            </p>
        </div>
    );
}

export default Register;