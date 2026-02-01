import { Stack } from "expo-router";
import { Text, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "react-native-paper";

export default function RootLayout() {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerRight: () => (
            <Pressable onPress={() => router.replace("/(auth)/")}>
              <Text style={{ color: theme.colors.tertiary, fontSize: 16 }}>
                Skip
              </Text>
            </Pressable>
          ),
          title: "",
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
