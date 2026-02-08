import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  useColorScheme,
  ScrollView,
  Platform,
  Animated,
  TextInputKeyPressEvent,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import useDeviceId from "../../modules/auth/hooks/useDeviceId";
import { useMutation } from "@tanstack/react-query";
import verifyOtpService from "../../modules/auth/services/verifyOtp.service";
import { verifyOtpServiceInputType } from "../../modules/auth/types/verifyOtp.types";
import { showErrorToast } from "../../services/errorToast.service";
import { usePermissions } from "../../modules/auth/contexts/permissionContext";
import { ActivityIndicator } from "react-native-paper";

const OTPVerificationScreen = () => {
  const { requestAllPermissions } = usePermissions();
  const { verifyPhoneOtp } = useLocalSearchParams<{
    verifyPhoneOtp: string;
  }>();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(900);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Mock phone number from previous screen
  const phoneNumber = `+234 ${verifyPhoneOtp}`;

  const mutation = useMutation({
    mutationKey: ["verify-otp", phoneNumber],
    mutationFn: (values: verifyOtpServiceInputType) => verifyOtpService(values),
    onSuccess: async () => {
      const result = await requestAllPermissions();
      if (!result.location.granted || !result.contacts.granted) {
        router.replace("/(auth)/permissions");
      } else {
        router.replace("/(app)/(tabs)/");
      }
    },
    onError: (error) => {
      console.log({ errMessage: error.message });
      showErrorToast({ message: error.message });
    },
  });

  useEffect(() => {
    // Start countdown timer
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  const { deviceId, isReady } = useDeviceId();
  if (!isReady) {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
}

  const handleOTPChange = (text: string, index: number) => {
    // Remove non-numeric characters
    const numericText = text.replace(/[^0-9]/g, "");

    const newOtp = [...otp];
    newOtp[index] = numericText;
    setOtp(newOtp);

    // Auto-focus next input
    if (numericText && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Trigger haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleKeyPress = (e: TextInputKeyPressEvent, index: number) => {
    // Handle backspace
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimer(900);
    setCanResend(false);
    console.log("Resending verification code...");
    // Add your resend logic here
  };

  const handleVerify = async () => {
    try {
      const otpCode = otp.join("");
      if (otpCode.length === 6) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("Verifying OTP:", otpCode);
        // Verification logic here and remove the leading + and spaces between phone number
        const verifyData = {
          device_id: deviceId,
          otp: otpCode,
          phone_number: phoneNumber.replace(/^\+|\s/g, ""),
        };
        return await mutation.mutateAsync(verifyData);
      } else {
        showErrorToast({ message: "Please enter a valid 6-digit code" });
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error verifying otp. Please try again";
      showErrorToast({ message: errorMessage });
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleEditNumber = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.safeAreaDark]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <Animated.View
        style={[
          styles.container,
          isDarkMode && styles.containerDark,
          { opacity: fadeAnim },
        ]}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image
              source={{
                uri: "https://flagsapi.com/NG/flat/32.png",
              }}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={[styles.title, isDarkMode && styles.titleDark]}>
              Enter 6-digit code
            </Text>
            <Text style={[styles.subtitle, isDarkMode && styles.subtitleDark]}>
              We sent a verification code to {"\n"}
              <Text
                style={[
                  styles.phoneNumber,
                  isDarkMode && styles.phoneNumberDark,
                ]}
              >
                {phoneNumber}
              </Text>
              <Text style={styles.editLink} onPress={handleEditNumber}>
                {" "}
                Edit
              </Text>
            </Text>
          </View>

          {/* OTP Inputs */}
          <View style={styles.otpContainer}>
            <View style={styles.otpInputs}>
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[
                    styles.otpInput,
                    isDarkMode && styles.otpInputDark,
                    otp[index] && styles.otpInputFilled,
                    index === 0 && {
                      borderColor: "#3b82f6",
                    },
                  ]}
                  value={otp[index]}
                  onChangeText={(text) => handleOTPChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  maxLength={1}
                  keyboardType="number-pad"
                  textAlign="center"
                  autoFocus={index === 0}
                  caretHidden={true}
                  selectTextOnFocus={true}
                />
              ))}
            </View>
          </View>

          {/* Resend Code Section */}
          <View style={styles.resendContainer}>
            <Text
              style={[styles.resendText, isDarkMode && styles.resendTextDark]}
            >
              Didn't receive the code?
            </Text>
            <TouchableOpacity
              style={[
                styles.resendButton,
                !canResend && styles.resendButtonDisabled,
              ]}
              onPress={handleResendCode}
              disabled={!canResend}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.resendButtonText,
                  isDarkMode && styles.resendButtonTextDark,
                  !canResend && styles.resendButtonTextDisabled,
                ]}
              >
                Resend code in{" "}
                <View
                  style={[
                    styles.timerBadge,
                    isDarkMode && styles.timerBadgeDark,
                  ]}
                >
                  <Text
                    style={[
                      styles.timerText,
                      isDarkMode && styles.timerTextDark,
                    ]}
                  >
                    {formatTime(timer)}
                  </Text>
                </View>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Footer with Verify Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.verifyButton}
            onPress={handleVerify}
            activeOpacity={0.9}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <>
                <Text style={styles.verifyButtonText}>Verify & Continue</Text>
                <MaterialIcons name="arrow-forward" size={24} color="white" />
              </>
            )}
          </TouchableOpacity>

          <View style={styles.securityFooter}>
            <MaterialIcons
              name="lock"
              size={14}
              color={isDarkMode ? "#9ca3af" : "#6b7280"}
            />
            <Text
              style={[
                styles.securityText,
                isDarkMode && styles.securityTextDark,
              ]}
            >
              Secured by SafeCircle
            </Text>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeAreaDark: {
    backgroundColor: "#111827",
  },
  container: {
    flex: 1,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    height: "100%",
    ...Platform.select({
      web: {
        minHeight: 800,
        borderRadius: 40,
        marginTop: 16,
        marginBottom: 16,
      },
      default: {},
    }),
  },
  containerDark: {
    backgroundColor: "#1f2937",
  },
  statusBar: {
    width: "100%",
    height: 48,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 24,
    paddingBottom: 8,
  },
  statusBarTime: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827",
  },
  statusBarTimeDark: {
    color: "white",
  },
  statusBarIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingTop: 16,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    height: 64,
    width: 200,
  },
  titleSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  titleDark: {
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: "#6b7280",
    textAlign: "center",
  },
  subtitleDark: {
    color: "#9ca3af",
  },
  phoneNumber: {
    fontWeight: "600",
    color: "#374151",
  },
  phoneNumberDark: {
    color: "#d1d5db",
  },
  editLink: {
    color: "#3b82f6",
    fontSize: 14,
    fontWeight: "500",
  },
  otpContainer: {
    width: "100%",
    marginBottom: 32,
  },
  otpInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 40,
    height: 64,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    borderWidth: 2,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    color: "#111827",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  otpInputDark: {
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "white",
  },
  otpInputFilled: {
    borderColor: "#3b82f6",
    backgroundColor: "white",
  },
  resendContainer: {
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#6b7280",
    textAlign: "center",
  },
  resendTextDark: {
    color: "#9ca3af",
  },
  resendButton: {
    marginTop: 8,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
    flexDirection: "row",
    alignItems: "center",
  },
  resendButtonTextDark: {
    color: "#60a5fa",
  },
  resendButtonTextDisabled: {
    color: "#9ca3af",
  },
  timerBadge: {
    backgroundColor: "#eff6ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 4,
  },
  timerBadgeDark: {
    backgroundColor: "rgba(59, 130, 246, 0.2)",
  },
  timerText: {
    fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
    fontSize: 14,
    fontWeight: "600",
    color: "#3b82f6",
  },
  timerTextDark: {
    color: "#93c5fd",
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    paddingTop: 16,
    backgroundColor: "white",
  },
  footerDark: {
    backgroundColor: "#1f2937",
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#3b82f6",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    shadowColor: "#1d4ed8",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  verifyButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  securityFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 32,
    opacity: 0.6,
  },
  securityText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  securityTextDark: {
    color: "#9ca3af",
  },
  loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});

export default OTPVerificationScreen;
