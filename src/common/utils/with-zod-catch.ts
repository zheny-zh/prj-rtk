import type { ZodType } from "zod";
import type {
  FetchBaseQueryError,
  NamedSchemaError,
} from "@reduxjs/toolkit/query";
import { errorToast } from "@/common/utils/error-toast";

export const withZodCatch = <T extends ZodType>(schema: T) => ({
  responseSchema: schema,
  catchSchemaFailure: (err: NamedSchemaError): FetchBaseQueryError => {
    errorToast("Zod error", err.issues);
    return {
      status: "CUSTOM_ERROR",
      error: "Schema validation failed",
    };
  },
});
