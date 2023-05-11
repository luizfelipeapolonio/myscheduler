import { Request, Response, Router } from "express";

// Middlewares
import { handleValidation } from "../middlewares/handleValidation";

// Controller
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private router = Router();

    routes() {
        const validation = new handleValidation();
        const user = new UserController();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Rotas de usuário funcionando!");
        });

        this.router.post("/", validation.userCreateValidation, user.createAndSignInUser);

        return this.router;
    }
}