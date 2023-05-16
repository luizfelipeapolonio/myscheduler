import { prisma } from "../config/PrismaClient";

// Types
import { Request, Response } from "express";
import { Appointment } from "@prisma/client";
import { ITypedRequestBody, ITypedResponse, IJSONResponse } from "../types/shared.types";
import { AuthUser } from "../types/user.types";
import { appointmentCreateBody } from "../types/appointment.types";

import Logger from "../config/logger";

export class AppointmentController {
    async create(req: ITypedRequestBody<appointmentCreateBody>, res: ITypedResponse<IJSONResponse<Appointment | null>>) {
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
}