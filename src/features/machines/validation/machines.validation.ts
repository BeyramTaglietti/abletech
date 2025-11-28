import z from "zod";

export const newMachineSchema = z.object({
  name: z.string().min(1),
  customer: z.string().min(1),
  operational_date: z.string().min(1),
});
