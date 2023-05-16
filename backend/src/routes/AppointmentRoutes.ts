import { Request, Response, Router } from "express";

// Controller
import { AppointmentController } from "../controllers/AppointmentController";

// Middlewares
import { AuthGuard } from "../middlewares/authGuard";
import { HandleValidation } from "../middlewares/handleValidation";

export class AppointmentRoutes {
    private router = Router();

    routes() {
        const appointment = new AppointmentController();
        const auth = new AuthGuard();
        const validation = new HandleValidation();

        this.router.get("/test", (req: Request, res: Response) => {
            return res.send("Rotas de compromissos funcionando!");
        });

        this.router.get("/", auth.execute, appointment.getAllUserAppointments);
        this.router.post("/appointment", auth.execute, validation.appointmentCreateValidation, appointment.create);
        this.router.get("/:id", auth.execute, appointment.getAppointmentById);
        return this.router;
    }
}