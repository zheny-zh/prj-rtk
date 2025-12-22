import * as z from "zod";
import {
  loginResponseSchema,
  type meResponseSchemas,
} from "@/features/auth/model/auth.shemas";

export type MeResponse = z.infer<typeof meResponseSchemas>;

export type LoginResponse = z.infer<typeof loginResponseSchema>;

// Arguments
export type LoginArgs = {
  code: string;
  redirectUri: string;
  rememberMe: boolean;
  accessTokenTTL?: string; // e.g. "3m"
};
