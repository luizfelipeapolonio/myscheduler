import { prisma } from "../config/PrismaClient";

// Types
import { ITypedRequestBody, ITypedResponse, IJSONResponse } from "../types/shared.types";
import { userCreateBody, SignedInUser } from "../types/user.types";
import { User } from "@prisma/client";

import Logger from "../config/logger";

import { userUtils } from "../utils/UserUtils";

export class UserController {
    async createAndSignInUser(req: ITypedRequestBody<userCreateBody>, res: ITypedResponse<IJSONResponse<SignedInUser | null>>) {
        const { email, name, password } = req.body;

        const utils = new userUtils();

        try {
            const userAlreadyExists: User | null = await prisma.user.findUnique({
                where: { email }
            });

            // Check if user have already created an account
            if(userAlreadyExists) {
                return res.status(422).json({
                    status: "error",
                    message: "E-mail já cadastrado!",
                    payload: null
                });
            }

            // Generate password hash
            const passwordHash: string | null = await utils.generatePasswordHash(password);

            if(!passwordHash) {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Por favor, tente mais tarde",
                    payload: null
                });
            }

            const newUser: User = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: passwordHash
                }
            });

            // Generate token
            const token = utils.generateToken(newUser.id);

            if(!token) {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Por favor, tente mais tarde!",
                    payload: null
                });
            }

            // Created user and generated token
            const signedInUser: SignedInUser = {
                token,
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            }

            return res.status(200).json({
                status: "success",
                message: "Usuário criado e logado com sucesso!",
                payload: signedInUser
            });

        } catch(error) {
            Logger.error("Erro ao criar usuário --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Não foi possível criar usuário!",
                payload: null
            });
        }
    }
}