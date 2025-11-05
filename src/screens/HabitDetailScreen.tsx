import React, { useState } from 'react';
import { Modal, TextInput } from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IMAGES } from '../constants/images';
import { MoveLeft } from 'lucide-react-native';
import DonutCard from '../components/DonutCard';

// ---------- Habit-specific config ----------
interface HabitConfig {
  icon: any;
  unit: string;
  dailyGoal: number | string;
  color: string;
  weeklyData?: number[];
}

const HABIT_CONFIG: Record<string, HabitConfig> = {
  'Drinking water': {
    icon: IMAGES.WaterGlass,
    unit: 'L',
    dailyGoal: 8,
    color: '#00C2FF',
    weeklyData: [6, 7, 8, 5, 8, 7, 8],
  },
  Cycling: {
    icon: <Text style={{ fontSize: 32 }}>🚴</Text>,
    unit: 'km',
    dailyGoal: 10,
    color: '#FF9500',
    weeklyData: [8, 12, 7, 10, 15, 9, 11],
  },
  Running: {
    icon: <Text style={{ fontSize: 32 }}>🏃‍♂️</Text>,
    unit: 'km',
    dailyGoal: 5,
    color: '#FF3B30',
    weeklyData: [4, 5, 3, 6, 5, 4, 7],
  },
  Reading: {
    icon: <Text style={{ fontSize: 32 }}>📚</Text>,
    unit: 'min',
    dailyGoal: 30,
    color: '#AF52DE',
    weeklyData: [20, 35, 25, 40, 30, 28, 32],
  },
  Sleeping: {
    icon: <Text style={{ fontSize: 32 }}>😴</Text>,
    unit: 'hrs',
    dailyGoal: 8,
    color: '#5AC8FA',
    weeklyData: [7, 8, 6, 9, 8, 7, 8],
  },
  Meditation: {
    icon: <Text style={{ fontSize: 32 }}>🧘‍♂️</Text>,
    unit: 'min',
    dailyGoal: 15,
    color: '#34C759',
    weeklyData: [10, 15, 12, 20, 15, 18, 14],
  },
  'Gym Workout': {
    icon: <Text style={{ fontSize: 32 }}>💪</Text>,
    unit: 'min',
    dailyGoal: 45,
    color: '#FF2D55',
    weeklyData: [30, 50, 40, 45, 60, 35, 55],
  },
  'Coding Practice': {
    icon: <Text style={{ fontSize: 32 }}>💻</Text>,
    unit: 'min',
    dailyGoal: 60,
    color: '#007AFF',
    weeklyData: [45, 70, 55, 80, 90, 60, 75],
  },
};

