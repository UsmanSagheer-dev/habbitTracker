import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, TouchableOpacity } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

type DonutCardProps = {
  title: string;
  percent: number;
  size?: number;
  primaryColor?: string;
  secondaryColor?: string;
  icon?: any; 
  style?: ViewStyle;
  onPress?: () => void;
  percentTextColor?: string;
};

const DonutCard: React.FC<DonutCardProps> = ({
  title,
  percent,
  size = 120,
  primaryColor = '#39A6FF',
  secondaryColor = '#E9EDF9',
  icon,
  style,
  onPress,
  percentTextColor = '#6C63FF',
}) => {
  // Clamp percent between 0–100
  const progress = Math.min(Math.max(percent, 0), 100);

  const strokeWidth = 18;
  const halfSize = size / 2;
  const radius = halfSize - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress / 100);

  const Container: any = onPress ? TouchableOpacity : View;

  return (
    <Container style={[styles.card, style]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.pieWrap}>
        <Svg width={size} height={size}>
          <G rotation={-90} origin={`${halfSize}, ${halfSize}`}>
            {/* Background Circle */}
            <Circle
              stroke={secondaryColor}
              cx={halfSize}
              cy={halfSize}
              r={radius}
              strokeWidth={strokeWidth}
              fill="none"
            />
            {/* Progress Circle */}
            <Circle
              stroke={primaryColor}
              cx={halfSize}
              cy={halfSize}
              r={radius}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={strokeDashoffset}
              fill="none"
            />
          </G>
        </Svg>

        <View
          style={[
            styles.center,
            {
              width: size - strokeWidth * 2,
              height: size - strokeWidth * 2,
              borderRadius: (size - strokeWidth * 2) / 2,
            },
          ]}
        >
          {icon &&
            (React.isValidElement(icon) ? (
              icon
            ) : (
              <Image source={icon} style={styles.icon} />
            ))}
        </View>
      </View>

      <View style={styles.meta}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.percentText, { color: percentTextColor }]}>{progress}%</Text>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexBasis: '48%',
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  pieWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8FAFF',
  },
  icon: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  meta: {
    marginTop: 8,
    alignItems: 'flex-start',
    width: '100%',
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 16,
    color: '#4B5563',
    fontWeight: '600',
  },
  percentText: {
    marginTop: 4,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default DonutCard;
