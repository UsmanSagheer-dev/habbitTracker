import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    StatusBar,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen: React.FC = () => {
    const navigation = useNavigation<ProfileScreenNavigationProp>();

    const handleLogout = () => {
        Alert.alert(
            'Sign Out',
            'Are you sure you want to sign out?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Sign Out',
                    style: 'destructive',
                    onPress: () => {
                        // Reset navigation stack and go to login
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'Login' }],
                        });
                    },
                },
            ]
        );
    };
    return (
        <>
            <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.profileInfo}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>JD</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.userName}>John Doe</Text>
                            <Text style={styles.userEmail}>john.doe@example.com</Text>
                            <Text style={styles.memberSince}>Member since Jan 2024</Text>
                        </View>
                    </View>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.achievementsCard}>
                        <Text style={styles.cardTitle}>Achievements</Text>
                        <View style={styles.achievementRow}>
                            <View style={styles.achievement}>
                                <Text style={styles.achievementIcon}>🏆</Text>
                                <Text style={styles.achievementText}>Consistency Master</Text>
                            </View>
                            <View style={styles.achievement}>
                                <Text style={styles.achievementIcon}>🔥</Text>
                                <Text style={styles.achievementText}>30-Day Streak</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.settingsCard}>
                        <Text style={styles.cardTitle}>Settings</Text>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingIcon}>🔔</Text>
                            <Text style={styles.settingText}>Notifications</Text>
                            <Text style={styles.settingArrow}>{">"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingIcon}>🎨</Text>
                            <Text style={styles.settingText}>Theme</Text>
                            <Text style={styles.settingArrow}>{">"}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.settingItem}>
                            <Text style={styles.settingIcon}>❓</Text>
                            <Text style={styles.settingText}>Help & Support</Text>
                            <Text style={styles.settingArrow}>{">"}</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Sign Out</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    header: {
        backgroundColor: '#6C63FF',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 30,
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
    profileInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    avatarText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6C63FF',
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 14,
        color: '#E8E6FF',
        marginBottom: 2,
    },
    memberSince: {
        fontSize: 12,
        color: '#B794F6',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    achievementsCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        marginTop: 20,
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
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 15,
    },
    achievementRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    achievement: {
        alignItems: 'center',
        flex: 0.48,
        padding: 10,
        backgroundColor: '#F7FAFC',
        borderRadius: 15,
    },
    achievementIcon: {
        fontSize: 24,
        marginBottom: 5,
    },
    achievementText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4A5568',
        textAlign: 'center',
    },
    settingsCard: {
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
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F7FAFC',
    },
    settingIcon: {
        fontSize: 20,
        marginRight: 15,
        width: 25,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#2D3748',
        fontWeight: '500',
    },
    settingArrow: {
        fontSize: 16,
        color: '#A0AEC0',
        fontWeight: 'bold',
    },
    logoutButton: {
        backgroundColor: '#E53E3E',
        borderRadius: 25,
        padding: 16,
        alignItems: 'center',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;