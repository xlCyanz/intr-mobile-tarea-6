import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    RalewayRegular: require('../assets/fonts/Raleway/Raleway-Regular.ttf'),
    RalewayMedium: require('../assets/fonts/Raleway/Raleway-Medium.ttf'),
    RalewayBold: require('../assets/fonts/Raleway/Raleway-Bold.ttf'),
    RalewaySemiBold: require('../assets/fonts/Raleway/Raleway-SemiBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="gender" options={{ title: "Predicción de genero" }} />
          <Stack.Screen name="age" options={{ title: "Predicción de edad" }} />
          <Stack.Screen name="university" options={{ title: "Universidades por país" }} />
          {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
          {/* <Stack.Screen name="finn" options={{ title: "Finn el Humano" }} /> */}
          {/* <Stack.Screen name="bonnie" options={{ title: "Princesa Chicle" }} /> */}
          {/* <Stack.Screen name="sandwich" options={{ title: "Hora del sandwich" }} /> */}
          {/* <Stack.Screen name="insecto" options={{ title: "Insecto Bailarín" }} /> */}
          {/* <Stack.Screen name="hot-cakes" options={{ title: "Ricos Hot Cakes" }} /> */}
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
