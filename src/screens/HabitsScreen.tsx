import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '../components/AppHeader';
import { useNavigation } from '@react-navigation/native';

const HabitsScreen: React.FC = () => {
  const navigation: any = useNavigation();
  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <AppHeader navigation={navigation} headertext="Stats" />

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Create New Habit</Text>
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Habits</Text>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <View style={styles.habitHeader}>
                  <Text style={styles.habitName}>Morning Exercise</Text>
                  <Text style={styles.habitStreak}>🔥 7 days</Text>
                </View>
                <Text style={styles.habitDescription}>
                  30 minutes of workout every morning
                </Text>
                <Text style={styles.habitTime}>⏰ 6:00 AM</Text>
              </View>
              <View style={styles.habitProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '70%' }]} />
                </View>
                <Text style={styles.progressText}>70%</Text>
              </View>
            </View>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <View style={styles.habitHeader}>
                  <Text style={styles.habitName}>Read Books</Text>
                  <Text style={styles.habitStreak}>🔥 12 days</Text>
                </View>
                <Text style={styles.habitDescription}>
                  Read for at least 30 minutes
                </Text>
                <Text style={styles.habitTime}>⏰ 7:00 PM</Text>
              </View>
              <View style={styles.habitProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '85%' }]} />
                </View>
                <Text style={styles.progressText}>85%</Text>
              </View>
            </View>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <View style={styles.habitHeader}>
                  <Text style={styles.habitName}>Drink Water</Text>
                  <Text style={styles.habitStreak}>🔥 5 days</Text>
                </View>
                <Text style={styles.habitDescription}>
                  8 glasses of water daily
                </Text>
                <Text style={styles.habitTime}>⏰ Throughout the day</Text>
              </View>
              <View style={styles.habitProgress}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: '60%' }]} />
                </View>
                <Text style={styles.progressText}>60%</Text>
              </View>
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
    backgroundColor: '#4d57c8',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
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
    paddingHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#48BB78',
    borderRadius: 25,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D3748',
    marginBottom: 15,
  },
  habitCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  habitInfo: {
    marginBottom: 15,
  },
  habitHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  habitName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3748',
  },
  habitStreak: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  habitDescription: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 5,
  },
  habitTime: {
    fontSize: 14,
    color: '#6C63FF',
    fontWeight: '600',
  },
  habitProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    marginRight: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6C63FF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#6C63FF',
  },
});

export default HabitsScreen;
