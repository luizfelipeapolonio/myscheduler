// Types
import { IApiResponse, IAppointment } from "../types/shared.types";
import { ISignedUser } from "../types/user.types";
import { ICreateAppointmentBody, IEditAppointmentBody, IGetAppointmentByDateBody } from "../types/appointment.types";

import { useState } from "react";

// Services
import { create, edit, getByDate, exclude, getAllUserAppointments } from "../services/appointmentService";

// Utils
import { getUserFromLocalStorage } from "../utils/getUserFromLocalStorage";

type AppointmentResponse = IAppointment | IAppointment[];

interface IHandleAppointment {
    createAppointment: (body: ICreateAppointmentBody) => Promise<void>;
    getAppointmentsByDate: (body: IGetAppointmentByDateBody) => Promise<void>;
    editAppointment: (body: IEditAppointmentBody) => Promise<void>;
    deleteAppointment: (body: { id: string }) => Promise<void>;
    getAllAppointments: () => Promise<void>;
    reset: () => void;
    data: IApiResponse<AppointmentResponse | null> | null;
    loading: boolean;
    error: boolean;
    success: boolean;
}

export function useHandleAppointment(): IHandleAppointment {
    const [data, setData] = useState<IApiResponse<AppointmentResponse | null> | null>(null);
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

    const getAppointmentsByDate = async (body: IGetAppointmentByDateBody): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const appointmentResponse = await getByDate(body, localStorageUser.token);

            if(appointmentResponse === null) setError(true);
            if(appointmentResponse && appointmentResponse.status === "error") setError(true);
            if(appointmentResponse && appointmentResponse.status === "success") setSuccess(true);

            setData(appointmentResponse);

        } catch(error) {
            console.log("Erro ao buscar compromissos pela data --> hook ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const editAppointment = async (body: IEditAppointmentBody): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const editAppointmentResponse = await edit(body, localStorageUser.token);
            
            if(editAppointmentResponse === null) setError(true);
            if(editAppointmentResponse && editAppointmentResponse.status === "error") {
                setError(true);
            }
            if(editAppointmentResponse && editAppointmentResponse.status === "success") {
                setSuccess(true);
            }

            setData(editAppointmentResponse);

        } catch(error) {
            console.log("Erro ao editar compromisso --> hook ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const deleteAppointment = async (body: { id: string }): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const deleteAppointmentResponse = await exclude(body, localStorageUser.token);

            if(deleteAppointmentResponse === null) setError(true);
            if(deleteAppointmentResponse && deleteAppointmentResponse.status === "error") {
                setError(true);
            }
            if(deleteAppointmentResponse && deleteAppointmentResponse.status === "success") {
                setSuccess(true);
            }

            setData(deleteAppointmentResponse);

        } catch(error) {
            console.log("Erro ao deletar compromisso --> hook ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const getAllAppointments = async (): Promise<void> => {
        const localStorageUser: ISignedUser | null = getUserFromLocalStorage();

        if(localStorageUser === null) {
            setError(true);
            return;
        }

        setLoading(true);

        try {
            const getAllAppointmentsResponse = await getAllUserAppointments(localStorageUser.token);

            if(getAllAppointmentsResponse === null) setError(true);
            if(getAllAppointmentsResponse && getAllAppointmentsResponse.status === "error") {
                setError(true);
            }
            if(getAllAppointmentsResponse && getAllAppointmentsResponse.status === "success") {
                setSuccess(true);
            }

            setData(getAllAppointmentsResponse);

        } catch(error) {
            console.log("Erro ao buscar todos os compromissos --> hook ", error);
            setError(true);
        } finally {
            setLoading(false);
        }
    }

    const reset = (): void => {
        setData(null);
        setError(false);
        setSuccess(false);
    }

    return { 
        createAppointment, 
        getAppointmentsByDate, 
        editAppointment,
        deleteAppointment,
        getAllAppointments,
        reset, 
        data, 
        loading, 
        error, 
        success 
    };
}