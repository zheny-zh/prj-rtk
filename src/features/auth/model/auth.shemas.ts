import * as z from "zod";

export const meResponseSchemas = z.object({
  userId: z.string(),
  login: z.string(),
});

export const loginResponseSchema = z.object({
  refreshToken: z.jwt(),
  accessToken: z.jwt(),
});
