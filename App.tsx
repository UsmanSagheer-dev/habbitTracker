/**
 * HabbitApp - Habit Tracking Application
 * Built with React Native
 *
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigation';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
