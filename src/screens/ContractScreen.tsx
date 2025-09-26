// @ts-ignore
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Dimensions,
  PanResponder,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/types';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IMAGES } from '../constants/images';

const { width } = Dimensions.get('window');

const ContractScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Main'>>();
  const [signatureStrokes, setSignatureStrokes] = useState<Array<Array<{x: number, y: number}>>>([]);
  const [currentStroke, setCurrentStroke] = useState<Array<{x: number, y: number}>>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const commitments = [
    { text: 'I commit to tracking my habits daily', emoji: '💝' },
    { text: 'I promise to prioritize my well-being', emoji: '⚡' },
    { text: 'I will strive for consistency and progress', emoji: '⭐' },
    { text: 'I understand that change takes time and effort', emoji: '⚠️' },
  ];

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const newPoint = { x: locationX, y: locationY };
      setCurrentStroke([newPoint]);
      setIsDrawing(true);
    },
    
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const newPoint = { x: locationX, y: locationY };
      setCurrentStroke((prev: Array<{x: number, y: number}>) => [...prev, newPoint]);
    },
    
    onPanResponderRelease: () => {
      setSignatureStrokes((prev: Array<Array<{x: number, y: number}>>) => [...prev, currentStroke]);
      setCurrentStroke([]);
      setIsDrawing(false);
    },
  });

  const clearSignature = () => {
    setSignatureStrokes([]);
    setCurrentStroke([]);
    setIsDrawing(false);
  };

  const handleFinish = () => {
    navigation.replace('Main');
  };

  const goBack = () => {
    navigation.goBack();
  };

  const hasSignature = signatureStrokes.length > 0 || currentStroke.length > 0;

  const renderSignatureLines = () => {
    const allStrokes = [...signatureStrokes, ...(currentStroke.length > 0 ? [currentStroke] : [])];
    
    return allStrokes.map((stroke, strokeIndex) => {
      if (stroke.length < 2) return null;
      
      return stroke.map((point, pointIndex) => {
        if (pointIndex === 0) return null;
        
        const prevPoint = stroke[pointIndex - 1];
        const deltaX = point.x - prevPoint.x;
        const deltaY = point.y - prevPoint.y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        
        return (
          <View
            key={`${strokeIndex}-${pointIndex}`}
            style={[
              styles.signatureLine,
              {
                left: prevPoint.x,
                top: prevPoint.y - 1,
                width: distance,
                transform: [{ rotate: `${angle}deg` }],
              }
            ]}
          />
        );
      });
    }).flat().filter(Boolean);
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
          <Text style={styles.progressText}>8 / 8</Text>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Let's make a</Text>
          <Text style={styles.titleHighlight}>contract ✍️</Text>

          <Text style={styles.subtitle}>
            Review & sign your personalized commitment
            to achieving your goals with Habitly.
          </Text>
        </View>

        {/* Commitments List */}
        <View style={styles.commitmentsContainer}>
          {commitments.map((commitment, index) => (
            <View key={index} style={styles.commitmentItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.commitmentText}>
                {commitment.text} {commitment.emoji}
              </Text>
            </View>
          ))}
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <Text style={styles.signatureLabel}>Sign using your finger</Text>
          
          <View 
            style={[
              styles.signatureArea,
              hasSignature && styles.signatureAreaSigned
            ]}
            {...panResponder.panHandlers}
          >
            {renderSignatureLines()}
            {!hasSignature && (
              <Text style={styles.signaturePlaceholder}>Draw your signature here</Text>
            )}
          </View>
          
          {hasSignature && (
            <TouchableOpacity style={styles.clearButton} onPress={clearSignature}>
              <Text style={styles.clearButtonText}>Clear Signature</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.finishButton,
            !hasSignature && styles.finishButtonDisabled,
          ]}
          onPress={handleFinish}
          disabled={!hasSignature}
        >
          <Text
            style={[
              styles.finishButtonText,
              !hasSignature && styles.finishButtonTextDisabled,
            ]}
          >
            Finish
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
    width: '100%',
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
    marginBottom: 25,
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
  commitmentsContainer: {
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  commitmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  bullet: {
    fontSize: 18,
    color: '#6C63FF',
    fontWeight: 'bold',
    marginRight: 8,
    marginTop: 2,
  },
  commitmentText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    flex: 1,
  },
  signatureSection: {
    alignItems: 'center',
    marginBottom: 120,
  },
  signatureLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  signatureArea: {
    width: width - 80,
    height: 120,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    position: 'relative',
  },
  signatureAreaSigned: {
    borderColor: '#6C63FF',
    backgroundColor: '#f0f0ff',
    borderStyle: 'solid',
  },
  signatureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  signatureText: {
    fontSize: 20,
    color: '#6C63FF',
    fontWeight: 'bold',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  signatureLine: {
    position: 'absolute',
    height: 2,
    backgroundColor: '#333',
    transformOrigin: 'left center',
  },
  signatureDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
  },
  signaturePlaceholder: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
    position: 'absolute',
  },
  clearButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  clearButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  finishButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  finishButtonDisabled: {
    backgroundColor: '#E5E5E5',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButtonTextDisabled: {
    color: '#999',
  },
});

export default ContractScreen;