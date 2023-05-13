import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/PrismaClient";

// Types
import { Request, NextFunction } from "express";
import { IJSONResponse, ITypedResponse } from "../types/shared.types";
import { AuthUser } from "../types/user.types";

import Logger from "../config/logger";

export class authGuard {
    async execute(req: Request, res: ITypedResponse<IJSONResponse<null>>, next: NextFunction) {
        const authHeader: string | undefined = req.headers.authorization;
        const token: string | undefined = authHeader ? authHeader.split(" ")[1] : undefined;
        const jwtSecret: string | undefined = process.env.JWT_SECRET;

        // Check if there is a token
        if(!token) {
            return res.status(401).json({
                status: "error",
                message: "Acesso negado!",
                payload: null
            });
        }

        // Check if jwt secret was defined
        if(!jwtSecret) {
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }

        try {
            const verifiedToken = jwt.verify(token, jwtSecret) as JwtPayload;

            const authUser: AuthUser | null = await prisma.user.findFirst({
                where: {
                    id: verifiedToken.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            // Check if user was found
            if(!authUser) {
                return res.status(404).json({
                    status: "error",
                    message: "Erro ao buscar usuário autenticado!",
                    payload: null
                });
            }

            res.locals["authUser"] = authUser;

            return next();

        } catch(error) {
            Logger.error("Erro na validação do token --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Token inválido!",
                payload: null
            });
        }
    }
}