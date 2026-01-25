import { Stack } from 'expo-router';
import { Text, Pressable } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
        <Stack.Screen 
            name="index"
            options={{
                headerShown: true,
                headerRight: () => (
                    <Text style={{ color: "#66666", fontSize: 16}}>Skip</Text>
                ),
                title: "",
                headerShadowVisible: false,
            }}
        />
    </Stack>
  );
}