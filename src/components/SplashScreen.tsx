import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
  Image,
} from 'react-native';
import { IMAGES } from '../constants/images';  

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onAnimationEnd?: () => void;
  logoSource?: any; // Image source for custom logo
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onAnimationEnd, logoSource }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.3)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Start animations
    Animated.sequence([
      // First, fade in and scale the logo
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 3,
          useNativeDriver: true,
        }),
      ]),
      // Then slide up the text
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Animation completed, wait a bit then call onAnimationEnd
      setTimeout(() => {
        onAnimationEnd?.();
      }, 1500);
    });
  }, [fadeAnim, scaleAnim, slideAnim, onAnimationEnd]);

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}>
          <View style={styles.logo}>
            
              <Image
                source={logoSource}
                style={styles.logoImage}
                resizeMode="contain"
              />
           
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.textContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}>
          <Text style={styles.appName}>HabbitApp</Text>
          <Text style={styles.tagline}>Build Better Habits</Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.bottomContainer,
            {
              opacity: fadeAnim,
            },
          ]}>
          <View style={styles.loadingIndicator}>
            <View style={styles.loadingDot} />
            <View style={[styles.loadingDot, styles.loadingDotDelay1]} />
            <View style={[styles.loadingDot, styles.loadingDotDelay2]} />
          </View>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 15,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6C63FF',
    textAlign: 'center',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius:60,
    
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    color: '#E8E6FF',
    textAlign: 'center',
    opacity: 0.9,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    alignItems: 'center',
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 4,
    opacity: 0.4,
  },
  loadingDotDelay1: {
    opacity: 0.6,
  },
  loadingDotDelay2: {
    opacity: 0.8,
  },
});

export default SplashScreen;