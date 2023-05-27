// Types
import { IApiResponse } from "../types/shared.types";

export const extractValidationMessages = (payload: IApiResponse<object | null>): string[] | null => {
    if(payload.payload === null || !(payload.payload instanceof Array)) return null;

    const extractedMessages: string[] = [];

    Object.values(payload.payload).forEach((obj) => {
        if("path" in obj && "message" in obj) {
            extractedMessages.push(obj.message as string);
        }
    });

    return extractedMessages.length === 0 ? null : extractedMessages;
}