import express from "express";

// Routes
import { UserRoutes } from "./UserRoutes";

class Router {
    private router = express();

    execute() {
        this.router.use("/api/users", new UserRoutes().routes());
        // this.router.use("/api/appointments");

        return this.router;
    }
}

export default new Router().execute();