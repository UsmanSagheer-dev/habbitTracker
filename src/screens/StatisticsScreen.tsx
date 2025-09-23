import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    StatusBar,
} from 'react-native';

const StatisticsScreen: React.FC = () => {
    return (
        <>
            <StatusBar backgroundColor="#6C63FF" barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Statistics</Text>
                    <Text style={styles.headerSubtitle}>Track your progress</Text>
                </View>

                <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>75%</Text>
                            <Text style={styles.statLabel}>Success Rate</Text>
                            <Text style={styles.statSubtext}>This week</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Active Habits</Text>
                            <Text style={styles.statSubtext}>Total habits</Text>
                        </View>
                    </View>

                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>21</Text>
                            <Text style={styles.statLabel}>Current Streak</Text>
                            <Text style={styles.statSubtext}>Days</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statNumber}>87</Text>
                            <Text style={styles.statLabel}>Total Days</Text>
                            <Text style={styles.statSubtext}>All time</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Weekly Progress</Text>
                        <View style={styles.weeklyChart}>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Mon</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '80%' }]} />
                                </View>
                                <Text style={styles.percentageText}>80%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Tue</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '100%' }]} />
                                </View>
                                <Text style={styles.percentageText}>100%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Wed</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '60%' }]} />
                                </View>
                                <Text style={styles.percentageText}>60%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Thu</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '90%' }]} />
                                </View>
                                <Text style={styles.percentageText}>90%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Fri</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '70%' }]} />
                                </View>
                                <Text style={styles.percentageText}>70%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Sat</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '85%' }]} />
                                </View>
                                <Text style={styles.percentageText}>85%</Text>
                            </View>
                            <View style={styles.chartRow}>
                                <Text style={styles.dayLabel}>Sun</Text>
                                <View style={styles.progressBar}>
                                    <View style={[styles.progressFill, { width: '95%' }]} />
                                </View>
                                <Text style={styles.percentageText}>95%</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Best Performing Habits</Text>
                        <View style={styles.habitPerformance}>
                            <View style={styles.habitRow}>
                                <Text style={styles.habitName}>📚 Reading</Text>
                                <Text style={styles.habitScore}>95%</Text>
                            </View>
                            <View style={styles.habitRow}>
                                <Text style={styles.habitName}>💧 Drink Water</Text>
                                <Text style={styles.habitScore}>88%</Text>
                            </View>
                            <View style={styles.habitRow}>
                                <Text style={styles.habitName}>🏃‍♂️ Exercise</Text>
                                <Text style={styles.habitScore}>82%</Text>
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
        backgroundColor: '#F8F9FA',
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
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
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
        elevation: 4,
    },
    statNumber: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#6C63FF',
        marginBottom: 5,
    },
    statLabel: {
        fontSize: 14,
        color: '#2D3748',
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 2,
    },
    statSubtext: {
        fontSize: 12,
        color: '#A0AEC0',
        textAlign: 'center',
    },
    section: {
        marginTop: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2D3748',
        marginBottom: 15,
    },
    weeklyChart: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    chartRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    dayLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#4A5568',
        width: 40,
    },
    progressBar: {
        flex: 1,
        height: 8,
        backgroundColor: '#E2E8F0',
        borderRadius: 4,
        marginHorizontal: 10,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#6C63FF',
        borderRadius: 4,
    },
    percentageText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#6C63FF',
        width: 35,
        textAlign: 'right',
    },
    habitPerformance: {
        backgroundColor: '#FFFFFF',
        borderRadius: 25,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 4,
    },
    habitRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#F7FAFC',
    },
    habitName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2D3748',
    },
    habitScore: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#48BB78',
    },
});

export default StatisticsScreen;