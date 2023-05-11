// Types
import { Request, NextFunction } from "express";
import { IJSONResponse, ITypedResponse } from "../types/shared.types";

import { userCreateSchema } from "../validation/userSchemas";

interface validationErrors {
    path: string | number;
    message: string;
}

export class handleValidation {
    async userCreateValidation(req: Request, res: ITypedResponse<IJSONResponse<validationErrors[]>>, next: NextFunction) {
        const validation = await userCreateSchema.safeParseAsync(req.body);

        if(validation.success) {
            return next();
        } else {
            const errors: validationErrors[] = validation.error.issues.map((errorObject) => {
                return { path: errorObject.path[0], message: errorObject.message };
            });

            return res.status(422).json({
                status: "error",
                message: "Erro na validação de criação de usuário",
                payload: errors
            });
        }
    }
}