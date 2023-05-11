import { Request, Response } from "express";
import { Send } from "express-serve-static-core";

export interface ITypedRequestBody<T> extends Request {
    body: T;
}

export interface ITypedResponse<T> extends Response {
    json: Send<T, this>;
}

export interface IJSONResponse<T> {
    status: "error" | "success",
    message: string;
    payload: T;
}