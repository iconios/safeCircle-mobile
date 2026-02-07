import { z } from "zod";

export const authStateDataSchema = z.object({
  isLoggedIn: z.boolean(),
  token: z.string(),
  userId: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  firstname: z.string(),
});

export type authStateData = z.infer<typeof authStateDataSchema>;
