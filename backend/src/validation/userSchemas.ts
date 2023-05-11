import { z } from "zod";

export const userCreateSchema = z.object({
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
}).refine((userCreateSchema) => userCreateSchema.password === userCreateSchema.confirmPassword, {
    message: "As senhas devem ser iguais",
    path: ["confirmPassword"]
});