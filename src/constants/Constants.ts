import { Dimensions } from 'react-native';

export const win = Dimensions.get('window');

const Constants = {
  SPACING: 16,
  SCREEN_WIDTH: win.width,
  SCREEN_HEIGHT: win.height,
};

export default Constants;
