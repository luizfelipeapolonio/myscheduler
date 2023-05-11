import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Logger from "../config/logger";

export class userUtils {
    generateToken(id: string): string | null {
        const jwtSecret: string | undefined = process.env.JWT_SECRET;

        if(!jwtSecret) {
            Logger.error("JWT Secret não definido do arquivo .env");
            return null;
        }

        const token: string = jwt.sign({ id }, jwtSecret, {
            expiresIn: "7d"
        });

        return token;
    }

    async generatePasswordHash(password: string): Promise<string | null> {
        try {
            const salt: string = await bcrypt.genSalt();
            const passwordHash: string = await bcrypt.hash(password, salt);

            return passwordHash;

        } catch(error) {
            Logger.error("Erro ao gerar hash da senha --> " + `Erro: ${error}`);
            return null;
        }
    }
}