import SplashLogo from '../assets/images/splashlogo.png';

export const IMAGES = {
    SplashLogo,
} as const;

// Type for image keys - useful for TypeScript autocompletion
export type ImageKeys = keyof typeof IMAGES;

// Helper function to get image source
export const getImage = (key: ImageKeys) => IMAGES[key];