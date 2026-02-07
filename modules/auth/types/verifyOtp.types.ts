import { z } from "zod";

export const verifyOtpServiceInputSchema = z
  .object({
    phone_number: z.string().min(1),
    device_id: z.string().min(1),
    otp: z.string().regex(/^\d{6}$/),
  })
  .strict();

export type verifyOtpServiceInputType = z.infer<
  typeof verifyOtpServiceInputSchema
>;

export const verifyOtpServiceResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z
    .object({
      userId: z.uuid(),
      phoneNumber: z.string(),
      email: z.string(),
      firstName: z.string(),
      token: z.string(),
    })
    .or(z.null()),
  error: z
    .object({
      code: z.string(),
      details: z.string(),
    })
    .or(z.null()),
  metadata: z.object({
    timestamp: z.iso.datetime(),
  }),
});

export type verifyOtpServiceResponseType = z.infer<
  typeof verifyOtpServiceResponseSchema
>;
