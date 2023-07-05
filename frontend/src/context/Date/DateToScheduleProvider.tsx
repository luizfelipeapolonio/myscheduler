import { useState } from "react";
import { DateToSchedule, IDateToScheduleObject } from "./DateToSchedule";

interface ChildrenProp {
    children?: React.ReactNode;
}

export const DateToScheduleProvider = ({ children }: ChildrenProp) => {
    const [date, setDate] = useState<IDateToScheduleObject | null>(null);

    return (
        <DateToSchedule.Provider value={{ date, setDate }}>
            {children}
        </DateToSchedule.Provider>
    )
}