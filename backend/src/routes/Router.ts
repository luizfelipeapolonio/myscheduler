import express from "express";

// Routes
import { UserRoutes } from "./UserRoutes";
import { AppointmentRoutes } from "./AppointmentRoutes";

class Router {
    private router = express();

    execute() {
        this.router.use("/api/users", new UserRoutes().routes());
        this.router.use("/api/appointments", new AppointmentRoutes().routes());

        return this.router;
    }
}

export default new Router().execute();