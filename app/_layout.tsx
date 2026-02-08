import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import AppTheme from "../theme/paperTheme";
import { useFonts } from "expo-font";
import { Asset } from "expo-asset";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { toastConfig } from "../config/toast.config";
import { Provider } from "react-redux";
import store from "../store";
import { PermissionProvider } from "../modules/auth/contexts/permissionContext";

SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // replace later

  /** Load fonts */
  const [fontsLoaded] = useFonts({
    "Inter-Regular": require("../assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Medium": require("../assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("../assets/fonts/Inter_18pt-SemiBold.ttf"),
    "Inter-Bold": require("../assets/fonts/Inter_18pt-Bold.ttf"),
  });

  /** Load images / other assets */
  const loadAssets = async () => {
    await Asset.loadAsync([
      require("../assets/young-woman.png"),
      require("../assets/splash.png"),
      require("../assets/nigerian-people.png"),
      require("../assets/emergency-sos.png"),
      require("../assets/logo.png"),
    ]);
  };

  /** Prepare app */
  useEffect(() => {
    async function prepare() {
      try {
        if (!fontsLoaded) return;

        await loadAssets();

        await new Promise((resolve) => setTimeout(resolve, 1200));
        setIsAuthenticated(false);
      } catch (error) {
        console.warn("App preparation error:", error);
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, [fontsLoaded]);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();

      if (isAuthenticated) {
        router.replace("/(app)/(tabs)");
      } else {
        router.replace("/(onboarding)");
      }
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(app)" />
      </Stack>
    </SafeAreaProvider>
  );
}

export default function Main() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={new QueryClient()}>
        <PaperProvider theme={AppTheme}>
          <PermissionProvider>
            <RootLayout />
            <Toast config={toastConfig} />
          </PermissionProvider>
        </PaperProvider>
      </QueryClientProvider>
    </Provider>
  );
}
