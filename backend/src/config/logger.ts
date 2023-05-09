import winston from "winston";

type LogOptions<T extends string | number> = {
    error: T,
    warn: T,
    info: T,
    http: T,
    debug: T
}

// Priority levels
const levels: LogOptions<number> = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const level = (): string => {
    const env: string = process.env.ENV || "development";
    const isDevelopment: boolean = env === "development";
    
    return isDevelopment ? "debug" : "warn";
}

// Message colors
const colors: LogOptions<string> = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
}

winston.addColors(colors);

// Define log message pattern
const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.colorize({ all: true }),
    winston.format.printf((info) => {
        return `${info.timestamp} - ${info.level} - ${info.message}`;
    })
);

// Define logs directory and logs files name
const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: "log/error.log",
        level: "error"
    }),
    new winston.transports.File({ filename: "log/all.log" })
];

// Create the logger itself
const Logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
});

export default Logger;