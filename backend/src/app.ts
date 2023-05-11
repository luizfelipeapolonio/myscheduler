import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import { prisma } from "./config/PrismaClient";
import router from "./routes/Router";
import Logger from "./config/logger";
import morganMiddleware from "./middlewares/morganMiddleware";


class App {
    private app = express();

    constructor() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Solve CORS
        this.app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

        this.app.use(morganMiddleware);

        // Load routes
        this.app.use(router);

        this.startApp();
    }

    private async startApp(): Promise<void> {
        const port: string | number = process.env.PORT || 5000;

        try {
            this.app.listen(port, () => {
                Logger.info(`Aplicação rodando na porta ${port}!`);
            });

        } catch(error) {
            Logger.error("Erro ao conectar: ", error);
            await prisma.$disconnect();
            process.exit(1);
        }
    }
}

new App();