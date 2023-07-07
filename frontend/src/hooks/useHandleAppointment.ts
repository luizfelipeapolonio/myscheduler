// Types
import { IApiResponse, IAppointment } from "../types/shared.types";
import { ISignedUser } from "../types/user.types";
import { ICreateAppointmentBody } from "../types/appointment.types";

import { useState } from "react";

// Services
import { create } from "../services/appointmentService";

// Utils
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";

interface IHandleAppointment {
    createAppointment: (body: ICreateAppointmentBody) => Promise<void>;
    data: IApiResponse<IAppointment | null> | null;
    loading: boolean;
    error: boolean;
    success: boolean;
}

export function useHandleAppointment(): IHandleAppointment {
    const [data, setData] = useState<IApiResponse<IAppointment | null> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const createAppointment = async (body: ICreateAppointmentBody): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const appointmentResponse = await create(body, localStorageUser.token);

            if(appointmentResponse === null) setError(true);
            if(appointmentResponse && appointmentResponse.status === "error") setError(true);
            if(appointmentResponse && appointmentResponse.status === "success") setSuccess(true);

            setData(appointmentResponse);

        } catch(error) {
            console.log("Erro ao criar compromisso --> hook ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    return { createAppointment, data, loading, error, success };
}