import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, G } from 'react-native-svg';
import { 
  Coffee,
  Bike,
  Droplet,
  Bird,
} from 'lucide-react-native';

interface HabitCardData {
  id: number;
  title: string;
  percent: number;
  icon: React.ReactNode;
  iconBgColor: string;
}

const HabitsScreen: React.FC = () => {
  const navigation: any = useNavigation();

  const habits: HabitCardData[] = [
    {
      id: 1,
      title: 'Drinking water',
      percent: 75,
      icon: <Coffee size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
    {
      id: 2,
      title: 'Cycling',
      percent: 40,
      icon: <Bike size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
    {
      id: 3,
      title: 'Water',
      percent: 40,
      icon: <Droplet size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
    {
      id: 4,
      title: 'Walking',
      percent: 40,
      icon: <Bird size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
    {
      id: 5,
      title: 'Water',
      percent: 40,
      icon: <Droplet size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
    {
      id: 6,
      title: 'Walking',
      percent: 40,
      icon: <Bird size={32} color="#7B7BFF" />,
      iconBgColor: '#F5F5FF',
    },
  ];

  const renderHabitCard = (habit: HabitCardData) => {
    const size = 100;
    const strokeWidth = 10;
    const halfSize = size / 2;
    const radius = halfSize - strokeWidth / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = Math.min(Math.max(habit.percent, 0), 100);
    const strokeDashoffset = circumference * (1 - progress / 100);

    return (
      <TouchableOpacity 
        key={habit.id} 
        style={styles.habitCard}
        onPress={() => navigation.navigate('HabitDetail', { habit })}
      >
        <View style={styles.circleContainer}>
          <Svg width={size} height={size}>
            <G rotation={-90} origin={`${halfSize}, ${halfSize}`}>
              {/* Background Circle */}
              <Circle
                stroke="#E5E5FF"
                cx={halfSize}
                cy={halfSize}
                r={radius}
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                stroke="#7B7BFF"
                cx={halfSize}
                cy={halfSize}
                r={radius}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                fill="none"
              />
            </G>
          </Svg>
          <View style={[styles.iconContainer, { backgroundColor: habit.iconBgColor }]}>
            {habit.icon}
          </View>
        </View>
        <Text style={styles.habitTitle}>{habit.title}</Text>
        <Text style={styles.habitPercent}>{habit.percent}%</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.openDrawer?.()}
          >
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>All Habits</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView 
          style={styles.content} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {habits.map(habit => renderHabitCard(habit))}
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
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuButton: {
    width: 30,
    height: 30,
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  menuLine: {
    width: '100%',
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 30,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    paddingTop: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  habitCard: {
    backgroundColor: '#F5F5FF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#7B7BFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  circleContainer: {
    position: 'relative',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5FF',
  },
  habitTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7B7BFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  habitPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: '#7B7BFF',
    textAlign: 'center',
  },
});

export default HabitsScreen;
 