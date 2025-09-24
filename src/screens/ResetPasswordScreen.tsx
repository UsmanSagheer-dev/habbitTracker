import React, { useState } from 'react';
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
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import { CustomInput } from '../components';
import { IMAGES } from '../constants/images';
import FontAwesome from '@react-native-vector-icons/fontawesome';

type ResetPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPassword'
>;

type ResetPasswordScreenRouteProp = RouteProp<
  RootStackParamList,
  'ResetPassword'
>;

interface Props {
  navigation: ResetPasswordScreenNavigationProp;
  route: ResetPasswordScreenRouteProp;
}

const ResetPasswordScreen: React.FC<Props> = ({ navigation, route }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { email, otp } = route.params;

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return 'Password must be at least 8 characters long';
    }
    if (!/(?=.*[a-z])/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/(?=.*[A-Z])/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/(?=.*\d)/.test(password)) {
      return 'Password must contain at least one number';
    }
    return null;
  };

  const handleResetPassword = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      Alert.alert('Error', passwordError);
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setIsLoading(true);

    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to success screen
      navigation.navigate('PasswordResetSuccess');
    }, 1500);
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
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
          contentContainerStyle={styles.scrollContent}
        >
          {/* Title Section */}
          <View style={styles.titleSection}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>Secure Your Account</Text>
              <FontAwesome name="lock" size={28} color="#6C63FF" style={styles.titleIcon} />
            </View>
            <Text style={styles.subtitle}>
              Create a new password for your Habitly account. Make sure it's secure and easy to remember.
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* New Password Input */}
            <CustomInput
              label="New Password"
              iconName="lock"
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="New Password"
              placeholderTextColor="#A0AEC0"
              isPassword={true}
            />

            {/* Confirm Password Input */}
            <CustomInput
              label="Confirm New Password"
              iconName="lock"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm New Password"
              placeholderTextColor="#A0AEC0"
              isPassword={true}
            />

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Password Requirements:</Text>
              
              <View style={styles.requirement}>
                <FontAwesome
                  name={newPassword.length >= 8 ? "check-circle" : "circle-o"}
                  size={16}
                  color={newPassword.length >= 8 ? "#10B981" : "#A0AEC0"}
                />
                <Text style={[
                  styles.requirementText,
                  newPassword.length >= 8 && styles.requirementMet
                ]}>
                  At least 8 characters
                </Text>
              </View>
              
              <View style={styles.requirement}>
                <FontAwesome
                  name={/(?=.*[a-z])/.test(newPassword) ? "check-circle" : "circle-o"}
                  size={16}
                  color={/(?=.*[a-z])/.test(newPassword) ? "#10B981" : "#A0AEC0"}
                />
                <Text style={[
                  styles.requirementText,
                  /(?=.*[a-z])/.test(newPassword) && styles.requirementMet
                ]}>
                  One lowercase letter
                </Text>
              </View>
              
              <View style={styles.requirement}>
                <FontAwesome
                  name={/(?=.*[A-Z])/.test(newPassword) ? "check-circle" : "circle-o"}
                  size={16}
                  color={/(?=.*[A-Z])/.test(newPassword) ? "#10B981" : "#A0AEC0"}
                />
                <Text style={[
                  styles.requirementText,
                  /(?=.*[A-Z])/.test(newPassword) && styles.requirementMet
                ]}>
                  One uppercase letter
                </Text>
              </View>
              
              <View style={styles.requirement}>
                <FontAwesome
                  name={/(?=.*\d)/.test(newPassword) ? "check-circle" : "circle-o"}
                  size={16}
                  color={/(?=.*\d)/.test(newPassword) ? "#10B981" : "#A0AEC0"}
                />
                <Text style={[
                  styles.requirementText,
                  /(?=.*\d)/.test(newPassword) && styles.requirementMet
                ]}>
                  One number
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Bottom Button - Fixed outside KeyboardAvoidingView */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.resetButton, isLoading && styles.buttonDisabled]}
          onPress={handleResetPassword}
          disabled={isLoading}
        >
          <Text style={styles.resetButtonText}>
            {isLoading ? 'Saving New Password...' : 'Save New Password'}
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
    paddingBottom: 30,
    minHeight: 600,
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
    paddingTop: 0,
  },
  titleSection: {
    marginBottom: 32,
    marginTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    flex: 1,
  },
  titleIcon: {
    marginLeft: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    lineHeight: 24,
  },
  formSection: {
    flex: 1,
    minHeight: 500,
  },
  requirementsContainer: {
    marginTop: 24,
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#F8F9FA',
    borderRadius: 25,
    marginHorizontal: 4,
    height: 200,
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
  requirementsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 16,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 24,
  },
  requirementText: {
    fontSize: 14,
    color: '#718096',
    marginLeft: 12,
  },
  requirementMet: {
    color: '#10B981',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 40,
    borderTopColor: '#F0F0F0',
    ...Platform.select({
      ios: {
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  resetButton: {
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
  resetButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default ResetPasswordScreen;