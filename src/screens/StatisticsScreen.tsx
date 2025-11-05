import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const StatisticsScreen: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(1);
  const [longestStreak, setLongestStreak] = useState(1);
  const navigation: any = useNavigation();

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const daysInMonth = 31; // For demo purposes
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        status: i <= 5 ? 'complete' : i <= 10 ? 'partial' : 'none',
      });
    }
    return daysArray;
  };

  const calendarDays = generateCalendarDays();
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <AppHeader headertext="Your statss" navigation={navigation} />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Calendar Card */}
          <View style={styles.calendarCard}>
            {/* Week days header */}
            <View style={styles.weekDaysRow}>
              {weekDays.map((day, index) => (
                <Text key={index} style={styles.weekDayText}>
                  {day}
                </Text>
              ))}
            </View>

            {/* Calendar grid */}
            <View style={styles.calendarGrid}>
              {calendarDays.map((dayObj, index) => (
                <View key={index} style={styles.dayCell}>
                  <Text style={styles.dayNumber}>{dayObj.day}</Text>
                  {dayObj.status !== 'none' && (
                    <View
                      style={[
                        styles.statusDot,
                        dayObj.status === 'complete'
                          ? styles.completeDot
                          : styles.partialDot,
                      ]}
                    />
                  )}
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.completeDot]} />
                <Text style={styles.legendText}>All complete</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, styles.partialDot]} />
                <Text style={styles.legendText}>Some complete</Text>
              </View>
            </View>
          </View>

          {/* Motivation Card */}
          <View style={styles.motivationCard}>
            <Text style={styles.motivationText}>
              Complete habit to build your longest streak of perfect day.
            </Text>
          </View>

          {/* Current Streak Card */}
          <View style={styles.streakCard}>
            <Text style={styles.streakNumber}>{currentStreak} Day</Text>
            <Text style={styles.streakLabel}>Your current streak</Text>
            <Text style={styles.longestStreakNumber}>{longestStreak} Day</Text>
            <Text style={styles.longestStreakLabel}>Your longest streak</Text>
          </View>

          {/* Bottom Cards */}
          <View style={styles.bottomCardsRow}>
            <View style={styles.smallCard}>
              <View style={styles.calendarIcon}>
                <Text style={styles.calendarIconText}>📅</Text>
              </View>
              <Text style={styles.smallCardNumber}>{currentStreak} Day</Text>
            </View>
            <View style={styles.smallCard}>
              <View style={styles.checkIcon}>
                <Text style={styles.checkIconText}>✓</Text>
              </View>
              <Text style={styles.smallCardNumber}>{currentStreak} Day</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTextContainer: {
    flex: 1,
    alignItems: 'center',
    marginLeft: -44,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  calendarCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  weekDayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6C63FF',
    width: 40,
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  dayNumber: {
    fontSize: 14,
    color: '#2D3748',
    fontWeight: '500',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 4,
  },
  completeDot: {
    backgroundColor: '#6C63FF',
  },
  partialDot: {
    backgroundColor: '#B8B0FF',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E8E6FF',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#718096',
  },
  motivationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 15,
  },
  motivationText: {
    fontSize: 14,
    color: '#6C63FF',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  streakCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginBottom: 15,
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 5,
  },
  streakLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 20,
  },
  longestStreakNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 5,
  },
  longestStreakLabel: {
    fontSize: 14,
    color: '#718096',
  },
  bottomCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  smallCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    flex: 0.48,
    alignItems: 'center',
  },
  calendarIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  calendarIconText: {
    fontSize: 24,
  },
  checkIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6FFFA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkIconText: {
    fontSize: 24,
    color: '#38B2AC',
  },
  smallCardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
});

export default StatisticsScreen;
