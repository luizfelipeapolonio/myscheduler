// CSS
import styles from "./Form.module.css";

// Icons
import { BsFillEnvelopeFill, BsFillEyeFill, BsFillEyeSlashFill} from "react-icons/bs";
import { FaLock } from "react-icons/fa";

import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    const togglePassword = (): void => setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        const login = {
            email,
            password
        }

        console.log(login)
    }

    return (
        <div className={styles.form_container}>
            <h1>Login</h1>
            <p>Faça login e comece agora mesmo a organizar seus compromissos!</p>
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
                <input type="submit" value="Entrar" />
            </form>
            <p className={styles.redirect}>
                Não tem uma conta? <Link to="/register">Registre-se</Link>
            </p>
        </div>
    );
}

export default Login;