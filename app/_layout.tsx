import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // replace later

  useEffect(() => {
    async function prepare() {
      // Simulate loading / auth check
      await new Promise((resolve) => setTimeout(resolve, 1200));

      // TODO: replace with real auth check
      setIsAuthenticated(false);

      setIsReady(true);
    }

    prepare();
  }, []);

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
    return null; // IMPORTANT
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(onboarding)" options={{headerShown: false}} />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(app)" />
    </Stack>
  );
}
