import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

import VirtualScroll from './VirtualScroll';

import { layout, pallets } from 'constant';

const { width, height } = Dimensions.get('window');
const { padding } = layout.spacing;

export interface Handles {
  handleClose: () => void;
  handleOpen: () => void;
}

export interface BottomSheetProps {
  children?: JSX.Element | JSX.Element[];
  title?: string;
  minHeight?: number;
  paddingHorizontal?: number;
  headerComponent?: JSX.Element | JSX.Element[];
  height?: number;
}

const bottomSheetHeight = height * 0.65;
const SPRING_CONFIG = {
  damping: 80,
  overshootClamping: true,
  restDisplacementThreshold: 0.1,
  restSpeedThreshold: 0.1,
  stiffness: 500,
};

const BottomSheet = forwardRef<Handles, BottomSheetProps>(function (
  {
    children,
    minHeight,
    paddingHorizontal = padding,
    headerComponent,
    height: ht,
  }: BottomSheetProps,
  ref,
): JSX.Element {
  useImperativeHandle(ref, () => ({
    handleClose: () => {
      handleClose();
    },
    handleOpen: () => {
      handleOpen();
    },
  }));

  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(bottomSheetHeight + 100);
  const scrollOffsetY = useSharedValue(0);
  const scrollRef = useRef(null);

  const animatedFormPickerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  const closeBackground = () => {
    setVisible(false);
  };

  const handleOpen = () => {
    translateY.value = withSpring(0, SPRING_CONFIG);
    setVisible(true);
  };

  const handleClose = () => {
    'worklet';
    translateY.value = withSpring(bottomSheetHeight + 100, SPRING_CONFIG);
    runOnJS(closeBackground)();
  };

  const gestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { startTop: number }
  >({
    onActive(event, context) {
      if (event.translationY > 0) {
        translateY.value = event.translationY + context.startTop;
      }
    },
    onEnd() {
      if (translateY.value > bottomSheetHeight / 4) {
        handleClose();
      } else {
        translateY.value = 0;
      }
    },
    onStart(_, context) {
      context.startTop = translateY.value;
    },
  });

  return (
    <Modal
      transparent
      visible={visible}
      statusBarTranslucent
      animationType="fade">
      <GestureHandlerRootView style={[styles.container, { minHeight }]}>
        <TouchableWithoutFeedback onPress={() => handleClose()}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: `${pallets.black}50`,
            }}
          />
        </TouchableWithoutFeedback>
        <PanGestureHandler
          simultaneousHandlers={scrollRef}
          onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.modal,
              animatedFormPickerStyle,
              { backgroundColor: pallets.grey, paddingHorizontal },
            ]}>
            <View style={styles.indicator} />
            {headerComponent && <View>{headerComponent}</View>}
            <View style={{ height: ht, maxHeight: bottomSheetHeight }}>
              <VirtualScroll
                onScroll={e => {
                  scrollOffsetY.value = e.nativeEvent.contentOffset.y;
                }}>
                {children}
              </VirtualScroll>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    height,
    top: 0,
    width,
  },
  icon: {
    alignItems: 'center',
    height: 30,
    justifyContent: 'center',
    width: 30,
  },
  indicator: {
    alignSelf: 'center',
    backgroundColor: pallets.darkGrey,
    borderRadius: 2,
    height: 4,
    width: 24,
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    bottom: 0,
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: padding,
    position: 'absolute',
    width,
  },
  titleBox: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BottomSheet;
