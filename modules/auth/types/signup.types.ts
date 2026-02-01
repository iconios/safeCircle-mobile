import { z } from "zod";

export const PhoneNumberSchema = z.preprocess(
  (val) => val ?? "",
  z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s]+$/, "Phone number can only contain digits and spaces")
    .transform((val) => val.replace(/\s/g, ""))
    .refine((val) => val.length === 10, {
      message: "Phone number must be exactly 10 digits",
    }),
);

export const phoneFormSchema = z.object({
  phone_number: PhoneNumberSchema,
});

export const signupUserDataSchema = z.object({
  phone_number: PhoneNumberSchema,
  channel: z.enum(["sms", "whatsapp"]),
  device_id: z.string().min(1, "Device ID is required"),
});

export type signupUserDataType = z.infer<typeof signupUserDataSchema>;

export const signUpAuthServerResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object().nullable(),
  error: z
    .object({
      code: z.string(),
      details: z.string(),
    })
    .nullable(),
  metadata: z.object({
    timestamp: z.iso.datetime(),
    phoneNumber: z.string().optional(),
  }),
});

export type signUpAuthServerResponseType = z.infer<
  typeof signUpAuthServerResponseSchema
>;

export const signupServiceInputSchema = z
  .object({
    phone_number: z.string().regex(/^234\d{10}$/),
    channel: z.string(),
    device_id: z.string(),
  })
  .strict();

export type signupServiceInputType = z.infer<typeof signupServiceInputSchema>;
