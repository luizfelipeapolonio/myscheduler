import { Request, Response, Router } from "express";

// Middlewares
import { handleValidation } from "../middlewares/handleValidation";

export class UserRoutes {
    private router = Router();

    routes() {
        const validation = new handleValidation();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Rotas de usuário funcionando!");
        });

        this.router.post("/", validation.userCreateValidation, (req: Request, res: Response) => res.send("Usuário cadastrado!"));

        return this.router;
    }
}