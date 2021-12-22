import React, { forwardRef } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";

interface IProps {
  style?: {};
  content: {};
}

interface ILayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Modal = forwardRef((props: IProps, ref) => {
  // Storing current screen height
  const { height } = Dimensions.get("window");
  // Shared value to manipulate shadow opacity property
  const shadowOpacity = useSharedValue(0);
  // Shared value to manipulate shadow ZIndex property
  const shadowZIndex = useSharedValue(-1);
  // Shared value to manipulate bottom position of the banner
  const bottom = useSharedValue(-height);

  // Custom animated styles for shadow and modal components
  const AnimatedStyles = {
    modal: useAnimatedStyle(() => {
      return {
        bottom: bottom.value,
      };
    }),
    shadow: useAnimatedStyle(() => {
      return {
        zIndex: shadowZIndex.value,
        opacity: shadowOpacity.value,
      };
    }),
  };

  // Function to handle shadow and modal style properties when open action is
  // triggered
  const openModal = () => {
    shadowZIndex.value = 2;
    shadowOpacity.value = withTiming(0.5);
    bottom.value = withSpring(-30, {
      damping: 15,
    });
  };

  // Function to handle shadow and modal style properties when close action is
  // triggered
  const closeModal = () => {
    bottom.value = withTiming(-height);
    shadowOpacity.value = withTiming(0, {
      duration: 200,
    });
    shadowZIndex.value = withTiming(-1, {
      duration: 200,
    });
  };

  // Gesture Handler Event that will close the banner when toucing outside the
  // main content (or the back shadow)
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startX: number }) => {
      runOnJS(closeModal)();
    },
  });

  // Passing handle action function to parent
  React.useImperativeHandle(ref, () => ({ openModal, closeModal }));

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.shadow, AnimatedStyles.shadow]} />
      </PanGestureHandler>
      <Animated.View style={[styles.modal, AnimatedStyles.modal]}>
        {props.content}
      </Animated.View>
    </>
  );
});

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: "#000",
  },
  modal: {
    zIndex: 3,
    width: "100%",
    paddingBottom: 30,
    position: "absolute",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});

export default Modal;