const HabitDetailScreen: React.FC = () => {
  const route: any = useRoute();
  const navigation: any = useNavigation();
  const { title = 'Habit', percent = 0 } = route.params || {};

  const config = HABIT_CONFIG[title] || {
    icon: <Text style={{ fontSize: 32 }}>📌</Text>,
    unit: '',
    dailyGoal: 0,
    color: '#6C63FF',
    weeklyData: [0, 0, 0, 0, 0, 0, 0],
  };

  const [todayProgress, setTodayProgress] = useState(
    Math.round((percent / 100) * (config.dailyGoal as number))
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const weekly = config.weeklyData!;
  const maxWeekly = Math.max(...weekly, 1);
  const maxBarHeight = 120;

  // ---------- Log Progress ----------
  const logProgress = () => {
    setModalVisible(true);
  };

  const handleAddProgress = () => {
    const num = parseFloat(inputValue || '0');
    if (!isNaN(num) && num > 0) {
      setTodayProgress(todayProgress + num);
      setInputValue('');
      setModalVisible(false);
    }
  };

  const currentPercent = config.dailyGoal
    ? Math.min(100, Math.round((todayProgress / (config.dailyGoal as number)) * 100))
    : percent;

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Log {title}</Text>
            <Text style={{ marginBottom: 8 }}>Enter amount in {config.unit}:</Text>
            <TextInput
              style={styles.input}
              value={inputValue}
              onChangeText={setInputValue}
              keyboardType="decimal-pad"
              placeholder={`e.g. 2 ${config.unit}`}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16 }}>
              <TouchableOpacity onPress={() => { setModalVisible(false); setInputValue(''); }} style={[styles.modalBtn, { backgroundColor: '#ccc' }]}> 
                <Text style={{ color: '#333', fontWeight: 'bold' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddProgress} style={[styles.modalBtn, { backgroundColor: '#6C63FF', marginLeft: 10 }]}> 
                <Text style={{ color: '#fff', fontWeight: 'bold' }}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MoveLeft size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headersub}>
          <Image source={IMAGES.Diamond} style={{ width: 16, height: 16 }} />
          <Text style={styles.headerText}>Try Free</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Habit Title + Icon */}
        <View style={styles.titleRow}>
          <View style={styles.iconBox}>{config.icon}</View>
          <Text style={styles.title}>{title}</Text>
        </View>

        {/* Donut + Today Progress */}
        <View style={styles.donutSection}>
          <DonutCard
            title=""
            percent={currentPercent}
            size={140}
            primaryColor={config.color}
            icon={config.icon}
            percentTextColor="#FFFFFF"
            style={{ backgroundColor: 'transparent', shadowColor: 'transparent' }}
          />
         
          <View style={styles.progressText}>
            <Text style={styles.progressValue}>
              {todayProgress} {config.unit}
            </Text>
            <Text style={styles.progressGoal}>
              / {config.dailyGoal} {config.unit}
            </Text>
          </View>
        </View>

        {/* Today Target Card */}
        <View style={styles.topCard}>
          <View style={styles.todayHeaderRow}>
            <Text style={styles.sectionTitle}>Today Target</Text>
            <TouchableOpacity style={styles.addButton} onPress={logProgress}>
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.smallCardsRow}>
            <View style={styles.smallCard}>
              <Text style={styles.smallCardTitle}>
                {todayProgress} {config.unit}
              </Text>
              <Text style={styles.smallCardSub}>Completed</Text>
            </View>
            <View style={styles.smallCard}>
              <Text style={styles.smallCardTitle}>
                {config.dailyGoal} {config.unit}
              </Text>
              <Text style={styles.smallCardSub}>Goal</Text>
            </View>
          </View>
        </View>

        {/* Weekly Activity Chart */}
        <View style={styles.activityCard}>
          <View style={styles.activityHeader}>
            <Text style={styles.activityTitle}>Activity Progress</Text>
            <View style={styles.filterPill}>
              <Text style={styles.filterText}>Weekly</Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weeklyChartContent}
          >
            {weekly.map((val, idx) => {
              const height = Math.max(8, (val / maxWeekly) * maxBarHeight);
              return (
                <View key={idx} style={styles.weekColumn}>
                  <View style={[styles.bar, { height, backgroundColor: config.color }]} />
                  <Text style={styles.dayLabel}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][idx]}
                  </Text>
                  <Text style={styles.barValue}>{val}</Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* ------------------- Styles ------------------- */
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#F4F7FF',
  },
  modalBtn: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 8,
  },
  container: { flex: 1, backgroundColor: '#4d57c8' },
  header: {
    paddingHorizontal: 16,
    paddingTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: { padding: 8 },
  headersub: {
    backgroundColor: '#92A3FD',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: 'center',
    gap: 5,
  },
  headerText: { color: '#FFFFFF', fontWeight: '500' },
  content: { padding: 16 },

  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  iconBox: { marginRight: 12 },
  title: { fontSize: 26, fontWeight: '700', color: '#FFFFFF' },

  donutSection: { alignItems: 'center', marginVertical: 10 },
  progressText: { alignItems: 'center', marginTop: 8 },
  progressValue: { fontSize: 20, fontWeight: '700', color: '#FFFFFF' },
  progressGoal: { fontSize: 14, color: '#D1D1FF' },

  topCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
  },
  todayHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#2B2D42' },
  addButton: {
    backgroundColor: '#6C63FF',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: { color: '#fff', fontSize: 20, fontWeight: '600' },
  smallCardsRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  smallCard: {
    backgroundColor: '#F4F7FF',
    borderRadius: 12,
    padding: 12,
    width: '48%',
    alignItems: 'center',
  },
  smallCardTitle: { fontSize: 18, fontWeight: '700', color: '#273444' },
  smallCardSub: { fontSize: 12, color: '#8B92A7', marginTop: 4 },

  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
  },
  activityHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  activityTitle: { fontSize: 16, fontWeight: '700', color: '#273444' },
  filterPill: { backgroundColor: '#F2F4FF', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
  filterText: { color: '#6B6F86', fontWeight: '600' },

  weeklyChartContent: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 2 },
  weekColumn: { alignItems: 'center', width: 50, marginHorizontal: 4 },
  bar: { width: 20, borderRadius: 8 },
  dayLabel: { marginTop: 8, fontSize: 12, color: '#8B92A7' },
  barValue: { marginTop: 4, fontSize: 10, color: '#273444', fontWeight: '600' },
});

export default HabitDetailScreen;