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

const HomeScreen: React.FC = () => {
  const navigation: any = useNavigation();

  return (
    <>
      <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>My Habits</Text>
            <Text style={styles.headerSubtitle}>Track your daily progress</Text>
          </View>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => {
              // open drawer if available
              if (navigation && typeof navigation.openDrawer === 'function') {
                navigation.openDrawer();
              }
            }}
          >
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Active Habits</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>75%</Text>
              <Text style={styles.statLabel}>Success Rate</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Today's Habits</Text>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>Morning Exercise</Text>
                <Text style={styles.habitTime}>6:00 AM</Text>
              </View>
              <TouchableOpacity style={styles.checkButton}>
                <Text style={styles.checkButtonText}>✓</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>Read for 30 minutes</Text>
                <Text style={styles.habitTime}>7:00 PM</Text>
              </View>
              <TouchableOpacity style={styles.checkButton}>
                <Text style={styles.checkButtonText}>✓</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.habitCard}>
              <View style={styles.habitInfo}>
                <Text style={styles.habitName}>Drink 8 glasses of water</Text>
                <Text style={styles.habitTime}>Throughout the day</Text>
              </View>
              <TouchableOpacity style={styles.checkButton}>
                <Text style={styles.checkButtonText}>✓</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>+ Add New Habit</Text>
          </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    flex: 1,
  },
  menuButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
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
    paddingHorizontal: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    flex: 0.48,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6C63FF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#8F8F8F',
    textAlign: 'center',
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
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 5,
  },
  habitTime: {
    fontSize: 14,
    color: '#8F8F8F',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#48BB78',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 30,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default HomeScreen;