import { IAppointment } from "../types/shared.types";

export const extractDate = (
    appointment: IAppointment, 
    extract: "day" | "month" | "year"
): string => {
    if(extract === "day") {
        return appointment.date.toString().split("T")[0].split("-")[2];
    } else if(extract === "month") {
        return appointment.date.toString().split("T")[0].split("-")[1];
    } else {
        return appointment.date.toString().split("T")[0].split("-")[0];
    }
}