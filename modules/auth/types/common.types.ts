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

export const storeDataSchema = z.object({
  auth: authStateDataSchema,
});

export type storeData = z.infer<typeof storeDataSchema>;

export const permissionStateDateSchema = z.object({});

export const permissionStatusSchema = z.object({
  location: z.boolean(),
  contacts: z.boolean(),
});

export type permissionStatus = z.infer<typeof permissionStatusSchema>;

export const permissionResultSchema = z.object({
  granted: z.boolean(),
  existing: z.boolean().optional(),
  askedBefore: z.boolean().optional(),
  firstTime: z.boolean().optional(),
  error: z.string().optional(),
});

export type permissionResult = z.infer<typeof permissionResultSchema>;

export const allPermissionsResultSchema = z.object({
  location: permissionResultSchema,
  contacts: permissionResultSchema,
});

export type allPermissionsResult = z.infer<typeof allPermissionsResultSchema>;

export const permissionContextSchema = z.object({
  permissions: permissionStatusSchema,
  isLoading: z.boolean(),
  requestLocationPermission: z.function({
    input: [z.void()],
    output: z.promise(permissionResultSchema),
  }),
  requestContactsPermission: z.function({
    input: [z.void()],
    output: z.promise(permissionResultSchema),
  }),
  requestAllPermissions: z.function({
    input: [z.void()],
    output: z.promise(allPermissionsResultSchema),
  }),
  refreshPermissions: z.function({
    input: [z.void()],
    output: z.promise(z.void()),
  }),
});

export type permissionContext = z.infer<typeof permissionContextSchema>;
