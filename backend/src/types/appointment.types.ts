import { z } from "zod";
import { createAppointmentSchema, editAppointmentSchema, getAppointmentByDateSchema } from "../validation/appointmentSchemas";

export type CreateAppointmentBody = z.infer<typeof createAppointmentSchema>;
export type EditAppointmentBody = z.infer<typeof editAppointmentSchema>;
export type GetAppointmentByDateBody = z.infer<typeof getAppointmentByDateSchema>;