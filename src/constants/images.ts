import SplashLogo from '../assets/images/splashlogo.png';
import HabitFirst from '../assets/images/babitfirs.jpg';
import HabitTrackerLogo from '../assets/images/logohabit.png';
import GoogleLogo from '../assets/images/googleimg.jpeg';
import FacebookLogo from '../assets/images/facebooklogo.png';
import AppleLogo from '../assets/images/applelogo.png';
import GithubLogo from '../assets/images/githublogo.jpg';
import ArrowLeft from '../assets/images/arrowleft.jpg';
import Diamond from '../assets/images/diamond.png';
import WaterGlass from '../assets/images/waterglass.png';
export const IMAGES = {
  SplashLogo,
  HabitFirst,
  HabitTrackerLogo,
  GoogleLogo,
  FacebookLogo,
  AppleLogo,
  GithubLogo,
  ArrowLeft,
  Diamond,
  WaterGlass,
} as const;

export type ImageKeys = keyof typeof IMAGES;

export const getImage = (key: ImageKeys) => IMAGES[key];
