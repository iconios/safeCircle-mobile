import { Alert } from "react-native";
import OTPVerificationScreen from "../../../app/(auth)/[verifyPhoneOtp]";

const PhoneVerification = (
  phone: string,
  channel: string,
  deviceId: string,
) => {
  if (!phone) return;

  Alert.alert(
    `Verify 0${phone}`,
    `Are you sure your phone number ${phone} is correct?`,
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => <OTPVerificationScreen />,
      },
    ],
  );
};

export default PhoneVerification;
