import morgan, { StreamOptions } from "morgan";
import Logger from "../config/logger";

const stream: StreamOptions = {
    write: (message: string) => Logger.http(message),
};

const skip = (): boolean => {
    const env: string = process.env.ENV || "development";
    return env !== "development";
}

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] :response-time ms",
    { stream, skip }
);

export default morganMiddleware;