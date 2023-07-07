import { createContext, useContext } from "react";

export interface IDateToScheduleObject {
    day: string;
    month: string;
    year: number;
}

interface IDateToSchedule {
    date: IDateToScheduleObject | null;
    setDate: React.Dispatch<React.SetStateAction<IDateToScheduleObject | null>>;
}

export const DateToSchedule = createContext<IDateToSchedule>(null!);

export const useDateToScheduleContext = (): IDateToSchedule => {
    return useContext(DateToSchedule);
}