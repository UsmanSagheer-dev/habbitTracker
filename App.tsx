/**
 * HabbitApp - Habit Tracking Application
 * Built with React Native
 *
 * @format
 */

import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SplashScreen } from './src/components';
import { HomeScreen, OnboardingScreen } from './src/screens';
import { IMAGES } from './src/constants/images';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const handleSplashEnd = () => {
    setShowSplash(false);
  };

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      {showSplash ? (
        <SplashScreen 
          onAnimationEnd={handleSplashEnd} 
          logoSource={IMAGES.SplashLogo}
        />
      ) : showOnboarding ? (
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      ) : (
        <HomeScreen />
      )}
    </SafeAreaProvider>
  );
}

export default App;
