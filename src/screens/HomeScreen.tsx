import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { MoveLeft, MoveRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../constants/images';
import DonutCard from '../components/DonutCard';
import ActivityCard from '../components/ActivityCard';

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const [selectedDateIndex, setSelectedDateIndex] = useState(0);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const datesScrollRef = useRef<any>(null);
  const ITEM_WIDTH = 78;

  // Animated FAB
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  useEffect(() => {
    // pulsing animation loop
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.06,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
    );

    pulse.start();

    return () => pulse.stop();
  }, [pulseAnim]);

  const dates = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      day: d.toLocaleDateString(undefined, { weekday: 'short' }),
      date: d.getDate(),
    };
  });

  const activities = [
    { title: 'Morning Exercise', time: '6:00 AM' },
    { title: 'Read for 30 minutes', time: '7:00 PM' },
    { title: 'Drink 8 glasses of water', time: 'Throughout the day' },
    { title: 'Meditation', time: '8:00 AM' },
    { title: 'Coding Practice', time: '9:00 PM' },
    { title: 'Evening Walk', time: '7:30 PM' },
  ];

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headersub}>
            <Image source={IMAGES.Diamond} />
            <Text style={styles.headerText}>Try Free</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              if (navigation && typeof navigation.openDrawer === 'function') {
                navigation.openDrawer();
              }
            }}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        >
          <View style={styles.statsContainer}>
            <View style={styles.DateContainer}>
              <Text style={styles.statLabel}>TODAY</Text>

              {/* Row with arrows + horizontal dates scroll */}
              <View style={styles.dateRow}>
                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    const newIndex = Math.max(0, selectedDateIndex - 1);
                    if (newIndex !== selectedDateIndex) {
                      datesScrollRef.current?.scrollTo({
                        x: newIndex * ITEM_WIDTH,
                        animated: true,
                      });
                      setSelectedDateIndex(newIndex);
                    }
                  }}
                >
                  <MoveLeft size={16} color={'white'} />
                </TouchableOpacity>

                <ScrollView
                  ref={datesScrollRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.datesScroll}
                >
                  {dates.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.dateItem,
                        index === selectedDateIndex && styles.dateItemSelected,
                      ]}
                      onPress={() => {
                        datesScrollRef.current?.scrollTo({
                          x: index * ITEM_WIDTH,
                          animated: true,
                        });
                        setSelectedDateIndex(index);
                      }}
                    >
                      <Text
                        style={[
                          styles.dateDay,
                          index === selectedDateIndex &&
                            styles.dateTextSelected,
                        ]}
                      >
                        {item.day}
                      </Text>
                      <Text
                        style={[
                          styles.dateNum,
                          index === selectedDateIndex &&
                            styles.dateTextSelected,
                        ]}
                      >
                        {item.date}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity
                  style={styles.arrowButton}
                  onPress={() => {
                    const newIndex = Math.min(
                      dates.length - 1,
                      selectedDateIndex + 1,
                    );
                    if (newIndex !== selectedDateIndex) {
                      datesScrollRef.current?.scrollTo({
                        x: newIndex * ITEM_WIDTH,
                        animated: true,
                      });
                      setSelectedDateIndex(newIndex);
                    }
                  }}
                >
                  <MoveRight size={16} color={'white'} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Progress cards */}
          <View style={styles.cardContainer}>
            <DonutCard
              title="Drinking water"
              percent={10}
              icon={IMAGES.WaterGlass}
            />

            <DonutCard
              title="Cycling"
              percent={40}
              icon={<Text style={{ fontSize: 26 }}>🚴</Text>}
            />

            <DonutCard
              title="Running"
              percent={60}
              icon={<Text style={{ fontSize: 26 }}>🏃‍♂️</Text>}
            />

            <DonutCard
              title="Reading"
              percent={30}
              icon={<Text style={{ fontSize: 26 }}>📚</Text>}
            />

            <DonutCard
              title="Sleeping"
              percent={80}
              icon={<Text style={{ fontSize: 26 }}>😴</Text>}
            />

            <DonutCard
              title="Meditation"
              percent={50}
              icon={<Text style={{ fontSize: 26 }}>🧘‍♂️</Text>}
            />

            <DonutCard
              title="Gym Workout"
              percent={70}
              icon={<Text style={{ fontSize: 26 }}>💪</Text>}
            />

            <DonutCard
              title="Coding Practice"
              percent={90}
              icon={<Text style={{ fontSize: 26 }}>💻</Text>}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Latest Activity</Text>
              <TouchableOpacity
                onPress={() => setShowAllActivities(!showAllActivities)}
              >
                <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
                  {showAllActivities ? 'See less' : 'See more'}
                </Text>
              </TouchableOpacity>
            </View>

            {(showAllActivities ? activities : activities.slice(0, 3)).map(
              (activity, index) => (
                <ActivityCard
                  key={index}
                  title={activity.title}
                  time={activity.time}
                  onPress={() => {}}
                />
              ),
            )}
          </View>
        </ScrollView>

        <AnimatedTouchable
          style={[styles.addButton, { transform: [{ scale: pulseAnim }] }]}
          activeOpacity={0.85}
          onPressIn={() => {
            // temporarily shrink on press
            Animated.spring(pulseAnim, {
              toValue: 0.95,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.spring(pulseAnim, {
              toValue: 1.06,
              useNativeDriver: true,
            }).start(() => {});
          }}
          onPress={() => {
            if (navigation && typeof navigation.navigate === 'function') {
              // navigation.navigate('AddScreen');
            }
          }}
        >
          <Text style={styles.addButtonText}>+</Text>
        </AnimatedTouchable>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4d57c8',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headersub: {
    backgroundColor: '#92A3FD',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    gap: 5,
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },

  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#E8E6FF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  DateContainer: {
    width: '100%',
  },
  datesScroll: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  dateItem: {
    width: 50,
    height: 50,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
  },
  dateItemSelected: {
    backgroundColor: '#8A78FF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  dateDay: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  dateNum: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '700',
  },
  dateTextSelected: {
    color: '#FFFFFF',
  },
  dateRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowButton: {
    width: 30,
    height: 30,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 6,
  },
  arrowIcon: {
    color: '#FFFFFF',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 24,
    color: '#FFFF',
    textAlign: 'left',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 12,
    marginBottom: 20,
  },
  section: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFF',
  },

  addButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 50,
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 99,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '600',
  },
});

export default HomeScreen;
