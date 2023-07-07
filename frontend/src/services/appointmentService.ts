// Types
import { IApiResponse, IAppointment } from "../types/shared.types";
import { ICreateAppointmentBody } from "../types/appointment.types";

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