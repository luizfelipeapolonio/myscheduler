import { useState } from "react";

import { AppointmentStatusContext } from "./AppointmentStatus";

interface ChildrenProp {
    children?: React.ReactNode;
}

export const AppointmentStatusProvider = ({ children }: ChildrenProp) => {
    const [created, setCreated] = useState<boolean>(false);
    const [edited, setEdited] = useState<boolean>(false);

    return (
        <AppointmentStatusContext.Provider 
            value={{ created, edited, setCreated, setEdited }}
        >
            {children}
        </AppointmentStatusContext.Provider>
    );
}