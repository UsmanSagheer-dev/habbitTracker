export type RootStackParamList = {
    Splash: undefined;
    Onboarding: undefined;
    Welcome: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    OTPVerification: { email: string };
    ResetPassword: { email: string; otp: string };
    PasswordResetSuccess: undefined;
    Main: undefined;
};

export type MainTabParamList = {
    Home: undefined;
    Habits: undefined;
    Statistics: undefined;
    Profile: undefined;
};