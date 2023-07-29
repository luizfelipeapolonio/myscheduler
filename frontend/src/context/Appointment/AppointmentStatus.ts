import { createContext, useContext } from "react";

interface IAppointmentStatus {
    created: boolean;
    edited: boolean;
    setCreated: React.Dispatch<React.SetStateAction<boolean>>;
    setEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppointmentStatusContext = createContext<IAppointmentStatus>(null!);

export const useAppointmentStatusContext = (): IAppointmentStatus => {
    return useContext(AppointmentStatusContext);
}