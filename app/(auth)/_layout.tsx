// auth/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="[verifyPhoneOtp]"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sessionExpired"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="tooManyAttempts"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="incorrectOtp"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
