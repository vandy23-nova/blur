import { useEffect } from 'react';
import { Stack, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/stores/useAuthStore';
import '../global.css';

export default function RootLayout() {
  const { initialized, user, loadUser } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  if (!initialized) {
    return null; // Or a loading screen
  }

  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="(auth)" />
          </>
        ) : (
          <>
            <Stack.Screen name="(tabs)" />
          </>
        )}
      </Stack>
    </>
  );
}
