// Types
import { IApiResponse, IAppointment } from "../types/shared.types";
import { ICreateAppointmentBody, IEditAppointmentBody, IGetAppointmentByDateBody } from "../types/appointment.types";

const api: string = "http://localhost:5000/api";

export const create = async (
    body: ICreateAppointmentBody, 
    token: string
): Promise<IApiResponse<IAppointment | null> | null> => {
    try {
        const response = await fetch(api + "/appointments/appointment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data: IApiResponse<IAppointment | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao criar compromisso --> ", error);
        return null;
    }
}

export const getByDate = async (
    body: IGetAppointmentByDateBody, 
    token: string
): Promise<IApiResponse<IAppointment[] | null> | null> => {
    try {
        const response = await fetch(api + "/appointments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data: IApiResponse<IAppointment[] | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao buscar compromissos pela data --> ", error);
        return null;
    }
}

export const edit = async (
    body: IEditAppointmentBody, 
    token: string
): Promise<IApiResponse<IAppointment | null> | null> => {
    try {
        const response = await fetch(api + "/appointments/appointment", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data: IApiResponse<IAppointment | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao editar compromisso --> ", error);
        return null;
    }
}

export const exclude = async (
    body: { id: string }, 
    token: string): Promise<IApiResponse<IAppointment | null> | null> => {
    try {
        const response = await fetch(api + "/appointments/appointment", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        });

        const data: IApiResponse<IAppointment | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao deletar compromisso --> ", error);
        return null;
    }
}

export const getAllUserAppointments = async (token: string): Promise<IApiResponse<IAppointment[] | null> | null> => {
    try {
        const response = await fetch(api + "/appointments", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data: IApiResponse<IAppointment[] | null> = await response.json();

        return data;

    } catch(error) {
        console.log("Erro ao buscar todos os compromissos --> ", error);
        return null;
    }
}