import SplashLogo from '../assets/images/splashlogo.png';
import HabitFirst from '../assets/images/babitfirs.jpg';
import HabitTrackerLogo from '../assets/images/logohabit.png'
import GoogleLogo from '../assets/images/googleimg.jpeg'
import FacebookLogo from '../assets/images/facebooklogo.png'
import AppleLogo from '../assets/images/applelogo.png'
import GithubLogo from '../assets/images/githublogo.jpg'
export const IMAGES = {
    SplashLogo,
    HabitFirst,
    HabitTrackerLogo,
    GoogleLogo,
    FacebookLogo,
    AppleLogo,
    GithubLogo
} as const;

// Type for image keys - useful for TypeScript autocompletion
export type ImageKeys = keyof typeof IMAGES;

// Helper function to get image source
export const getImage = (key: ImageKeys) => IMAGES[key];