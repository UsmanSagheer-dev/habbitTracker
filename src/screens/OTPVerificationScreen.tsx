import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { IMAGES } from '../constants/images';

type OTPVerificationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'OTPVerification'
>;

type OTPVerificationScreenRouteProp = RouteProp<
  RootStackParamList,
  'OTPVerification'
>;

interface Props {
  navigation: OTPVerificationScreenNavigationProp;
  route: OTPVerificationScreenRouteProp;
}

const OTPVerificationScreen: React.FC<Props> = ({ navigation, route }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { email } = route.params;

  // Create refs for each input
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOTP = async () => {
    const otpString = otp.join('');

    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit OTP');
      return;
    }

    setIsLoading(true);

    // Simulate API call to verify OTP
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to reset password screen
      navigation.navigate('ResetPassword', { email, otp: otpString });
    }, 1500);
  };

  const handleResendCode = async () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setOtp(['', '', '', '', '', '']);

    // Simulate API call to resend OTP
    setTimeout(() => {
      Alert.alert('Success', 'OTP code resent successfully');

      // Restart timer
      const timer = setInterval(() => {
        setResendTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 1000);
  };

  const goBack = () => {
    navigation.goBack();
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
              style={{ width: 28, height: 28 }}
              source={IMAGES.ArrowLeft}
            />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 120 }]}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <Text style={styles.title}>Enter OTP Code 🔐</Text>
            <Text style={styles.subtitle}>
              Check your email inbox for a password reset code. Enter the code
              below to continue.
            </Text>
          </View>

          {/* OTP Input Section */}
          <View style={styles.otpSection}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={ref => {
                    inputRefs.current[index] = ref;
                  }}
                  style={[styles.otpInput, digit && styles.otpInputFilled]}
                  value={digit}
                  onChangeText={value => handleOtpChange(value, index)}
                  onKeyPress={({ nativeEvent }) =>
                    handleKeyPress(nativeEvent.key, index)
                  }
                  maxLength={1}
                  keyboardType="number-pad"
                  textAlign="center"
                  autoFocus={index === 0}
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.resendSection}>
              {!canResend ? (
                <Text style={styles.timerText}>
                  You can resend the code in {resendTimer} seconds
                </Text>
              ) : (
                <TouchableOpacity onPress={handleResendCode}>
                  <Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Button - Fixed outside KeyboardAvoidingView */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.verifyButton, isLoading && styles.buttonDisabled]}
          onPress={handleVerifyOTP}
          disabled={isLoading}
        >
          <Text style={styles.verifyButtonText}>
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
      </View>
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
    marginTop: 20,
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
  otpSection: {
    marginBottom: 40,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  otpInput: {
    width: 45,
    height: 50,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A202C',
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
  otpInputFilled: {
    borderColor: '#6C63FF',
    backgroundColor: '#F7F6FF',
  },
  resendSection: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: '#718096',
  },
  resendText: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  verifyButton: {
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
  verifyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default OTPVerificationScreen;
