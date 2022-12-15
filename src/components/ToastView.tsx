/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  Easing,
  // useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Colors from '../constants/Colors';
import Constants from '../constants/Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  ToastProps,
  ToastType,
  ToastViewProps,
  ToastViewRefProps,
} from '../types';

const ToastView = forwardRef<ToastViewRefProps, ToastViewProps>(
  (
    {
      leftIconComponent,
      rightIconComponent,
      style,
      titleStyle,
      descriptionStyle,
    },
    ref
  ) => {
    const translateY = useSharedValue(-Constants.SCREEN_HEIGHT);
    // const context = useSharedValue({ y: -Constants.SCREEN_HEIGHT });

    const topOffset = useRef(10);
    const touchable = useRef(true);

    const [data, setData] = useState<ToastProps>({
      title: '',
      type: ToastType.SUCCESS,
      visibilityTime: 5000,
    });

    const [_, setIsVisible] = useState(false);
    const timer = useRef<NodeJS.Timeout>();

    useImperativeHandle(ref, () => ({
      show: (toastProps) => {
        showToast(toastProps);
      },
      hide: () => {
        hideToast();
      },
    }));

    const animateShow = useCallback(
      (_timeout: number | undefined) => {
        'worklet';
        translateY.value = withSequence(
          withTiming(-Constants.SCREEN_HEIGHT, {
            duration: 0,
            easing: Easing.linear,
          }),
          withTiming(topOffset.current, {
            duration: 500,
            easing: Easing.linear,
          })
        );
      },
      [topOffset.current]
    );

    const animateHide = useCallback(() => {
      'worklet';
      translateY.value = withTiming(-Constants.SCREEN_HEIGHT, {
        easing: Easing.linear,
        duration: 1000,
      });
    }, []);

    // TODO: Add gestures
    // const gestureHandler = useAnimatedGestureHandler({
    //   onStart: () => {
    //     context.value = {
    //       y: translateY.value,
    //     };
    //   },
    //   onActive: (event) => {
    //     if (!isVisible) {
    //       return;
    //     }

    //     translateY.value = event.translationY + context.value.y;
    //     translateY.value = Math.min(
    //       translateY.value,
    //       Constants.SCREEN_HEIGHT + topOffset.current
    //     );
    //   },
    //   onEnd: (event) => {
    //     if (
    //       translateY.value <
    //         Constants.SCREEN_HEIGHT +
    //           topOffset.current -
    //           20 -
    //           topOffset.current / 3 ||
    //       event.velocityY < -500
    //     ) {
    //       hideToast();
    //     } else {
    //       translateY.value = withTiming(
    //         Constants.SCREEN_HEIGHT + topOffset.current,
    //         {
    //           easing: Easing.linear,
    //         }
    //       );
    //     }
    //   },
    // });

    const rContainerStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateY: translateY.value }],
      };
    });

    const toastShadow = useMemo(() => {
      if (!data.withShadow) {
        return;
      }

      return {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
      };
    }, [data.withShadow]);

    const iconParams = useMemo(() => {
      const _icon: {
        name: string;
        color: string;
      } = {
        name: '',
        color: '',
      };

      switch (data.type) {
        case ToastType.SUCCESS:
          _icon.name = 'checkmark-circle';
          _icon.color = Colors.SUCCESS;
          break;
        case ToastType.INFO:
          _icon.name = 'information-circle';
          _icon.color = Colors.INFO;
          break;
        case ToastType.WARNING:
          _icon.name = 'warning';
          _icon.color = Colors.WARNING;
          break;
        case ToastType.ERROR:
          _icon.name = 'alert-circle';
          _icon.color = Colors.ERROR;
          break;

        default:
          _icon.name = 'checkmark-circle';
          _icon.color = Colors.SUCCESS;
          break;
      }

      return _icon;
    }, [data.type]);

    const showToast = (toastProps: ToastProps) => {
      setIsVisible(true);
      clearTimeout(timer.current);

      setData({
        showLeftIcon: true,
        showRightIcon: true,
        withShadow: true,
        ...toastProps,
      });

      if (toastProps.visibilityTime) {
        timer.current = setTimeout(() => {
          setIsVisible(false);
          hideToast();
        }, toastProps.visibilityTime);
      }
      topOffset.current = toastProps.topOffset || 10;
      touchable.current = toastProps.touchable === false ? false : true;
      animateShow(toastProps.visibilityTime);
    };

    const hideToast = () => {
      setIsVisible(false);
      animateHide();
    };

    const _leftIconComponent = () => {
      if (leftIconComponent) {
        return leftIconComponent;
      }

      return <Icon name={iconParams.name} size={40} color={iconParams.color} />;
    };

    const _rightIconComponent = () => {
      if (rightIconComponent) {
        return rightIconComponent;
      }

      return <Icon name="close-outline" size={28} color={Colors.ICON} />;
    };

    return (
      <Animated.View style={[styles.toastContainer, rContainerStyle]}>
        <SafeAreaView>
          <TouchableWithoutFeedback
            disabled={!touchable.current}
            onPress={hideToast}
          >
            <View style={[styles.toast, toastShadow, style]}>
              {data.showLeftIcon && (
                <View style={styles.leftIconContainer}>
                  {_leftIconComponent()}
                </View>
              )}
              <View style={styles.content}>
                <Text style={[styles.title, titleStyle]}>{data.title}</Text>
                {data.description && (
                  <Text style={[styles.description, descriptionStyle]}>
                    {data.description}
                  </Text>
                )}
              </View>
              {data.showRightIcon && (
                <TouchableOpacity
                  style={styles.rightIconContainer}
                  activeOpacity={1}
                  onPress={hideToast}
                >
                  {_rightIconComponent()}
                </TouchableOpacity>
              )}
            </View>
          </TouchableWithoutFeedback>
        </SafeAreaView>
      </Animated.View>
    );
  }
);

export default ToastView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: Constants.SCREEN_WIDTH,
    alignItems: 'center',
  },
  toastContainer: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    width: Constants.SCREEN_WIDTH - Constants.SPACING * 2,
    padding: (Constants.SPACING * 3) / 4,
    borderRadius: 10,
    backgroundColor: Colors.WHITE,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  description: {
    marginTop: Constants.SPACING / 4,
    fontSize: 12,
    color: Colors.DESCRIPTION,
  },
  leftIconContainer: {
    marginRight: Constants.SPACING / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftIcon: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: Constants.SPACING / 4,
  },
  rightIconContainer: {
    marginLeft: Constants.SPACING / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightIcon: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
});
