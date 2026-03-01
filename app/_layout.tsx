import { Stack } from "expo-router";
import { FraymProvider } from "../context/FraymContext";

export default function Layout() {
  return (
    <FraymProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </FraymProvider>
  );
}