import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IMAGES } from '../constants/images';

type Props = {
  navigation?: any;
  headertext?: string;
  showHeaderText?: boolean;
};

const AppHeader: React.FC<Props> = ({
  navigation,
  headertext,
  showHeaderText = true,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headersub}>
        <Image source={IMAGES.Diamond} />
        <Text style={styles.headerText}>Try Free</Text>
      </TouchableOpacity>
      {showHeaderText && headertext ? (
        <Text style={styles.centerText}>{headertext}</Text>
      ) : null}
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
  );
};

const styles = StyleSheet.create({
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
  centerText: {
    fontSize: 18,
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
});

export default AppHeader;
