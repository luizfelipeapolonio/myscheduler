import { z } from "zod";

// Custom validation types
const AppointmentType = z.union([z.literal("lembrete"), z.literal("tarefa"), z.literal("evento")], {
    errorMap: (error, ctx) => {
        if(error.code === "invalid_union") {
            return { message: "O tipo deve ser 'lembrete', 'tarefa' ou 'evento'" }
        }

        return { message: ctx.defaultError }
    }
});

const AppointmentPriority = z.union([z.literal("alta"), z.literal("media"), z.literal("baixa")], {
    errorMap: (error, ctx) => {
        if(error.code === "invalid_union") {
            return { message: "A prioridade deve ser 'alta', 'media' ou 'baixa'" };
        }

        return { message: ctx.defaultError };
    }
 });

 const AppointmentDate = z.object({
    day: z.string({ required_error: "O dia é obrigatório" }).regex(new RegExp(/[0-9]{2}/g), { 
        message: "O dia deve ser no formato numérico '00'. Ex: '13'"
    }).refine((day) => day >= "01" && day <= "31", { 
        message: "Dia inválido! O dia deve ser entre '01' e '31'" 
    }),
    month: z.string({ required_error: "O mês é obrigatório" }).regex(new RegExp(/[0-9]{2}/g), {
        message: "O mês deve ser no formato numérico '00'. Ex: '09'"
    }).refine((month) => month >= "01" && month <= "12", {
        message: "Mês inválido! O mês deve ser entre '01' e '12'"
    }),
    year: z.string({ required_error: "O ano é obrigatório" }).regex(new RegExp(/[0-9]{4}/), {
        message: "O ano deve ser no formato numérico '0000'. Ex: '2023'"
    }).refine((year) => year > "0000", { message: "Ano inválido" })
}, { required_error: "A data é obrigatória" });

const AppointmentTime = z.object({
    hour: z.string({ required_error: "A hora é obrigatória" }).regex(new RegExp(/[0-9]{2}/g), {
            message: "As horas devem ser no formato numérico '00'. Ex: '13'"
        }).refine((hour) => hour >= "00" && hour <= "24", {
            message: "Hora inválida! A hora deve ser entre '00' e '24'"
        }),
    minute: z.string({ required_error: "Os minutos são obrigatórios" }).regex(new RegExp(/[0-9]{2}/g), {
                message: "Os minutos devem ser no formato numérico '00'. Ex: '45'"
            }).refine((minute) => minute >= "00" && minute <= "59", {
                message: "Minutos inválidos! Os minutos devem ser entre '00' e '59'"
            })
}).optional();

// Schemas
export const createAppointmentSchema = z.object({
    type: AppointmentType,
    title: z.string({ required_error: "O título é obrigatório" })
           .min(1, { message: "O título não pode estar vazio" }),
    description: z.string().optional(),
    priority: AppointmentPriority,
    date: AppointmentDate,
    time: AppointmentTime
});

export const editAppointmentSchema = z.object({
    type: AppointmentType.optional(),
    title: z.string().min(1, { message: "O título deve ter no mínimo 1 caractere" }).optional(),
    description: z.string().optional(),
    priority: AppointmentPriority.optional(),
    date: AppointmentDate.optional(),
    time: AppointmentTime
});