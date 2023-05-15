import { z } from "zod";
import { appointmentCreateSchema } from "../validation/appointmentSchemas";

export type appointmentCreateBody = z.infer<typeof appointmentCreateSchema>;