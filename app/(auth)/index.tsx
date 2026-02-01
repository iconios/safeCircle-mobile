import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, useTheme } from "react-native-paper";
import { useRouter } from "expo-router";

export default function WelcomeAuthScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  const theme = useTheme();
  const router = useRouter();

  const handleCreateAccount = () => {
    router.push("/(auth)/signup");
  };

  const handleLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container} edges={["left", "right"]}>
      {/* Top Section: Logo & Tagline */}
      <View style={styles.topSection}>
        <View style={styles.logoContainer}>
          <View style={styles.circlesContainer}>
            {/* Concentric Circles Representation */}
            <View style={styles.circleLarge} />
            <View style={styles.circleMedium} />

            {/* Brand Shield Icon */}
            <View style={styles.shieldContainer}>
              <MaterialIcons name="security" size={36} color="white" />
            </View>

            {/* Branding Dots */}
            <View style={styles.greenDot} />
            <View style={styles.blueDot} />
            <View style={styles.yellowDot} />
          </View>
        </View>

        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          SafeCircle
        </Text>
        <Text style={[styles.tagline, isDarkMode && styles.taglineDark]}>
          Your personal safety network
        </Text>
      </View>

      {/* Middle Section: Abstract Watermark */}
      <View style={styles.watermarkContainer}>
        <View style={styles.watermarkCircle}>
          <MaterialIcons
            name="security"
            size={200}
            color={theme.colors.tertiary}
          />
        </View>
      </View>

      {/* Buttons Container */}
      <View style={styles.buttonsContainer}>
        {/* Primary Button */}
        <Button
          mode="contained"
          onPress={handleCreateAccount}
          labelStyle={styles.primaryButtonText}
          contentStyle={styles.primaryButton}
        >
          Create Account
        </Button>

        {/* Secondary Button */}
        <Button
          mode="outlined"
          onPress={handleLogin}
          style={styles.secondaryButton}
          labelStyle={styles.secondaryButtonText}
        >
          Log In
        </Button>
      </View>

      {/* Trust Footer */}
      <View style={styles.trustContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="lock"
            size={18}
            color={isDarkMode ? "#64748b" : "#94a3b8"}
          />
        </View>
        <Text
          style={[
            styles.trustText,
            isDarkMode && styles.trustTextDark,
            { textAlign: "center" },
          ]}
        >
          Your data is secure, private, and encrypted.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
  },
  topSection: {
    marginTop: 80,
    paddingHorizontal: 32,
    alignItems: "center",
    zIndex: 10,
  },
  logoContainer: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  circlesContainer: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
  },
  circleLarge: {
    position: "absolute",
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 2,
    borderColor: "rgba(59, 130, 246, 0.2)", // primary/20
  },
  circleMedium: {
    position: "absolute",
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "rgba(59, 130, 246, 0.3)", // primary/30
  },
  shieldContainer: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: "#3b82f6", // primary color
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  greenDot: {
    position: "absolute",
    right: -8,
    top: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#10b981", // green-500
    borderWidth: 2,
    borderColor: "white",
  },
  blueDot: {
    position: "absolute",
    right: -4,
    bottom: 16,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#3b82f6", // blue-500
    borderWidth: 2,
    borderColor: "white",
  },
  yellowDot: {
    position: "absolute",
    left: 0,
    bottom: -4,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#f59e0b", // yellow-500
    borderWidth: 2,
    borderColor: "white",
  },
  title: {
    fontSize: 30,
    fontWeight: "700",
    letterSpacing: -0.5,
    color: "#0f172a", // slate-900
    textAlign: "center",
  },
  titleDark: {
    color: "white",
  },
  tagline: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "500",
    color: "#64748b", // slate-500
    textAlign: "center",
  },
  taglineDark: {
    color: "#94a3b8", // slate-400
  },
  watermarkContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
    opacity: 0.08,
  },
  watermarkCircle: {
    width: 400,
    height: 400,
    borderRadius: 200,
    borderWidth: 40,
    borderColor: "#3b82f6", // primary color
    alignItems: "center",
    justifyContent: "center",
  },
  buttonsContainer: {
    width: "100%",
    maxWidth: 480,
    gap: 12,
    position: "absolute",
    bottom: 96,
    left: 16,
  },
  primaryButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#3b82f6", // primary color
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: "hidden",
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  secondaryButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#3b82f6", // primary color
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    overflow: "hidden",
  },
  secondaryButtonText: {
    color: "#3b82f6", // primary color
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  trustContainer: {
    marginTop: 24,
    alignItems: "center",
    position: "absolute",
    bottom: 36,
    justifyContent: "center",
  },
  trustContent: {
    flexDirection: "row",
    gap: 8,
    position: "absolute",
    bottom: 48,
    left: 36,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  trustText: {
    color: "#64748b",
    textAlign: "center",
  },
  trustTextDark: {
    color: "#94a3b8", // slate-400
  },
});
