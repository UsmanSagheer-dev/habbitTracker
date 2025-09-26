import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../navigation/types';
import { IMAGES } from '../constants/images';

const WakeUpTimeScreen: React.FC = () => {
  const navigation = useNavigation<RootStackNavigationProp<'Main'>>();
  const [selectedHour, setSelectedHour] = useState<number>(7);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);

  
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);
  
  // Base arrays
  const baseHours = Array.from({ length: 12 }, (_, i) => i + 1);
  const baseMinutes = Array.from({ length: 60 }, (_, i) => i);
  
  // Create extended arrays for infinite scroll (7 repetitions for smooth experience)
  const REPETITIONS = 7;
  const MIDDLE_SECTION = Math.floor(REPETITIONS / 2); // Index 3
  
  const createExtendedArray = (baseArray: number[]) => {
    return Array(REPETITIONS).fill(null).flatMap(() => [...baseArray]);
  };
  
  const extendedHours = createExtendedArray(baseHours);
  const extendedMinutes = createExtendedArray(baseMinutes);
  
  const ITEM_HEIGHT = 50;
  
  // Get the display value based on scroll position
  const getSelectedValue = (scrollY: number, baseArray: number[]) => {
    const index = Math.round(scrollY / ITEM_HEIGHT);
    const adjustedIndex = index % baseArray.length;
    return baseArray[adjustedIndex];
  };
  
  // Handle hour scroll
  const handleHourScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newHour = getSelectedValue(scrollY, baseHours);
    if (newHour && newHour !== selectedHour) {
      setSelectedHour(newHour);
    }
  };
  
  // Handle minute scroll
  const handleMinuteScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newMinute = getSelectedValue(scrollY, baseMinutes);
    if (newMinute !== undefined && newMinute !== selectedMinute) {
      setSelectedMinute(newMinute);
    }
  };
  
  // Handle infinite scroll repositioning for hours
  const handleHourMomentumScrollEnd = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(scrollY / ITEM_HEIGHT);
    const currentSection = Math.floor(currentIndex / baseHours.length);
    
    // If not in middle sections, reposition to equivalent position in middle
    if (currentSection <= 1 || currentSection >= REPETITIONS - 2) {
      const positionInSection = currentIndex % baseHours.length;
      const newIndex = MIDDLE_SECTION * baseHours.length + positionInSection;
      
      setTimeout(() => {
        hourScrollRef.current?.scrollTo({
          y: newIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 50);
    }
  };
  
  // Handle infinite scroll repositioning for minutes
  const handleMinuteMomentumScrollEnd = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const currentIndex = Math.round(scrollY / ITEM_HEIGHT);
    const currentSection = Math.floor(currentIndex / baseMinutes.length);
    
    // If not in middle sections, reposition to equivalent position in middle
    if (currentSection <= 1 || currentSection >= REPETITIONS - 2) {
      const positionInSection = currentIndex % baseMinutes.length;
      const newIndex = MIDDLE_SECTION * baseMinutes.length + positionInSection;
      
      setTimeout(() => {
        minuteScrollRef.current?.scrollTo({
          y: newIndex * ITEM_HEIGHT,
          animated: false,
        });
      }, 50);
    }
  };
  
  // Initialize scroll positions
  useEffect(() => {
    const timer = setTimeout(() => {
      // Set initial hour position
      if (hourScrollRef.current) {
        const hourIndex = baseHours.findIndex(h => h === selectedHour);
        const initialHourIndex = MIDDLE_SECTION * baseHours.length + hourIndex;
        hourScrollRef.current.scrollTo({
          y: initialHourIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
      
      // Set initial minute position
      if (minuteScrollRef.current) {
        const initialMinuteIndex = MIDDLE_SECTION * baseMinutes.length + selectedMinute;
        minuteScrollRef.current.scrollTo({
          y: initialMinuteIndex * ITEM_HEIGHT,
          animated: false,
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    navigation.replace('Main');
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#f8f9ff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Image source={IMAGES.ArrowLeft} style={{ width: 28, height: 35,  }} />
        </TouchableOpacity>
        
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
          <Text style={styles.progressText}>2 / 8</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.title}>What time do you usually</Text>
          <Text style={styles.titleHighlight}>wake up ? ☀️</Text>
          
          <Text style={styles.subtitle}>
            Setting your wake-up time helps us create your
            personalized habit schedule.
          </Text>
        </View>

        <View style={styles.timePickerContainer}>
          {/* Selection indicator */}
          <View style={styles.selectionIndicator} />
          
          <View style={styles.timePickerRow}>
            {/* Hour Picker */}
            <View style={styles.timeColumn}>
              <ScrollView
                ref={hourScrollRef}
                style={styles.timeScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.timeScrollContent}
                snapToInterval={ITEM_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                onScroll={handleHourScroll}
                onMomentumScrollEnd={handleHourMomentumScrollEnd}
                scrollEventThrottle={16}
              >
                {extendedHours.map((hour, index) => (
                  <View key={`hour-${index}`} style={styles.timeItem}>
                    <Text
                      style={[
                        styles.timeText,
                        selectedHour === hour && styles.selectedTimeText,
                      ]}
                    >
                      {hour.toString().padStart(2, '0')}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Minute Picker */}
            <View style={styles.timeColumn}>
              <ScrollView
                ref={minuteScrollRef}
                style={styles.timeScrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.timeScrollContent}
                snapToInterval={ITEM_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                onScroll={handleMinuteScroll}
                onMomentumScrollEnd={handleMinuteMomentumScrollEnd}
                scrollEventThrottle={16}
              >
                {extendedMinutes.map((minute, index) => (
                  <View key={`minute-${index}`} style={styles.timeItem}>
                    <Text
                      style={[
                        styles.timeText,
                        selectedMinute === minute && styles.selectedTimeText,
                      ]}
                    >
                      {minute.toString().padStart(2, '0')}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* AM Only Selector */}
            <View style={styles.amPmContainer}>
              <View
                style={[
                  styles.amPmOption,
                  styles.selectedAmPmOption,
                ]}
              >
                <Text
                  style={[
                    styles.amPmText,
                    styles.selectedAmPmText,
                  ]}
                >
                  AM
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
    width: '25%',
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
    marginTop: 13,
    textAlign: 'center',
  },
  timePickerContainer: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 20,
    position: 'relative',
    marginBottom: 20,
    marginTop: -10,
  },
  selectionIndicator: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 100,
    height: 50,
    marginTop: -25,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E5E5',
    zIndex: 1,
  },
  timePickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  timeColumn: {
    flex: 1,
    height: '100%',
  },
  timeScrollView: {
    flex: 1,
  },
  timeScrollContent: {
    paddingVertical: 100,
    alignItems: 'center',
  },
  timeItem: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#999',
    textAlign: 'center',
  },
  selectedTimeText: {
    color: '#6C63FF',
    fontWeight: 'bold',
    fontSize: 28,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    backgroundColor: '#f8f9ff',
  },
  continueButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  amPmContainer: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: -180,
  },
  amPmOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    minWidth: 50,
    alignItems: 'center',
  },
  selectedAmPmOption: {
    backgroundColor: '#6C63FF',
  },
  amPmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  selectedAmPmText: {
    color: 'white',
  },
});

export default WakeUpTimeScreen;