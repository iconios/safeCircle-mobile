import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  Linking,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Formik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  phoneFormSchema,
  signupUserDataType,
} from "../../modules/auth/types/signup.types";
import { useMutation } from "@tanstack/react-query";
import signupService from "../../modules/auth/services/signupService";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { showErrorToast } from "../../services/errorToast.service";
import useDeviceId from "../../modules/auth/hooks/useDeviceId";

type FormValues = { phone_number: string };

export default function PhoneVerificationScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDarkMode = colorScheme === "dark";
  const [selectedChannel, setSelectedChannel] = useState<"whatsapp" | "sms">(
    "whatsapp",
  );
  const COUNTRY_CODE = "234";  

  const openUrlSafely = async (url: string) => {
    try {
      const canOpen = await Linking.canOpenURL(url);
      if (!canOpen) {
        Alert.alert("Unable to open link", url);
        return;
      }
      await Linking.openURL(url);
    } catch {
      Alert.alert("Unable to open link", url);
    }
  };

  const handleTermsPress = useCallback(() => {
    openUrlSafely("https://nerdywebconsults.ng/terms");
  }, []);
  const handlePrivacyPress = useCallback(() => {
    openUrlSafely("https://nerdywebconsults.ng/privacy");
  }, []);

  const formatPhoneNumber = (text: string) => {
    const numericText = text.replaceAll(/\D/g, "");

    // Format as "800 000 0000"
    if (numericText.length <= 3) return numericText;
    if (numericText.length <= 6)
      return `${numericText.slice(0, 3)} ${numericText.slice(3)}`;

    return `${numericText.slice(0, 3)} ${numericText.slice(
      3,
      6,
    )} ${numericText.slice(6, 10)}`;
  };

  const mutation = useMutation({
    mutationFn: async (values: signupUserDataType) =>
      await signupService(values),
    mutationKey: ["phone-auth"],
    onSuccess: () => {
    },
    onError: (error) => {
      showErrorToast({ message: error });
    },
  });
  
  const { deviceId, isReady } = useDeviceId();
  if (!isReady) return null;
  const isDeviceReady = Boolean(deviceId);

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode && styles.safeAreaDark]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />

      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        <Formik<FormValues>
          initialValues={{ phone_number: "" }}
          validationSchema={toFormikValidationSchema(phoneFormSchema)}
          validateOnBlur
          validateOnChange={false}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(true);
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              const phoneNoSpace = values.phone_number.replace(/\s/g, "");
              const signupData = {
                phone_number: `${COUNTRY_CODE}${phoneNoSpace}`,
                channel: selectedChannel,
                device_id: deviceId,
              };
              console.log("Sending verification code", signupData);
              await mutation.mutateAsync(signupData);

              router.push({
                pathname: "/(auth)/[verifyPhoneOtp]",
                params: {verifyPhoneOtp: values.phone_number}
              });
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            handleBlur,
            touched,
            errors,
            values,
            setFieldValue,
            submitForm,
            isSubmitting,
            isValid,
          }) => (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
              keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0} // Adjust as needed
            >
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
              >
                {/* Main Content */}
                <View style={styles.mainContent}>
                  {/* Title Section */}
                  <View style={styles.titleSection}>
                    <Text
                      style={[styles.title, isDarkMode && styles.titleDark]}
                    >
                      Enter your Nigerian phone number
                    </Text>
                    <Text
                      style={[
                        styles.subtitle,
                        isDarkMode && styles.subtitleDark,
                      ]}
                    >
                      Connect with your SafeCircle. We need to verify your
                      identity to keep your circle secure.
                    </Text>
                  </View>

                  {/* Form Section */}
                  <View style={styles.formSection}>
                    {/* Phone Input */}
                    <View style={styles.inputGroup}>
                      <Text
                        style={[styles.label, isDarkMode && styles.labelDark]}
                      >
                        MOBILE NUMBER
                      </Text>

                      <View style={styles.phoneInputContainer}>
                        <View
                          style={[
                            styles.countryCode,
                            isDarkMode && styles.countryCodeDark,
                          ]}
                        >
                          <Image
                            source={{
                              uri: "https://flagsapi.com/NG/flat/32.png",
                            }}
                            style={styles.flag}
                          />
                          <Text
                            style={[
                              styles.countryCodeText,
                              isDarkMode && styles.countryCodeTextDark,
                            ]}
                          >
                            +234
                          </Text>
                        </View>

                        <TextInput
                          style={[
                            styles.phoneInput,
                            isDarkMode && styles.phoneInputDark,
                            values.phone_number && styles.phoneInputFilled,
                            touched.phone_number &&
                              errors.phone_number &&
                              styles.inputError,
                          ]}
                          value={values.phone_number}
                          onChangeText={(text) =>
                            setFieldValue(
                              "phone_number",
                              formatPhoneNumber(text),
                            )
                          }
                          placeholder="800 000 0000"
                          placeholderTextColor={
                            isDarkMode ? "#6b7280" : "#d1d5db"
                          }
                          keyboardType="numeric"
                          onBlur={handleBlur("phone_number")}
                          maxLength={12}
                          returnKeyType="done"
                          accessibilityLabel="Phone number input"
                          accessibilityHint="Enter your Nigerian mobile number"
                        />
                      </View>

                      {touched.phone_number && errors.phone_number && (
                        <Text style={styles.errorText}>
                          {errors.phone_number}
                        </Text>
                      )}

                      <View style={styles.securityNote}>
                        <MaterialIcons name="lock" size={14} color="#9ca3af" />
                        <Text
                          style={[
                            styles.securityText,
                            isDarkMode && styles.securityTextDark,
                          ]}
                        >
                          Your number is encrypted and never shared.
                        </Text>
                      </View>
                    </View>

                    {/* Channel Selection */}
                    <View style={styles.channelGroup}>
                      <Text
                        style={[styles.label, isDarkMode && styles.labelDark]}
                      >
                        CHANNEL PREFERENCE
                      </Text>

                      {/* WhatsApp Option */}
                      <TouchableOpacity
                        style={[
                          styles.channelOption,
                          isDarkMode && styles.channelOptionDark,
                          selectedChannel === "whatsapp" &&
                            styles.channelOptionSelected,
                        ]}
                        onPress={() => setSelectedChannel("whatsapp")}
                        activeOpacity={0.8}
                      >
                        <View style={styles.channelContent}>
                          <View style={styles.channelLeft}>
                            <View style={styles.whatsappIcon}>
                              <View style={{ width: 20, height: 20 }}>
                                <MaterialCommunityIcons
                                  name="whatsapp"
                                  size={20}
                                  color="#25D366"
                                />
                              </View>
                            </View>

                            <View style={styles.channelText}>
                              <Text
                                style={[
                                  styles.channelTitle,
                                  isDarkMode && styles.channelTitleDark,
                                ]}
                              >
                                Verify via WhatsApp
                              </Text>
                              <View style={styles.channelBadge}>
                                <View style={styles.pulsingDot} />
                                <Text style={styles.channelBadgeText}>
                                  Easiest & Most Convenient
                                </Text>
                              </View>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.radioOuter,
                              selectedChannel === "whatsapp" &&
                                styles.radioOuterSelected,
                            ]}
                          >
                            {selectedChannel === "whatsapp" && (
                              <View style={styles.radioInner} />
                            )}
                          </View>
                        </View>

                        {selectedChannel === "whatsapp" && (
                          <View style={styles.channelInfo}>
                            <MaterialIcons
                              name="info"
                              size={16}
                              color="#3b82f6"
                            />
                            <Text
                              style={[
                                styles.channelInfoText,
                                isDarkMode && styles.channelInfoTextDark,
                              ]}
                            >
                              We'll send a 6-digit code to your WhatsApp
                              account. Make sure you have the app installed on
                              this device.
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>

                      {/* SMS Option */}
                      <TouchableOpacity
                        style={[
                          styles.channelOption,
                          isDarkMode && styles.channelOptionDark,
                          selectedChannel === "sms" &&
                            styles.channelOptionSelected,
                        ]}
                        onPress={() => setSelectedChannel("sms")}
                        activeOpacity={0.8}
                      >
                        <View style={styles.channelContent}>
                          <View style={styles.channelLeft}>
                            <View style={styles.smsIcon}>
                              <MaterialIcons
                                name="sms"
                                size={20}
                                color={isDarkMode ? "#60a5fa" : "#3b82f6"}
                              />
                            </View>

                            <View style={styles.channelText}>
                              <Text
                                style={[
                                  styles.channelTitle,
                                  isDarkMode && styles.channelTitleDark,
                                ]}
                              >
                                Verify via SMS
                              </Text>
                              <Text
                                style={[
                                  styles.channelSubtitle,
                                  isDarkMode && styles.channelSubtitleDark,
                                ]}
                              >
                                Standard text message
                              </Text>
                            </View>
                          </View>

                          <View
                            style={[
                              styles.radioOuter,
                              selectedChannel === "sms" &&
                                styles.radioOuterSelected,
                            ]}
                          >
                            {selectedChannel === "sms" && (
                              <View style={styles.radioInner} />
                            )}
                          </View>
                        </View>

                        {selectedChannel === "sms" && (
                          <View style={styles.channelInfo}>
                            <MaterialIcons
                              name="info"
                              size={16}
                              color={isDarkMode ? "#9ca3af" : "#6b7280"}
                            />
                            <Text
                              style={[
                                styles.channelInfoText,
                                isDarkMode && styles.channelInfoTextDark,
                              ]}
                            >
                              We'll send a verification code via SMS. Carrier
                              rates may apply depending on your mobile plan.
                            </Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.spacer} />
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                  <TouchableOpacity
                    style={[
                      styles.sendButton,
                      (!isValid || isSubmitting) && { opacity: 0.6 },
                    ]}
                    onPress={submitForm}
                    disabled={!isValid || isSubmitting || !isDeviceReady || !values.phone_number}
                    activeOpacity={0.9}
                  >
                    <Text style={styles.sendButtonText}>
                      {isSubmitting ? "Sending..." : "Send Verification Code"}
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.termsContainer}>
                    <Text
                      style={[
                        styles.termsText,
                        isDarkMode && styles.termsTextDark,
                      ]}
                    >
                      By continuing, you agree to SafeCircle NG's{" "}
                      <Text style={styles.link} onPress={handleTermsPress}>
                        Terms of Service
                      </Text>{" "}
                      and{" "}
                      <Text style={styles.link} onPress={handlePrivacyPress}>
                        Privacy Policy
                      </Text>
                      .
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </KeyboardAvoidingView>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9fafb" },
  safeAreaDark: { backgroundColor: "#111827" },
  container: {
    flex: 1,
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  containerDark: { backgroundColor: "#1f2937" },
  scrollView: { flex: 1 },
  scrollContent: { flexGrow: 1 },
  mainContent: { paddingHorizontal: 24, paddingTop: 8 },
  titleSection: { marginBottom: 32 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    lineHeight: 32,
    color: "#111827",
    marginBottom: 8,
  },
  titleDark: { color: "#f9fafb" },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    color: "#6b7280",
  },
  subtitleDark: { color: "#9ca3af" },
  formSection: { gap: 32 },
  inputGroup: { gap: 8 },
  label: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#6b7280",
    marginLeft: 4,
  },
  labelDark: { color: "#9ca3af" },
  phoneInputContainer: { flexDirection: "row", alignItems: "center" },
  countryCode: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#e5e7eb",
    backgroundColor: "rgba(249, 250, 251, 0.5)",
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    zIndex: 1,
  },
  countryCodeDark: {
    borderRightColor: "#4b5563",
    backgroundColor: "rgba(31, 41, 55, 0.3)",
  },
  flag: {
    width: 24,
    height: 16,
    borderRadius: 2,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  countryCodeText: { fontSize: 18, fontWeight: "700", color: "#111827" },
  countryCodeTextDark: { color: "#f9fafb" },
  phoneInput: {
    flex: 1,
    height: 56,
    paddingLeft: 112,
    paddingRight: 16,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    fontSize: 20,
    fontWeight: "600",
    letterSpacing: 2,
    color: "#111827",
  },
  phoneInputDark: {
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "#f9fafb",
  },
  phoneInputFilled: { letterSpacing: 2 },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginLeft: 4,
  },
  securityText: { fontSize: 11, color: "#9ca3af" },
  securityTextDark: { color: "#9ca3af" },
  channelGroup: { gap: 12 },
  channelOption: {
    padding: 16,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#f3f4f6",
    borderRadius: 12,
    gap: 8,
  },
  channelOptionDark: { backgroundColor: "#374151", borderColor: "#4b5563" },
  channelOptionSelected: { borderColor: "rgba(59, 130, 246, 0.3)" },
  channelContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  channelLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  whatsappIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(37, 211, 102, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  smsIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(59, 130, 246, 0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  channelText: { gap: 2 },
  channelTitle: { fontSize: 14, fontWeight: "700", color: "#111827" },
  channelTitleDark: { color: "#f9fafb" },
  channelBadge: { flexDirection: "row", alignItems: "center", gap: 4 },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3b82f6",
  },
  channelBadgeText: { fontSize: 12, fontWeight: "700", color: "#3b82f6" },
  channelSubtitle: { fontSize: 12, color: "#9ca3af" },
  channelSubtitleDark: { color: "#6b7280" },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#d1d5db",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: { borderColor: "#3b82f6", backgroundColor: "#3b82f6" },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  channelInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    paddingHorizontal: 8,
  },
  channelInfoText: { flex: 1, fontSize: 12, lineHeight: 16, color: "#6b7280" },
  channelInfoTextDark: { color: "#9ca3af" },
  spacer: { minHeight: 40 },
  footer: { paddingHorizontal: 24, paddingBottom: 24, gap: 16 },
  sendButton: {
    height: 56,
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    overflow: "hidden",
  },
  sendButtonText: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "white",
  },
  termsContainer: { paddingHorizontal: 16 },
  termsText: {
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    color: "#9ca3af",
  },
  termsTextDark: { color: "#6b7280" },
  link: { color: "#3b82f6", textDecorationLine: "underline" },
  inputError: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
});
