import { z } from "zod";
import { createAppointmentSchema, editAppointmentSchema } from "../validation/appointmentSchemas";

export type CreateAppointmentBody = z.infer<typeof createAppointmentSchema>;
export type EditAppointmentBody = z.infer<typeof editAppointmentSchema>;