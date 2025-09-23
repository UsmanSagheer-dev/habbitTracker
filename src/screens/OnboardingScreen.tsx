import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import { IMAGES } from '../constants/images';

const { width, height } = Dimensions.get('window');

interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  backgroundColor: string;
}

interface OnboardingScreenProps {
  onComplete: () => void;
}

const slides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Welcome to Habitly - Your Personal Habit Tracker!",
    description: "Take control of your habits and transform your life with Habitly. Let's get started on your journey to success!",
    image: "📱",
    backgroundColor: "#6C63FF",
  },
  {
    id: 2,
    title: "Explore Habitly Features for Your Journey!",
    description: "With intuitive habit creation and insightful progress tracking, Habitly makes it easy to stay focused, motivated, and accountable.",
    image: "🎯",
    backgroundColor: "#FF6B9D",
  },
  {
    id: 3,
    title: "Unlock Your Potential with Habitly Now!",
    description: "Achieve your goals with Habitly's suite of features. Start your habit journey today and unlock your full potential!",
    image: "🚀",
    backgroundColor: "#4ECDC4",
  },
];

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollViewRef.current?.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const handleScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(slideIndex);
  };

  const renderSlide = (slide: OnboardingSlide, index: number) => (
    <View key={slide.id} style={[styles.slide, { backgroundColor: slide.backgroundColor }]}>
      <StatusBar backgroundColor={slide.backgroundColor} />

      {/* Phone Mockup Container */}

      <View style={styles.phoneScreen}>
        <View style={styles.containerlogo}>
          <Image
            source={IMAGES.HabitFirst}
            style={styles.onboardingImage}
            resizeMode="stretch"
          />
        </View>
      </View>

      {/* Content with Curved Dip Effect */}
      <View style={styles.content}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.paginationDot,
                i === currentIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Continue"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {slides.map((slide, index) => renderSlide(slide, index))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerlogo: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    height: 400,
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  slide: {
    width,
    height,
  },
  phoneNotch: {

  },
  phoneScreen: {
    width: '100%',
  },
  onboardingImage: {
    width: 250,
    height: 400,
    marginTop: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: 'absolute',
  },
  content: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: -30,           // Overlap with phone screen
    backgroundColor: 'white',
    borderTopLeftRadius: 40,  // Match phone screen's top left curve
    borderTopRightRadius: 40, // Match phone screen's top right curve
    overflow: 'hidden',
    paddingBottom: 120,       // Space for buttons
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'space-between',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingTop: 5,
    backgroundColor: 'white',
    borderTopWidth: 0,
    borderBottomWidth: 10,    // Create a dip effect
    borderBottomColor: 'white',
    borderLeftWidth: 20,
    borderLeftColor: 'transparent',
    borderRightWidth: 20,
    borderRightColor: 'transparent',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flex: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D3748',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'transparent',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(45, 55, 72, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#6C63FF',
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical: 20,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  skipButton: {
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  skipButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderWidth: 0,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default OnboardingScreen;