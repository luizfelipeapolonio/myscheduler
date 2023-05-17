import { Request, Response, Router } from "express";

// Middlewares
import { HandleValidation } from "../middlewares/handleValidation";
import { AuthGuard } from "../middlewares/authGuard";

// Controller
import { UserController } from "../controllers/UserController";

export class UserRoutes {
    private router = Router();

    routes() {
        const validation = new HandleValidation();
        const user = new UserController();
        const auth = new AuthGuard();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Rotas de usuário funcionando!");
        });

        this.router.post("/register", validation.createUser, user.createAndSignInUser);
        this.router.post("/login", validation.signInUser, user.signIn);
        this.router.get("/user", auth.execute, user.getCurrentUser);
        this.router.patch("/user", auth.execute, validation.updateUser, user.update);
        this.router.delete("/user", auth.execute, user.delete);

        return this.router;
    }
}