import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  ScrollView,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { IMAGES } from '../constants/images';
import { CustomInput } from '../components';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type SignupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Signup'
>;

interface Props {
  navigation: SignupScreenNavigationProp;
}

const SignupScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!agreeToTerms) {
      Alert.alert('Error', 'Please agree to Terms & Conditions');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: () => navigation.replace('PostSignupOnboarding') },
      ]);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    navigation.replace('Main');
  };

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };

  const goBack = () => {
    navigation.navigate('Welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header with Back Arrow */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image
              style={{ width: 28, height: 28,  }}
              source={IMAGES.ArrowLeft}
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Join Habitly Today ✨</Text>
          <Text style={styles.subtitle}>
            Start your habit journey with Habitly. It's quick,easy, and
            free!
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Email Input */}
          <CustomInput
            label="Email"
            iconName="email"
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* Password Input */}
          <CustomInput
            label="Password"
            iconName="lock"
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#A0AEC0"
            isPassword={true}
          />

          {/* Terms & Conditions */}
          <View style={styles.termsContainer}>
            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setAgreeToTerms(!agreeToTerms)}
            >
              <View
                style={[
                  styles.checkboxInner,
                  agreeToTerms && styles.checkboxChecked,
                ]}
              >
                {agreeToTerms && (
                  <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✓</Text>
                )}
              </View>
            </TouchableOpacity>
            <Text style={styles.termsText}>
              I agree to Habitly{' '}
              <Text style={styles.termsLink}>Terms & Conditions</Text>.
            </Text>
          </View>

          {/* Login Link */}
          <View style={styles.loginLinkContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.divider} />
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialSection}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Google')}
            >
              <FontAwesome
                name="google"
                size={20}
                color="#DB4437"
                style={{ marginRight: 7 }}
              />
              <Text style={styles.socialText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialLogin('Apple')}
            >
              <FontAwesome
                name="apple"
                size={20}
                color="#000000"
                style={{ marginRight: 7 }}
              />
              <Text style={styles.socialText}>Continue with Apple</Text>
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.signupButton, isLoading && styles.buttonDisabled]}
            onPress={handleSignup}
            disabled={isLoading}
          >
            <Text style={styles.signupButtonText}>
              {isLoading ? 'Creating Account...' : 'Sign up'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    height: 50,
    position: 'relative',
  },
  backButton: {
    // width: 40,
    // height: 10,
    position: 'absolute',
    top: 10,
    left: 20,
    right: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleSection: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  checkboxInner: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6C63FF',
    borderColor: '#6C63FF',
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  termsLink: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  loginText: {
    fontSize: 16,
    color: '#718096',
  },
  loginLink: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2E8F0',
  },
  dividerText: {
    fontSize: 16,
    color: '#A0AEC0',
    marginHorizontal: 16,
  },
  socialSection: {
    gap: 16,
    marginBottom: 10,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    gap: 12,
    borderRadius: 15,
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
        elevation: 4,
      },
    }),
  },
  socialIcon: {
    marginRight: 7,
  },
  socialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  signupButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
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
  buttonDisabled: {
    opacity: 0.6,
  },
  signupButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default SignupScreen;
