import { useState } from "react";

import { IAppointment } from "../../types/shared.types";

import { AppointmentToEdit } from "./AppointmentToEdit";

interface ChildrenProp {
    children?: React.ReactNode;
}

export const AppointmentToEditProvider = ({ children }: ChildrenProp) => {
    const [appointmentToEdit, setAppointmentToEdit] = useState<IAppointment | null>(null);

    return (
        <AppointmentToEdit.Provider value={{ appointmentToEdit, setAppointmentToEdit }}>
            {children}
        </AppointmentToEdit.Provider>
    )
}