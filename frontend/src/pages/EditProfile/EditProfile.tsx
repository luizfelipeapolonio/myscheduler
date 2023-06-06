// CSS
import styles from "./EditProfile.module.css";

// Components
import Loading from "../../components/Loading";

// Icons
import { BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from "react-icons/bs";

// Types
import { CurrentUserResponse } from "../../types/user.types";

import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";

const EditProfile = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword]= useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const { getCurrentUser, reset, data } = useHandleUser();

    const togglePassword = (): void => setIsPasswordVisible((isVisible) => !isVisible);
    const toggleConfirmPass = (): void => setIsConfirmPassVisible((isVisible) => !isVisible);

    useEffect(() => {
        reset();
        getCurrentUser();
    }, []);

    useEffect(() => {
        if(data) {
            if(data.status === "success" && data.payload) {
                setEmail((data.payload as CurrentUserResponse).email);
                setName((data.payload as CurrentUserResponse).name);
            }
        }
    }, [data]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <>
            {!data && <Loading type="default" />}
            {data && (
                <div className={styles.editProfile_container}>
                    <Link to="/" className={styles.back_button}>
                        <BsArrowLeft />
                        <span>Voltar</span>
                    </Link>
                    <h1>Editar Perfil</h1>
                    <p>Mude o seu nome ou senha atual</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <span>E-mail</span>
                            <input 
                                type="email" 
                                name="email"
                                value={email || ""}
                                disabled 
                            />
                        </label>
                        <label>
                            <span>Nome</span>
                            <input 
                                type="text"
                                placeholder="Altere seu nome"
                                name="name"
                                onChange={(e) => setName(e.target.value)}
                                value={name || ""}
                                autoFocus
                            />
                        </label>
                        <label className={styles.password}>
                            <span>Senha</span>
                            <input 
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Sua nova senha" 
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password || ""}
                            />
                            <button onClick={togglePassword}>
                                {isPasswordVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </button>
                        </label>
                        <label className={styles.password}>
                            <span>Confirmar senha</span>
                            <input
                                type={isConfirmPassVisible ? "text" : "password"}
                                placeholder="Confirme sua nova senha" 
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirmPassword || ""}
                            />
                            <button onClick={toggleConfirmPass}>
                                {isConfirmPassVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </button>
                        </label>
                        <input type="submit" value="Atualizar" />
                    </form>
                </div>
            )}
        </>
    )
}

export default EditProfile;