// CSS
import styles from "./EditProfile.module.css";

// Components
import Loading from "../../components/Loading";
import FlashMessage from "../../components/FlashMessage";

// Icons
import { BsFillEyeFill, BsFillEyeSlashFill, BsArrowLeft } from "react-icons/bs";

// Types
import { CurrentUserResponse, IUpdateProfileBody } from "../../types/user.types";

// Utils
import { extractValidationMessages } from "../../utils/extractValidationMessages";

import { Link } from "react-router-dom";
import { useState, useEffect, FormEvent } from "react";
import { useHandleUser } from "../../hooks/useHandleUser";

const EditProfile = () => {
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword]= useState<string>("");
    const [message, setMessage] = useState<string>("");

    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [isConfirmPassVisible, setIsConfirmPassVisible] = useState<boolean>(false);

    const { getCurrentUser, updateProfile, reset, data, loading, success, error } = useHandleUser();

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

            if(data.message.includes("validação") && data.status === "error") {
                const extractedMessages: string[] | null = extractValidationMessages(data);

                if(extractedMessages !== null) {
                    setMessage(extractedMessages[0]);
                }
            } else {
                setMessage(data.message);
            }
            
            if(data.message.includes("logado")) setMessage("");
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

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        reset();

        let updateBody: IUpdateProfileBody = {};

        if(name) updateBody.name = name;
        if(password) updateBody.password = password;
        if(confirmPassword) updateBody.confirmPassword = confirmPassword;

        await updateProfile(updateBody);
    }

    return (
        <>
            {loading && <Loading type="default" />}
            {!loading && (
                <div className={styles.editProfile_container}>
                    <Link to="/" className={styles.back_button}>
                        <BsArrowLeft />
                        <span>Voltar</span>
                    </Link>
                    <h1>Editar Perfil</h1>
                    <p>Mude o seu nome ou senha atual</p>
                    <form onSubmit={handleSubmit}>
                        {message && (
                            <FlashMessage 
                                type={success ? "success" : "error"}
                                message={message}
                                marginBottom="2rem"
                            />
                        )}
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
                            />
                        </label>
                        <label className={styles.password}>
                            <span>Senha</span>
                            <input 
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Sua nova senha" 
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                            <button type="button" onClick={togglePassword}>
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
                                value={confirmPassword}
                            />
                            <button type="button" onClick={toggleConfirmPass}>
                                {isConfirmPassVisible ? <BsFillEyeSlashFill /> : <BsFillEyeFill />}
                            </button>
                        </label>
                        {!loading && <input type="submit" value="Atualizar" />}
                        {loading && <input type="submit" value="Aguarde..." disabled />}
                    </form>
                </div>
            )}
        </>
    )
}

export default EditProfile;