import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "../global.css"; // Import CSS global untuk NativeWind

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </>
  );
}