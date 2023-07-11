// Types
import { Request, NextFunction } from "express";
import { IJSONResponse, ITypedResponse } from "../types/shared.types";

import { createUserSchema, signInUserSchema, updateUserSchema } from "../validation/userSchemas";
import { createAppointmentSchema, editAppointmentSchema, getAppointmentByDateSchema } from "../validation/appointmentSchemas";

import Logger from "../config/logger";

interface validationErrors {
    path: string | number;
    message: string;
}

export class HandleValidation {
    async createUser(
        req: Request, 
        res: ITypedResponse<IJSONResponse<validationErrors[]>>, 
        next: NextFunction
    ) {
        const validation = await createUserSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Criação de usuário validada com sucesso!");
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { path: errorObject.path[0], message: errorObject.message };
            });

            Logger.error(
                "Erro na validação de criação de usuário --> " + `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de criação de usuário",
                payload: errors
            });
        }
    }

    async signInUser(
        req: Request, 
        res: ITypedResponse<IJSONResponse<validationErrors[]>>,
        next: NextFunction
    ) {
        const validation = await signInUserSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Login de usuário validado com sucesso!");
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { path: errorObject.path[0], message: errorObject.message };
            });

            Logger.error(
                "Erro na validação de login --> " + `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de login de usuário",
                payload: errors
            });
        }
    }

    async updateUser(
        req: Request, 
        res: ITypedResponse<IJSONResponse<validationErrors[]>>, 
        next: NextFunction
    ) {
        const validation = await updateUserSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Atualização de usuário validado com sucesso!");
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { path: errorObject.path[0], message: errorObject.message };
            });

            Logger.error(
                "Erro na validação de atualização de usuário --> " + 
                `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de atualização de usuário",
                payload: errors
            });
        }
    }

    async createAppointment(
        req: Request, 
        res: ITypedResponse<IJSONResponse<validationErrors[]>>, 
        next: NextFunction
    ) {
        const validation = await createAppointmentSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Criação de compromisso validado com sucesso");
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { 
                    path: errorObject.path.length > 1 ? 
                          errorObject.path[0] + " > " + errorObject.path[1] : 
                          errorObject.path[0], 
                    message: errorObject.message 
                };
            });

            Logger.error(
                "Erro na validação de criação de compromisso --> " + 
                `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de criação de compromisso",
                payload: errors
            });
        }
    }

    async editAppointment(
        req: Request,
        res: ITypedResponse<IJSONResponse<validationErrors[]>>,
        next: NextFunction
    ) {
        const validation = await editAppointmentSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Edição de compromisso validada com sucesso!")
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { 
                    path: errorObject.path.length > 1 ? 
                          errorObject.path[0] + " > " + errorObject.path[1] : 
                          errorObject.path[0], 
                    message: errorObject.message 
                };
            });

            Logger.error(
                "Erro na validação de edição de compromisso --> " + 
                `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de edição de compromisso",
                payload: errors
            });
        }
    }

    async getAppointmentByDate(
        req: Request, 
        res: ITypedResponse<IJSONResponse<validationErrors[]>>,
        next: NextFunction
    ) {
        const validation = await getAppointmentByDateSchema.safeParseAsync(req.body);

        if(validation.success) {
            Logger.info("Mês e ano do compromisso validados com sucesso!");
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { path: errorObject.path[0], message: errorObject.message };
            });

            Logger.error(
                "Erro na validação da data do compromisso --> " + `Erro: ${JSON.stringify(validation.error.issues)}`
            );

            return res.status(422).json({
                status: "error",
                message: "Erro na validação da data do compromisso",
                payload: errors
            });
        }
    }
}