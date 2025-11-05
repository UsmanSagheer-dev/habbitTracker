import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, MoveLeft } from 'lucide-react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IMAGES } from '../constants/images';

interface DailyTask {
  id: number;
  day: string;
  task: string;
  subtitle: string;
  completed: boolean;
}

const ChallengeDetailScreen: React.FC = () => {
  const navigation: any = useNavigation();
  const route: any = useRoute();
  const [tasks, setTasks] = useState<DailyTask[]>([
    {
      id: 1,
      day: 'Wed',
      task: 'Drink water when your wake up',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 2,
      day: 'Thu',
      task: 'Drink water when your wake up',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 3,
      day: 'Fri',
      task: 'Drink water when your wake up',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 4,
      day: 'Sat',
      task: 'Morning exercise routine',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 5,
      day: 'Sun',
      task: 'Healthy breakfast',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 6,
      day: 'Mon',
      task: 'Meditation session',
      subtitle: 'Start your daily habit',
      completed: false,
    },
    {
      id: 7,
      day: 'Tue',
      task: 'Evening walk',
      subtitle: 'Start your daily habit',
      completed: false,
    },
  ]);

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {/* Header with curved background */}

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MoveLeft size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headersub}>
            <Image source={IMAGES.Diamond} style={{ width: 16, height: 16 }} />
            <Text style={styles.headerText}>Try Free</Text>
          </TouchableOpacity>
        </View>

        {/* Daily Tasks List */}
        <ScrollView
          style={styles.content}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {tasks.map((task, index) => (
            <View key={task.id} style={styles.taskRow}>
              {/* Timeline indicator */}
              <View style={styles.timelineContainer}>
                <Text style={styles.dayLabel}>{task.day}</Text>
                <View style={styles.timelineDot} />
                {index < tasks.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              {/* Task Card */}
              <View style={styles.taskCard}>
                <View style={styles.iconContainer}>
                  <Text style={styles.iconEmoji}>💧</Text>
                </View>
                <View style={styles.taskTextContainer}>
                  <Text style={styles.taskTitle}>{task.task}</Text>
                  <Text style={styles.taskSubtitle}>{task.subtitle}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Start Challenge Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.startButton}>
            <Text style={styles.startButtonText}>START CHALLENGE</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  headerContainer: {
    backgroundColor: '#B8B0FF',
    paddingBottom: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  headerText: { color: '#FFFFFF', fontWeight: '500' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
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
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
    zIndex: 2,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
  
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 15,
  },
  challengeInfo: {
    paddingHorizontal: 30,
    paddingTop: 10,
    paddingBottom: 30,
    zIndex: 2,
  },
  challengeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  challengeDuration: {
    fontSize: 14,
    color: '#E8E6FF',
  },
  yellowCircle: {
    position: 'absolute',
    top: 40,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFEB3B',
    zIndex: 1,
  },
  curvedBottom: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 500,
    borderBottomRightRadius: 500,
    transform: [{ scaleX: 2 }],
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  taskRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 40,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffff',
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#D1D1FF',
    minHeight: 60,
  },
  taskCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconEmoji: {
    fontSize: 24,
  },
  taskTextContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 4,
  },
  taskSubtitle: {
    fontSize: 13,
    color: '#718096',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 20,
   backgroundColor: '#6C63FF',
  },
  startButton: {
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: '#6C63FF',
    borderRadius: 30,
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

export default ChallengeDetailScreen;
