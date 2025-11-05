import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import AppHeader from '../components/AppHeader';

interface Challenge {
  id: number;
  title: string;
  duration: string;
  progress: number;
}

const ChallengesScreen: React.FC = () => {
  const navigation: any = useNavigation();
const challenges: Challenge[] = [
  { id: 1, title: 'Happy Morning Challenge', duration: '7 Days Challenge', progress: 75 },
  { id: 2, title: 'Drink More Water', duration: '14 Days Challenge', progress: 45 },
  { id: 3, title: 'Daily Meditation', duration: '10 Days Challenge', progress: 90 },
  { id: 4, title: 'No Sugar Week', duration: '7 Days Challenge', progress: 30 },
  { id: 5, title: 'Early to Bed', duration: '21 Days Challenge', progress: 60 },
  { id: 6, title: 'Walk 10K Steps', duration: '14 Days Challenge', progress: 50 },
  { id: 7, title: 'Read Everyday', duration: '15 Days Challenge', progress: 80 },
  { id: 8, title: 'No Phone After 10PM', duration: '10 Days Challenge', progress: 20 },
];

  const renderProgressCircle = (progress: number) => {
    const size = 80;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <View style={styles.progressCircle}>
        <Svg width={size} height={size}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#B8B0FF"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#FFEB3B"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={`${circumference} ${circumference}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
        </Svg>
        <View style={styles.progressInner}>
          <View style={styles.yellowDot} />
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
       <AppHeader headertext="Challenges" navigation={navigation} />
        {/* Challenges List */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          {challenges.map((challenge, index) => (
            <TouchableOpacity
              key={challenge.id}
              style={styles.challengeCard}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ChallengeDetail', {
                  challengeTitle: challenge.title,
                  duration: challenge.duration,
                })
              }
            >
              <View style={styles.cardContent}>
                <View style={styles.textContainer}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDuration}>{challenge.duration}</Text>
                  <TouchableOpacity style={styles.joinButton}>
                    <Text style={styles.joinButtonText}>Join Now</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.progressContainer}>
                  {renderProgressCircle(challenge.progress)}
                </View>
              </View>
              {/* Decorative elements */}
              <View style={styles.decorativeDotsContainer}>
                <View style={[styles.decorativeDot, { top: 15, right: 15 }]} />
                <View style={[styles.decorativeDot, { top: 25, right: 35 }]} />
              </View>
            </TouchableOpacity>
          ))}
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    overflow: 'hidden',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    paddingRight: 15,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 6,
  },
  challengeDuration: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: '#B8B0FF',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  joinButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressInner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#B8B0FF',
  },
  yellowDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEB3B',
  },
  decorativeDotsContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  decorativeDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E8E6FF',
  },
});

export default ChallengesScreen;
