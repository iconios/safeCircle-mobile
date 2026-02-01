import { z } from "zod";

export const toastServiceInputSchema = z.object({
  message: z.string().min(1),
});

export type toastServiceInputType = z.infer<typeof toastServiceInputSchema>;
