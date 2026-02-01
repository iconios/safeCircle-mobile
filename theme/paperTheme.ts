import { MD3LightTheme, configureFonts } from "react-native-paper";
import { MD3Type } from "react-native-paper/lib/typescript/types";

/* =========================
   Typography (MD3)
========================= */

const fontConfig = {
  displayLarge: {
    fontFamily: "Inter-Bold",
    fontSize: 57,
    fontWeight: "700",
    lineHeight: 64,
    letterSpacing: -0.25,
  },
  displayMedium: {
    fontFamily: "Inter-Bold",
    fontSize: 45,
    fontWeight: "700",
    lineHeight: 52,
    letterSpacing: 0,
  },
  displaySmall: {
    fontFamily: "Inter-SemiBold",
    fontSize: 36,
    fontWeight: "600",
    lineHeight: 44,
    letterSpacing: 0,
  },

  headlineLarge: {
    fontFamily: "Inter-Bold",
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
    letterSpacing: 0,
  },
  headlineMedium: {
    fontFamily: "Inter-SemiBold",
    fontSize: 28,
    fontWeight: "600",
    lineHeight: 36,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontFamily: "Inter-SemiBold",
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 32,
    letterSpacing: 0,
  },

  titleLarge: {
    fontFamily: "Inter-SemiBold",
    fontSize: 22,
    fontWeight: "600",
    lineHeight: 28,
    letterSpacing: 0,
  },
  titleMedium: {
    fontFamily: "Inter-Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  titleSmall: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.1,
  },

  bodyLarge: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
    letterSpacing: 0.5,
  },
  bodyMedium: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
    letterSpacing: 0.25,
  },
  bodySmall: {
    fontFamily: "Inter-Regular",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
    letterSpacing: 0.4,
  },

  labelLarge: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 20,
    letterSpacing: 0.1,
  },
  labelMedium: {
    fontFamily: "Inter-Medium",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  labelSmall: {
    fontFamily: "Inter-Medium",
    fontSize: 11,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 0.5,
  },
} as const satisfies Record<string, MD3Type>;

const fonts = configureFonts({
  config: fontConfig,
  isV3: true,
});

/* =========================
   Colors (from logo)
========================= */

const colors = {
  primary: "#0F3D2E",
  onPrimary: "#FFFFFF",
  primaryContainer: "#C7EDE0",
  onPrimaryContainer: "#002019",

  secondary: "#2E7D32",
  onSecondary: "#FFFFFF",
  secondaryContainer: "#B7F397",
  onSecondaryContainer: "#072100",

  tertiary: "#1E88E5",
  onTertiary: "#FFFFFF",
  tertiaryContainer: "#D6E3FF",
  onTertiaryContainer: "#001B3D",

  error: "#B3261E",
  onError: "#FFFFFF",
  errorContainer: "#F9DEDC",
  onErrorContainer: "#410E0B",

  background: "#F8FAF9",
  onBackground: "#1A1C1B",

  surface: "#FFFFFF",
  onSurface: "#1A1C1B",
  surfaceVariant: "#E1E3DF",
  onSurfaceVariant: "#444746",

  outline: "#747775",
  outlineVariant: "#C4C7C5",

  shadow: "#000000",
  scrim: "#000000",
  inverseSurface: "#2F312F",
  inverseOnSurface: "#F1F3F1",
  inversePrimary: "#8ED6C2",
};

/* =========================
   FINAL THEME EXPORT ✅
========================= */

const AppTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
  fonts,
};

export default AppTheme;
