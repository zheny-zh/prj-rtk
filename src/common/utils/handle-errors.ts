import { toast } from "react-toastify";
import { isErrorWithProperty } from "@/common/utils/is-error-with-property";
import { isErrorWithDetailArray } from "@/common/utils/is-error-with-detail-array";
import { trimToMaxLength } from "@/common/utils/trim-to-max-length";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { errorToast } from "@/common/utils/error-toast";

export const handleErrors = (error: FetchBaseQueryError) => {
  switch (error.status) {
    case "FETCH_ERROR":
    case "PARSING_ERROR":
    case "CUSTOM_ERROR":
    case "TIMEOUT_ERROR":
      errorToast(error.error);
      break;

    case 404:
      if (isErrorWithProperty(error.data, "error")) {
        errorToast(error.data.error);
      } else {
        errorToast(JSON.stringify(error.data));
      }
      break;

    case 429:
      if (isErrorWithProperty(error.data, "message")) {
        errorToast(error.data.message);
      } else {
        errorToast(JSON.stringify(error.data));
      }
      break;

    case 400:
      if (isErrorWithDetailArray(error.data)) {
        const errorMessage = error.data.errors[0].detail;
        if (errorMessage.includes("refresh")) {
          return;
        }
        errorToast(trimToMaxLength(errorMessage));
      } else {
        toast(JSON.stringify(error.data), {
          type: "error",
          theme: "colored",
        });
      }
      break;

    case 403:
      if (isErrorWithDetailArray(error.data)) {
        errorToast(trimToMaxLength(error.data.errors[0].detail));
      } else {
        toast(JSON.stringify(error.data), {
          type: "error",
          theme: "colored",
        });
      }
      break;

    default:
      if (error.status >= 500 && error.status < 600) {
        errorToast("Server error occurred. Please try again later.");
      } else {
        errorToast("Some error occurred");
      }
  }
};
