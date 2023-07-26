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
        this.router.post("/", auth.execute, validation.getAppointmentByDate, appointment.getAppointmentsByDate);
        this.router.post("/appointment", auth.execute, validation.createAppointment, appointment.create);
        this.router.patch("/appointment", auth.execute, validation.editAppointment, appointment.edit);
        this.router.get("/appointment/:id", auth.execute, appointment.getAppointmentById);
        this.router.delete("/appointment/:id", auth.execute, appointment.delete);
        
        return this.router;
    }
}