
import { z } from "zod";

export const scheduleFormSchema = z.object({
  scaleName: z.string().min(1, "O nome da escala é obrigatório"),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  selectedCooperatorIds: z.array(z.string()),
});

export type ScheduleFormValues = z.infer<typeof scheduleFormSchema>;
