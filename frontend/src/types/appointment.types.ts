export interface ICreateAppointmentBody {
    title: string;
    type: "lembrete" | "tarefa" | "evento";
    priority: "alta" | "media" | "baixa";
    date: {
        day: string;
        month: string;
        year: string;
    }
    time?: {
        hour: string;
        minute: string;
    }
    description?: string;
}