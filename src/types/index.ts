import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export enum ToastType {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
}

export type ToastProps = {
  title: string;
  description?: string;
  type: ToastType;
  visibilityTime?: number;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  withShadow?: boolean;
  topOffset?: number;
  touchable?: boolean;
};

export type ToastViewRefProps = {
  show: (props: ToastProps) => void;
  hide: () => void;
};

export type ToastViewProps = {
  leftIconComponent?: React.ReactNode;
  rightIconComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
};
