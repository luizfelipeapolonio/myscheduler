import { useState, useEffect } from "react";

interface IHandleDate {
    getToday: () => void;
    goToDate: (month: string, year: number) => void;
    getMonthNumberByName: (month: string) => string;
    getMonthNameByNumber: (month: string) => string;
    nextMonth: () => void;
    previousMonth: () => void;
    month: string;
    year: number;
    monthDays: (number | string)[];
    today: number;
}

const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export function useHandleDate(): IHandleDate {
    const [month, setMonth] = useState<string>("");
    const [year, setYear] = useState<number>(0);
    const [monthDays, setMonthDays] = useState<(number | string)[]>([]);
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(null);
    const [today, setToday] = useState<number>(0);

    const date = new Date();

    const getCurrentMonth = (): void => {
        const month: number = date.getMonth();
        setCurrentMonthIndex(month);
        setMonth(monthNames[month]);
    }

    const getCurrentYear = (): void => {
        const year: number = date.getFullYear();
        setYear(year);
    }

    const getToday = (): void => {
        getCurrentMonth();
        getCurrentYear();
    }

    const goToDate = (month: string, year: number): void => {
        const monthIndex: number = monthNames.indexOf(month);
        setCurrentMonthIndex(monthIndex);
        setYear(year);
    }

    const getMonthNumberByName = (month: string): string => {
        const monthIndex:  number = monthNames.indexOf(month) + 1;

        if(monthIndex < 10) {
            return `0${monthIndex}`;
        } else {
            return monthIndex.toString();
        }
    }

    const getMonthNameByNumber = (month: string): string => {
        const monthNumber: number = parseInt(month);
        return monthNames[monthNumber - 1];
    }

    const nextMonth = (): void => {
        if(currentMonthIndex === null) return;
        setCurrentMonthIndex(currentMonthIndex + 1);
    }

    const previousMonth = (): void => {
        if(currentMonthIndex === null) return;
        setCurrentMonthIndex(currentMonthIndex - 1);
    }

    const allMonthDays = (): void => {
        if(currentMonthIndex === null) return;

        const lastDayOfMonth = new Date(year, currentMonthIndex + 1, 0).getDate();
        const lastDayOfPreviousMonth = new Date(year, currentMonthIndex, 0).getDate();
        const firstWeekDayOfMonth = new Date(year, currentMonthIndex, 1).getDay();
        const lastWeekDayOfMonth = new Date(year, currentMonthIndex, lastDayOfMonth).getDay();

        const monthDaysArray: (number | string)[] = [];

        // Set every day of the month
        for (let i = 1; i <= lastDayOfMonth; i++) {
            // Check for current day
            if(i === date.getDate() && 
               currentMonthIndex === date.getMonth() && 
               year === date.getFullYear()) {
                setToday(i);
            }

            monthDaysArray.push(i);
        }

        // Set the last days of the previous month
        for (let i = 0; i < firstWeekDayOfMonth; i++) {
            monthDaysArray.unshift((lastDayOfPreviousMonth - i).toString());
        }

        // Set the first days of the next month
        for (let i = lastWeekDayOfMonth; i < 6; i++) {
            monthDaysArray.push(((i - lastWeekDayOfMonth) + 1).toString());
        }

        setMonthDays(monthDaysArray);
    }

    useEffect(() => {
        getCurrentMonth();
        getCurrentYear();
        allMonthDays();
    }, []);
    
    useEffect(() => {
        if(currentMonthIndex === null) return;

        setToday(0);
        setMonth(monthNames[currentMonthIndex]);
        allMonthDays();

        if(currentMonthIndex < 0 || currentMonthIndex > 11) {
            const newDate = new Date(year, currentMonthIndex);
            const newMonth = newDate.getMonth();
            const newYear = newDate.getFullYear();

            setCurrentMonthIndex(newMonth);
            setYear(newYear);
        }

    }, [currentMonthIndex, year]);

    return { 
        getToday, 
        goToDate, 
        getMonthNumberByName, 
        getMonthNameByNumber, 
        nextMonth, 
        previousMonth, 
        month, 
        year, 
        monthDays, 
        today 
    };
}