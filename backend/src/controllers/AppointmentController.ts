import { prisma } from "../config/PrismaClient";

// Types
import { Request } from "express";
import { Appointment } from "@prisma/client";
import { ITypedRequestBody, ITypedResponse, IJSONResponse } from "../types/shared.types";
import { AuthUser } from "../types/user.types";
import { CreateAppointmentBody, EditAppointmentBody, GetAppointmentByDateBody } from "../types/appointment.types";

import Logger from "../config/logger";

export class AppointmentController {
    async create(req: ITypedRequestBody<CreateAppointmentBody>, res: ITypedResponse<IJSONResponse<Appointment | null>>) {
        const { title, type, priority, date, description, time } = req.body;
        const authUser: AuthUser = res.locals.authUser;

        const formatedDate: Date = new Date(`${date.year}-${date.month}-${date.day}`);
        const formatedTime: string | undefined = time ? `${time.hour}:${time.minute}` : undefined;

        try {
            const appointment = await prisma.appointment.create({
                data: {
                    title,
                    type,
                    priority,
                    date: formatedDate,
                    description: description ? description : undefined,
                    time: formatedTime,
                    userId: authUser.id
                }
            });

            return res.status(200).json({
                status: "success",
                message: "Compromisso criado com sucesso!",
                payload: appointment
            });

        } catch(error) {
            Logger.error("Erro ao criar compromisso --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async getAllUserAppointments(req: Request, res: ITypedResponse<IJSONResponse<Appointment[] | null>>) {
        const authUser: AuthUser = res.locals.authUser;

        try {
            const appointments: Appointment[] = await prisma.appointment.findMany({
                where: { userId: authUser.id },
                orderBy: { date: "asc" }
            });

            return res.status(200).json({
                status: "success",
                message: "Todos os compromissos do usuário",
                payload: appointments
            });

        } catch(error) {
            Logger.error(
                "Erro ao buscar todos os compromissos do usuário --> " + 
                `Erro: ${error}`
            );
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async getAppointmentById(req: Request<{ id: string }>, res: ITypedResponse<IJSONResponse<Appointment | null>>) {
        const { id } = req.params;
        const authUser: AuthUser = res.locals.authUser;

        try {
            const appointment: Appointment | null = await prisma.appointment.findFirst({
                where: {
                    userId: authUser.id,
                    id
                }
            });

            if(!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Compromisso não encontrado",
                    payload: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Compromisso encontrado",
                payload: appointment
            });
                
        } catch(error) {
            Logger.error("Erro ao buscar compromisso pelo id --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async getAppointmentsByDate(
        req: ITypedRequestBody<GetAppointmentByDateBody>, 
        res: ITypedResponse<IJSONResponse<Appointment[] | null>>
    ) {
        const { year, monthNumber } = req.body;
        const authUser: AuthUser = res.locals.authUser;

        try {
            const appointments: Appointment[] = await prisma.appointment.findMany({
                where: { userId: authUser.id }
            });

            const filteredAppointments: Appointment[] = appointments.filter((appointment) => {
                const appointmentYear: string = appointment.date.getFullYear().toString();
                const appointmentMonth: string = appointment.date.toJSON().split("T")[0].split("-")[1];
                
                return monthNumber === appointmentMonth && appointmentYear === year;
            });

            return res.status(200).json({
                status: "success",
                message: "Compromissos encontrados",
                payload: filteredAppointments
            });

        } catch(error) {
            Logger.error("Erro ao buscar compromissos pela data --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async edit(req: ITypedRequestBody<EditAppointmentBody>, res: ITypedResponse<IJSONResponse<Appointment | null>>) {
        const { appointmentId, title, type, description, priority, date, time } = req.body;
        const authUser: AuthUser = res.locals.authUser;

        let formatedDate: Date | undefined = undefined;
        let formatedTime: string | null = null;

        try {
            const appointment: Appointment | null = await prisma.appointment.findFirst({
                where: { id: appointmentId }
            });

            if(!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Compromisso não encontrado",
                    payload: null
                });
            }

            // Check if appointment belongs to authenticated user
            if(appointment.userId !== authUser.id) {
                return res.status(401).json({
                    status: "error",
                    message: "Ocorreu um erro! Por favor, tente mais tarde",
                    payload: null
                });
            }

            if(date) {
                formatedDate = new Date(`${date.year}-${date.month}-${date.day}`);
            }

            if(time) {
                formatedTime = `${time.hour}:${time.minute}`;
            }

            const editedAppointment: Appointment = await prisma.appointment.update({
                where: { id: appointment.id },
                data: {
                    title,
                    type,
                    priority,
                    description,
                    date: formatedDate,
                    time: formatedTime
                }
            });

            return res.status(200).json({
                status: "success",
                message: "Compromisso editado com sucesso!",
                payload: editedAppointment
            });

        } catch(error) {
            Logger.error("Erro na edição de compromisso --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error", 
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    async delete(req: Request<{}, {}, { id: string }>, res: ITypedResponse<IJSONResponse<Appointment | null>>) {
        const { id } = req.body;
        const authUser: AuthUser = res.locals.authUser;

        try {
            const appointment: Appointment | null = await prisma.appointment.findFirst({
                where: { id }
            });

            if(!appointment) {
                return res.status(404).json({
                    status: "error",
                    message: "Compromisso não encontrado",
                    payload: null
                });
            }

            // Check if appointment belongs to authenticated user
            if(appointment.userId !== authUser.id) {
                return res.status(401).json({
                    status: "error",
                    message: "Ocorreu um erro! Por favor, tente mais tarde",
                    payload: null
                });
            }

            const deletedAppointment: Appointment = await prisma.appointment.delete({
                where: { id: appointment.id }
            });

            return res.status(200).json({
                status: "success",
                message: "Compromisso excluído com sucesso!",
                payload: deletedAppointment
            });

        } catch(error) {
            Logger.error("Erro ao excluir compromisso --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Erro ao excluir compromisso! Por favor, tente mais tarde",
                payload: null
            });
        }
    }
}