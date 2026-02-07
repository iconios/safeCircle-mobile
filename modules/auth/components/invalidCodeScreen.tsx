import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const MAX_WIDTH = 400;

export default function InvalidCodeScreen() {
  const [shakeAnimation] = useState(new Animated.Value(0));
  const [code, setCode] = useState(["8", "2", "0", "5", "9", "1"]);

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTryAgain = () => {
    triggerShake();
    // Add your try again logic here
  };

  const handleResendCode = () => {
    // Add your resend code logic here
  };

  const handleBack = () => {
    // Add back navigation logic here
  };

  const handleHelp = () => {
    // Add help logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        <View style={[styles.mainContainer, { maxWidth: MAX_WIDTH }]}>
          {/* Top App Bar */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={handleBack}
              activeOpacity={0.7}
            >
              <MaterialIcons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>

            <Text style={styles.title}>Verify Phone</Text>

            <TouchableOpacity
              style={styles.helpButton}
              onPress={handleHelp}
              activeOpacity={0.7}
            >
              <Text style={styles.helpText}>Help</Text>
            </TouchableOpacity>
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Error Status */}
            <Animated.View
              style={[
                styles.errorContainer,
                { transform: [{ translateX: shakeAnimation }] },
              ]}
            >
              <View style={styles.errorIconContainer}>
                <View style={styles.errorIconCircle}>
                  <MaterialIcons name="lock-open" size={48} color="#dc2626" />
                  <View style={styles.errorBadge}>
                    <MaterialIcons
                      name="priority-high"
                      size={14}
                      color="#000"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.errorTextContainer}>
                <Text style={styles.errorTitle}>Incorrect code</Text>
                <Text style={styles.errorDescription}>
                  The code you entered doesn't match. Please try again.
                </Text>
              </View>
            </Animated.View>

            {/* Inputs */}
            <View style={styles.inputsContainer}>
              <View style={styles.inputsWrapper}>
                {code.map((digit, index) => (
                  <View key={index} style={styles.inputWrapper}>
                    <TextInput
                      style={[styles.codeInput, styles.codeInputError]}
                      value={digit}
                      editable={false}
                      keyboardType="numeric"
                      maxLength={1}
                      selectTextOnFocus={false}
                    />
                  </View>
                ))}
              </View>
            </View>

            {/* Security Note */}
            <View style={styles.securityNote}>
              <View style={styles.noteContainer}>
                <MaterialCommunityIcons
                  name="shield-check"
                  size={24}
                  color="#64748b"
                  style={styles.shieldIcon}
                />
                <Text style={styles.noteText}>
                  For your security, too many attempts may temporarily lock your
                  account.
                </Text>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.primaryButton}
              onPress={handleTryAgain}
              activeOpacity={0.8}
            >
              <View style={styles.buttonShine} />
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>

            <View style={styles.secondaryButtonContainer}>
              <TouchableOpacity
                style={styles.secondaryButton}
                onPress={handleResendCode}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryButtonText}>Resend Code</Text>
                <MaterialIcons name="refresh" size={20} color="#1e293b" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f8f6",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 16,
  },
  mainContainer: {
    width: "100%",
    flex: 1,
    backgroundColor: "#f6f8f6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    paddingBottom: 8,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
    flex: 1,
  },
  helpButton: {
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  helpText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#61896f",
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  errorContainer: {
    alignItems: "center",
    gap: 24,
    marginBottom: 40,
    width: "100%",
  },
  errorIconContainer: {
    alignItems: "center",
  },
  errorIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#fee2e2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#fecaca",
    position: "relative",
  },
  errorBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#13ec5b",
    borderRadius: 12,
    padding: 4,
    borderWidth: 2,
    borderColor: "#f6f8f6",
  },
  errorTextContainer: {
    alignItems: "center",
    gap: 12,
    maxWidth: 480,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    textAlign: "center",
  },
  errorDescription: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 320,
  },
  inputsContainer: {
    width: "100%",
    marginBottom: 40,
  },
  inputsWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
  },
  inputWrapper: {
    width: 44,
  },
  codeInput: {
    height: 56,
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    padding: 0,
    backgroundColor: "transparent",
  },
  codeInputError: {
    color: "#dc2626",
    borderBottomWidth: 2,
    borderBottomColor: "#ef4444",
  },
  securityNote: {
    width: "100%",
  },
  noteContainer: {
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  shieldIcon: {
    marginTop: 2,
  },
  noteText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#475569",
    lineHeight: 20,
    flex: 1,
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    marginTop: "auto",
    width: "100%",
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#13ec5b",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#13ec5b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonShine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111813",
    letterSpacing: 0.15,
  },
  secondaryButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 8,
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1e293b",
  },
});
