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

        const formatedDate = new Date(`${date.year}-${date.month}-${date.day}`);
        const formatedTime = time ? `${time.hour}:${time.minute}` : undefined;

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
}