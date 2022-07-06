import React from 'react';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold,

} from '@expo-google-fonts/archivo'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from '@expo-google-fonts/inter'

import { Routes } from './src/routes';

import AppLoading from 'expo-app-loading';
// import * as SplashScreen from 'expo-splash-screen'; // AppLoading is deprecated the new one is is this
import { ThemeProvider } from 'styled-components';
import theme from './src/styles/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Routes />
      </GestureHandlerRootView>
    </ThemeProvider>
  )
}

// i stoped on animation module, scroll animation class