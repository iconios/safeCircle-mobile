import { ErrorToast, ToastConfig } from "react-native-toast-message";

export const toastConfig: ToastConfig = {
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 16,
        color: "#FFFFFF",
        fontWeight: "500",
      }}
      text2Style={{
        fontSize: 13,
        color: "#FEE2E2",
      }}
      style={{
        backgroundColor: "#DC2626", // 🔴 red background
        borderLeftColor: "#B91C1C",
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
    />
  ),
};
