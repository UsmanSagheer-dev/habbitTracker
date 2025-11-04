import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ActivityCardProps = {
  title: string;
  time: string;
  onPress?: () => void;
  checked?: boolean;
};

const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  time,
  onPress,
  checked = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.checkButton, checked && styles.checkButtonChecked]}
        onPress={onPress}
      >
        <Text style={styles.checkButtonText}>✓</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D3748',
    marginBottom: 5,
  },
  time: {
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
  checkButtonChecked: {
    opacity: 0.7,
  },
  checkButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ActivityCard;
