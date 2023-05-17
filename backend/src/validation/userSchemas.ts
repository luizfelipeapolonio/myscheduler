import { z } from "zod";

export const createUserSchema = z.object({
    email: z.string({
        required_error: "O e-mail é obrigatório"
    }).email({ message: "Insira um e-mail válido" }),
    name: z.string({
        required_error: "O nome é obrigatório"
    })
    .min(1, { message: "O nome deve ter pelo menos 1 caractere" })
    .max(20, { message: "O nome deve ter no máximo 20 caracteres" }),
    password: z.string({
        required_error: "A senha é obrigatória"
    }).min(5, { message: "A senha deve ter no mínimo 5 caracteres" }),
    confirmPassword: z.string({
        required_error: "A confirmação de senha é obrigatória"
    })
}).refine((createUserSchema) => createUserSchema.password === createUserSchema.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"]
});

export const signInUserSchema = z.object({
    email: z.string({
        required_error: "O e-mail é obrigatório"
    }).email({ message: "Insira um e-mail válido" }),
    password: z.string({ required_error: "A senha é obrigatória" })
});

export const updateUserSchema = z.object({
    name: z.string()
          .min(1, { message: "O nome deve ter no mínimo 1 caractere" })
          .max(20, { message: "O nome deve ter no máximo 20 caracteres" })
          .optional(),
    password: z.string()
              .min(5, { message: "A senha deve ter no mínimo 5 caracteres" })
              .optional(),
    confirmPassword: z.string().optional()
}).superRefine((updateUserSchema, ctx) => {
    if(updateUserSchema.password && !updateUserSchema.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "A confirmação de senha é obrigatória",
            path: ["confirmPassword"]
        });
    }

    if(updateUserSchema.password && updateUserSchema.confirmPassword) {
        if(updateUserSchema.password !== updateUserSchema.confirmPassword) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "As senhas devem ser iguais",
                path: ["confirmPassword"]
            });
        }
    }
});