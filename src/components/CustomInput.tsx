import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInputProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from '@react-native-vector-icons/fontawesome';

interface CustomInputProps extends TextInputProps {
  label?: string;
  icon?: string;
  iconName?: string;
  error?: string;
  isPassword?: boolean;
  containerStyle?: object;
  inputStyle?: object;
  labelStyle?: object;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon,
  iconName,
  error,
  isPassword = false,
  containerStyle,
  inputStyle,
  labelStyle,
  ...textInputProps
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      )}
      
      <View style={[
        styles.inputWrapper,
        isFocused && styles.inputWrapperFocused,
        error && styles.inputWrapperError
      ]}>
        {(icon || iconName) && (
          <View style={styles.iconContainer}>
            {iconName ? (
              <Icon name={iconName} size={24} color="#A0AEC0" />
            ) : (
              <Text style={styles.inputIcon}>{icon}</Text>
            )}
          </View>
        )}
        
        <TextInput
          style={[styles.input, inputStyle]}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        
        {isPassword && (
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.eyeIcon}
          >
            <FontAwesome
              name={showPassword ? 'eye' : 'eye-slash'}
              size={18}
              color="#A0AEC0"
            />
          </TouchableOpacity>
        )}
      </View>
      
      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A202C',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
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
  inputWrapperFocused: {
    borderColor: '#6C63FF',
    ...Platform.select({
      ios: {
        shadowColor: '#6C63FF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  inputWrapperError: {
    borderColor: '#E53E3E',
  },
  iconContainer: {
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputIcon: {
    marginRight: 12,
    color: '#A0AEC0',
    fontSize: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2D3748',
  },
  eyeIcon: {
    padding: 4,
  },
  eyeIconText: {
    color: '#A0AEC0',
    fontSize: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#E53E3E',
    marginTop: 8,
    marginLeft: 4,
  },
});

export default CustomInput;