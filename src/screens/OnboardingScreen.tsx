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
    image: "📱", // We'll use emoji for now, can be replaced with actual images
    backgroundColor: "#6C63FF",
  },
  {
    id: 2,
    title: "Explore Habitly Features for Your Journey!",
    description: "With intuitive habit creation and insightful progress tracking, Habitly makes it easy to stay focused, motivated, and accountable.",
    image: "🎯",
    backgroundColor: "#7B68EE",
  },
  {
    id: 3,
    title: "Unlock Your Potential with Habitly Now!",
    description: "Achieve your goals with Habitly's suite of features. Start your habit journey today and unlock your full potential!",
    image: "🚀",
    backgroundColor: "#8A7FFF",
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
      <StatusBar backgroundColor={slide.backgroundColor} barStyle="light-content" />
      
      {/* Phone Mockup Container */}
      <View style={styles.phoneContainer}>
        <View style={styles.phoneMockup}>
          <View style={styles.phoneNotch} />
          <View style={styles.phoneScreen}>
            <View style={styles.phoneContent}>
              <Text style={styles.phoneEmoji}>{slide.image}</Text>
              {/* Mock UI Elements */}
              <View style={styles.mockUI}>
                {index === 0 && (
                  <>
                    <View style={styles.mockHeader}>
                      <View style={styles.mockTab} />
                      <View style={[styles.mockTab, styles.mockTabActive]} />
                      <View style={styles.mockTab} />
                    </View>
                    <View style={styles.mockHabitCard}>
                      <View style={[styles.mockHabitIcon, { backgroundColor: '#FF6B6B' }]} />
                      <Text style={styles.mockHabitText}>Set Small Goals</Text>
                    </View>
                    <View style={styles.mockHabitCard}>
                      <View style={[styles.mockHabitIcon, { backgroundColor: '#4ECDC4' }]} />
                      <Text style={styles.mockHabitText}>Work</Text>
                    </View>
                    <View style={styles.mockHabitCard}>
                      <View style={[styles.mockHabitIcon, { backgroundColor: '#45B7D1' }]} />
                      <Text style={styles.mockHabitText}>Meditation</Text>
                    </View>
                  </>
                )}
                {index === 1 && (
                  <>
                    <View style={styles.mockCalendar}>
                      <View style={styles.mockCalendarHeader}>
                        <Text style={styles.mockCalendarTitle}>Set Small Goals</Text>
                      </View>
                      <View style={styles.mockCalendarGrid}>
                        {[...Array(7)].map((_, i) => (
                          <View key={i} style={[styles.mockCalendarDay, i < 5 && styles.mockCalendarDayCompleted]} />
                        ))}
                      </View>
                    </View>
                    <View style={styles.mockCalendar}>
                      <View style={styles.mockCalendarHeader}>
                        <Text style={styles.mockCalendarTitle}>Meditation</Text>
                      </View>
                      <View style={styles.mockCalendarGrid}>
                        {[...Array(7)].map((_, i) => (
                          <View key={i} style={[styles.mockCalendarDay, i < 3 && styles.mockCalendarDayCompleted]} />
                        ))}
                      </View>
                    </View>
                  </>
                )}
                {index === 2 && (
                  <>
                    <View style={styles.mockStats}>
                      <Text style={styles.mockStatsTitle}>Report</Text>
                      <View style={styles.mockStatsRow}>
                        <Text style={styles.mockStatsLabel}>226 days</Text>
                        <Text style={styles.mockStatsValue}>89%</Text>
                      </View>
                      <View style={styles.mockStatsRow}>
                        <Text style={styles.mockStatsLabel}>3,268</Text>
                        <Text style={styles.mockStatsValue}>307</Text>
                      </View>
                    </View>
                    <View style={styles.mockChart}>
                      {[...Array(7)].map((_, i) => (
                        <View key={i} style={[styles.mockChartBar, { height: Math.random() * 60 + 20 }]} />
                      ))}
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.content}>
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

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.continueButton} onPress={handleNext}>
          <Text style={styles.continueButtonText}>
            {currentIndex === slides.length - 1 ? "Let's Get Started" : "Continue"}
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
  slide: {
    width,
    height,
    paddingHorizontal: 20,
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  phoneContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  phoneMockup: {
    width: width * 0.7,
    height: height * 0.45,
    backgroundColor: '#000',
    borderRadius: 30,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  phoneNotch: {
    width: 80,
    height: 25,
    backgroundColor: '#000',
    alignSelf: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    position: 'absolute',
    top: 0,
    zIndex: 1,
  },
  phoneScreen: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 26,
    overflow: 'hidden',
    paddingTop: 30,
  },
  phoneContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  phoneEmoji: {
    fontSize: 40,
    marginBottom: 20,
  },
  mockUI: {
    width: '100%',
    flex: 1,
  },
  mockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  mockTab: {
    width: 60,
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  mockTabActive: {
    backgroundColor: '#6C63FF',
  },
  mockHabitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  mockHabitIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
  },
  mockHabitText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  mockCalendar: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  mockCalendarHeader: {
    marginBottom: 8,
  },
  mockCalendarTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  mockCalendarGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mockCalendarDay: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E0E0E0',
  },
  mockCalendarDayCompleted: {
    backgroundColor: '#4CAF50',
  },
  mockStats: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  mockStatsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  mockStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  mockStatsLabel: {
    fontSize: 12,
    color: '#666',
  },
  mockStatsValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  mockChart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
  },
  mockChartBar: {
    width: 12,
    backgroundColor: '#6C63FF',
    borderRadius: 6,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 30,
  },
  description: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 40,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipButtonText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '500',
  },
  continueButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

export default OnboardingScreen;