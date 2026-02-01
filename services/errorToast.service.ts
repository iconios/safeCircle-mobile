import { Toast } from "toastify-react-native";
import { toastServiceInputSchema } from "../types/toast.types";

export const showErrorToast = (input: unknown) => {
  const result = toastServiceInputSchema.safeParse(input);

  if (!result.success) {
    console.warn("Invalid toast input", result.error);
    return;
  }

  const { message } = result.data;

  Toast.show({
    type: "error",
    text1: message,
    position: "top",
    backgroundColor: "red",
    textColor: "white",
    icon: "exclamation-circle",
    iconColor: "white",
    iconFamily: "FontAwesome",
    iconSize: 48,
  });
};
