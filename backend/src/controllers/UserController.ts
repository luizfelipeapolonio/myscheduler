import { prisma } from "../config/PrismaClient";
import bcrypt from "bcryptjs";

// Types
import { ITypedRequestBody, ITypedResponse, IJSONResponse } from "../types/shared.types";
import { 
    userCreateBody, 
    userSignInBody,
    userUpdateBody, 
    NewUser, 
    SignedInUser, 
    AuthUser,
} from "../types/user.types";
import { User } from "@prisma/client";
import { Request, Response } from "express";

import Logger from "../config/logger";

import { userUtils } from "../utils/userUtils";

export class UserController {
    async createAndSignInUser(req: ITypedRequestBody<userCreateBody>, res: ITypedResponse<IJSONResponse<NewUser | null>>) {
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
            const signedInUser: NewUser = {
                token,
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt
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

    async signIn(req: ITypedRequestBody<userSignInBody>, res: ITypedResponse<IJSONResponse<SignedInUser | null>>) {
        const { email, password } = req.body;

        const utils = new userUtils();

        try {
            const user: User | null = await prisma.user.findUnique({
                where: { email }
            });

            // Check if user exists
            if(!user) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado",
                    payload: null
                });
            }

            // Check if password matches
            if(!(await bcrypt.compare(password, user.password))) {
                return res.status(422).json({
                    status: "error",
                    message: "Senha inválida",
                    payload: null
                });
            }

            const token: string | null = utils.generateToken(user.id);

            // Check if token was generated
            if(!token) {
                return res.status(500).json({
                    status: "error",
                    message: "Ocorreu um erro! Por favor, tente mais tarde",
                    payload: null
                });
            }

            const signedInUser: SignedInUser = {
                token,
                id: user.id,
                email: user.email,
                name: user.name
            }

            return res.status(200).json({
                status: "success",
                message: "Usuário logado",
                payload: signedInUser
            });

        } catch(error) {
            Logger.error("Erro ao logar --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }

    getCurrentUser(req: Request, res: ITypedResponse<IJSONResponse<AuthUser>>) {
        const authUser: AuthUser = res.locals.authUser;

        return res.status(200).json({
            status: "success",
            message: "Usuário logado",
            payload: authUser
        });
    }

    async userUpdate(req: ITypedRequestBody<userUpdateBody>, res: ITypedResponse<IJSONResponse<AuthUser | null>>) {
        const { name, password } = req.body;
        const authUser: AuthUser = res.locals.authUser;
        const utils = new userUtils();

        try {
            if(name) {
                await prisma.user.update({
                    where: {
                        id: authUser.id
                    },
                    data: {
                        name
                    }
                });
            }

            if(password) {
                const newPassword: string | null = await utils.generatePasswordHash(password);

                // Check if new password was hashed successfully
                if(!newPassword) {
                    return res.status(500).json({
                        status: "error",
                        message: "Ocorreu um erro! Por favor, tente mais tarde",
                        payload: null
                    });
                }

                await prisma.user.update({
                    where: {
                        id: authUser.id
                    },
                    data: {
                        password: newPassword
                    }
                });
            }

            const updatedUser: AuthUser | null = await prisma.user.findFirst({
                where: { 
                    id: authUser.id 
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
            if(!updatedUser) {
                return res.status(404).json({
                    status: "error",
                    message: "Usuário não encontrado",
                    payload: null
                });
            }

            return res.status(200).json({
                status: "success",
                message: "Usuário atualizado com sucesso!",
                payload: updatedUser
            })

        } catch(error) {
            Logger.error("Erro ao atualizar usuário --> " + `Erro: ${error}`);
            return res.status(500).json({
                status: "error",
                message: "Ocorreu um erro! Por favor, tente mais tarde",
                payload: null
            });
        }
    }
}