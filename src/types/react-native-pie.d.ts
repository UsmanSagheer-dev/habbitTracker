declare module 'react-native-pie' {
  import { ComponentType } from 'react';
  import { ViewProps } from 'react-native';

  export type PieSection = {
    percentage: number;
    color: string;
    onPress?: () => void;
  };

  export interface PieProps extends ViewProps {
    radius?: number;
    innerRadius?: number;
    sections?: PieSection[];
    strokeCap?: 'butt' | 'round';
  }

  const Pie: ComponentType<PieProps>;
  export default Pie;
}
