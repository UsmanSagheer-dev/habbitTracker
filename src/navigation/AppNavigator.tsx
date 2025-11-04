import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import { SplashScreen } from '../components';
import { 
    HomeScreen, 
    OnboardingScreen, 
    WelcomeScreen, 
    LoginScreen, 
    SignupScreen,
    ForgotPasswordScreen,
    OTPVerificationScreen,
    ResetPasswordScreen,
    PasswordResetSuccessScreen,
    PostSignupOnboardingScreen,
    WakeUpTimeScreen,
    EndDayTimeScreen,
    ProcrastinationScreen,
    FocusScreen,
    OrganizationMotivationScreen,
    GoalsScreen,
    ContractScreen
} from '../screens';
import HabitsScreen from '../screens/HabitsScreen';
import StatisticsScreen from '../screens/StatisticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList, MainTabParamList } from './types';
import { IMAGES } from '../constants/images';


const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const Drawer = createDrawerNavigator();



const MainTabNavigator: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 8,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    paddingBottom: 8,
                    paddingTop: 8,
                    height: 70,
                },
                tabBarActiveTintColor: '#6C5CE7',
                tabBarInactiveTintColor: '#B2B2B2',
                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: '500',
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Habits"
                component={HabitsScreen}
                options={{
                    tabBarLabel: 'Mood Stat',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="happy" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Statistics"
                component={StatisticsScreen}
                options={{
                    tabBarLabel: 'Report',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="stats-chart" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Account',
                    tabBarIcon: ({ color, size }: { color: string; size: number }) => (
                        <Icon name="person-circle" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const RootDrawerNavigator: React.FC = () => {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="MainTabs" component={MainTabNavigator} />
        </Drawer.Navigator>
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
            <Stack.Screen name="PostSignupOnboarding" component={PostSignupOnboardingScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="PasswordResetSuccess" component={PasswordResetSuccessScreen} />
            <Stack.Screen name="Main" component={RootDrawerNavigator} />
            <Stack.Screen name="WakeUpTime" component={WakeUpTimeScreen} />
            <Stack.Screen name="EndDayTime" component={EndDayTimeScreen} />
            <Stack.Screen name="Procrastination" component={ProcrastinationScreen} />
            <Stack.Screen name="Focus" component={FocusScreen} />
            <Stack.Screen name="OrganizationMotivation" component={OrganizationMotivationScreen} />
            <Stack.Screen name="Goals" component={GoalsScreen} />
            <Stack.Screen name="Contract" component={ContractScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;