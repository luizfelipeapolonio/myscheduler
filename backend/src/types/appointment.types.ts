import { z } from "zod";
import { appointmentCreateSchema, appointmentEditSchema } from "../validation/appointmentSchemas";

export type appointmentCreateBody = z.infer<typeof appointmentCreateSchema>;
export type appointmentEditBody = z.infer<typeof appointmentEditSchema>;