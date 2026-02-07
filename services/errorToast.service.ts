import Toast from "react-native-toast-message";
import {
  toastServiceInputSchema,
  toastServiceInputType,
} from "../types/toast.types";
import { ZodError } from "zod";

export const showErrorToast = (input: toastServiceInputType) => {
  try {
    const { message } = toastServiceInputSchema.parse(input);

    Toast.show({
      type: "error",
      text1: message,
      position: "top",
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Toast message validation failed");
    }

    console.error("Message cannot be empty for toast", error);
  }
};
