import { createContext, useContext } from "react";

// Types
import { IAppointment } from "../../types/shared.types";

interface IAppointmentToEdit {
    appointmentToEdit: IAppointment | null;
    setAppointmentToEdit: React.Dispatch<React.SetStateAction<IAppointment | null>>;
}

export const AppointmentToEdit = createContext<IAppointmentToEdit>(null!);

export const useAppointmentToEditContext = (): IAppointmentToEdit => {
    return useContext(AppointmentToEdit);
}