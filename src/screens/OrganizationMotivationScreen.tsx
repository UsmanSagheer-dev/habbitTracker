// @ts-ignore
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IMAGES } from '../constants/images';

const OrganizationMotivationScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Main'>>();
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const motivationOptions = [
    { id: 'lack-motivation', label: 'Lack of Motivation', emoji: '🎯' },
    { id: 'work-overload', label: 'Work Overload', emoji: '🚀' },
    { id: 'cluttered-environment', label: 'Cluttered Environment', emoji: '📧' },
    { id: 'digital-distractions', label: 'Digital Distractions', emoji: '🎮' },
    { id: 'time-management', label: 'Lack of Time Management', emoji: '📝' },
  ];

  const handleContinue = () => {
    if (selectedOptions.length > 0) {
      navigation.navigate('Goals');
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOptions(prev => {
      if (prev.includes(optionId)) {
        return prev.filter(id => id !== optionId);
      } else {
        return [...prev, optionId];
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8f9ff" barStyle="dark-content" />

      {/* Header with Back Arrow and Progress */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image source={IMAGES.ArrowLeft} style={{ width: 28, height: 35 }} />
        </TouchableOpacity>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>6 / 8</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>What influenced you to</Text>
          <Text style={styles.titleHighlight}>become organized? ⚖️</Text>

          <Text style={styles.subtitle}>
            Understanding your motivations helps us align
            Habitly with your goals. Select all that apply.
          </Text>
        </View>

        {/* Motivation Options */}
        <View style={styles.optionsContainer}>
          {motivationOptions.map(option => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionCard,
                selectedOptions.includes(option.id) && styles.selectedOption,
              ]}
              onPress={() => handleOptionSelect(option.id)}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={styles.optionLabel}>{option.label}</Text>
              {selectedOptions.includes(option.id) && (
                <View style={styles.checkmarkContainer}>
                  <Text style={styles.checkmark}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            selectedOptions.length === 0 && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={selectedOptions.length === 0}
        >
          <Text
            style={[
              styles.continueButtonText,
              selectedOptions.length === 0 && styles.continueButtonTextDisabled,
            ]}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  header: {
    marginTop: 8,
    paddingBottom: 7,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginLeft: 20,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    width: '75%',
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleSection: {
    marginTop: 5,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    lineHeight: 36,
  },
  titleHighlight: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 120,
  },
  optionCard: {
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedOption: {
    borderColor: '#6C63FF',
    backgroundColor: '#f0f0ff',
  },
  optionEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  checkmarkContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  checkmark: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  continueButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButtonTextDisabled: {
    color: '#999',
  },
});

export default OrganizationMotivationScreen;