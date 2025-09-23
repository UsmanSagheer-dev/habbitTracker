import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { IMAGES } from '../constants/images';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface Props {
  navigation: WelcomeScreenNavigationProp;
}

const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  const handleSocialLogin = (provider: string) => {
    // Handle social login logic here
    console.log(`Login with ${provider}`);
    // For now, navigate to main app after social login
    navigation.replace('Main');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* App Logo/Icon */}
        <View style={styles.logoContainer}>
          <Image
            source={IMAGES.HabitTrackerLogo}
            style={styles.habitracker}
            resizeMode="stretch"
          />
        </View>

        {/* Welcome Text */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Let's Get Started!</Text>
          <Text style={styles.subtitle}>Let's dive in into your account</Text>
        </View>

        {/* Social Login Options */}
        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Google')}
          >
            <FontAwesome
              name="google"
              size={28}
              color="#DB4437"
              style={styles.socialIconStyle}
            />
            <Text style={styles.socialText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('GitHub')}
          >
            <FontAwesome
              name="github"
              size={28}
              color="#333"
              style={styles.socialIconStyle}
            />
            <Text style={styles.socialText}>Continue with GitHub</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Apple')}
          >
            <FontAwesome
              name="apple"
              size={28}
              color="#000"
              style={styles.socialIconStyle}
            />
            <Text style={styles.socialText}>Continue with Apple</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialLogin('Facebook')}
          >
            <FontAwesome
              name="facebook"
              size={28}
              color="#1877F2"
              style={styles.socialIconStyle}
            />
            <Text style={styles.socialText}>Continue with Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signupButton} onPress={navigateToSignup}>
          <Text style={styles.signupButtonText}>Sign up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signinButton} onPress={navigateToLogin}>
          <Text style={styles.signinButtonText}>Sign in</Text>
        </TouchableOpacity>

        {/* Terms */}
        <View style={styles.termsContainer}>
          <Text style={styles.termsText}>Privacy Policy</Text>
          <Text style={styles.termsSeparator}> • </Text>
          <Text style={styles.termsText}>Terms of Service</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  habitracker: {
    width: 100,
    height: 100,
  },

  socialIconStyle: {
    marginRight: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
  },
  socialContainer: {
    gap: 16,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7FAFC',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  socialIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  signupButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  signinButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  signinButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6C63FF',
  },
  termsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  termsSeparator: {
    fontSize: 12,
    color: '#A0AEC0',
  },
});

export default WelcomeScreen;