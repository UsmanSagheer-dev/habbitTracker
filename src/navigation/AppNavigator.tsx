import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { SplashScreen } from '../components';
import { HomeScreen, OnboardingScreen, WelcomeScreen, LoginScreen, SignupScreen } from '../screens';
import HabitsScreen from '../screens/HabitsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, MainTabParamList } from './types';
import { IMAGES } from '../constants/images';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();



const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 1,
                    borderTopColor: '#E2E8F0',
                    paddingBottom: 5,
                    paddingTop: 5,
                    height: 60,
                },
                tabBarActiveTintColor: '#6C63FF',
                tabBarInactiveTintColor: '#A0AEC0',
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color, fontSize: 20 }}>🏠</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Habits"
                component={HabitsScreen}
                options={{
                    tabBarLabel: 'Habits',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color, fontSize: 20 }}>✅</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarLabel: 'Stats',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color, fontSize: 20 }}>📊</Text>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color }: { color: string }) => (
                        <Text style={{ color, fontSize: 20 }}>👤</Text>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const AppNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Splash">
                {(props: { navigation: StackNavigationProp<RootStackParamList, 'Splash'> }) => (
                    <SplashScreen
                        logoSource={IMAGES.SplashLogo}
                        onAnimationEnd={() => props.navigation.replace('Onboarding')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Onboarding">
                {(props: { navigation: StackNavigationProp<RootStackParamList, 'Onboarding'> }) => (
                    <OnboardingScreen
                        onComplete={() => props.navigation.replace('Welcome')}
                    />
                )}
            </Stack.Screen>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
    );
};

export default AppNavigator;