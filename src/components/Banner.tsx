import React, { useCallback, useEffect, useState } from "react";
import { Platform, StyleSheet, Dimensions, StatusBar } from "react-native";
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

const Banner = React.forwardRef((props: IProps, ref) => {
  // Custom hook to get banner main container sizes
  // Width and height of the container
  // X and Y position of the container in the screen
  // Return function to get the sizes when component
  // is rendered and a reference to it's values.
  const useBannerLayout = (): [ILayout, any] => {
    const [size, setSize] = useState<ILayout>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    });

    const onLayout = useCallback((event) => {
      const { x, y, width, height } = event.nativeEvent.layout;
      setSize({ x, y, width, height });
    }, []);

    return [size, onLayout];
  };

  // Helper to storage banner content height
  let contentHeight = 0;
  // Storing current screen height
  const { height } = Dimensions.get("window");
  // Helper to storage status bar height
  const statusBarHeight =
    Platform.OS === "ios" ? 20 : StatusBar.currentHeight || 0;
  // Helper to storage X position that the banner will be shown in the screen
  let bannerHeight = height / 2 - statusBarHeight;

  // Shared value to manipulate shadow opacity property
  const shadowOpacity = useSharedValue(0);
  // Shared value to manipulate shadow ZIndex property
  const shadowZIndex = useSharedValue(-1);
  // Shared value to manipulate bottom position of the banner
  const bottom = useSharedValue(-bannerHeight);
  // value and function of the banner layout custom hook
  const [bannerLayout, onBannerLayout] = useBannerLayout();

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
  const openBanner = () => {
    shadowZIndex.value = 2;
    shadowOpacity.value = withTiming(0.5);
    bottom.value = withSpring(bannerHeight, {
      damping: 15,
    });
  };

  // Function to handle shadow and modal style properties when close action is
  // triggered
  const closeBanner = () => {
    bottom.value = withTiming(-bannerHeight);
    shadowOpacity.value = withTiming(0, {
      duration: 200,
    });
    shadowZIndex.value = withTiming(-1, {
      duration: 200,
    });
  };

  function showMessage(message: String) {
    console.log(message);
  }

  // Hook to calculate banner main content height and banner bottom position of
  // the banner
  useEffect(() => {
    contentHeight = bannerLayout.height;
    bannerHeight = height / 2 - statusBarHeight - contentHeight / 2;
  }, [bannerLayout]);

  // Gesture Handler Event that will close the banner when toucing outside the
  // main content (or the back shadow)
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: { startX: number }) => {
      runOnJS(closeBanner)();
    },
  });

  // Passing handle action function to parent
  React.useImperativeHandle(ref, () => ({ openBanner, closeBanner }));

  return (
    <>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.shadow, AnimatedStyles.shadow]} />
      </PanGestureHandler>
      <Animated.View
        style={[styles.modal, AnimatedStyles.modal]}
        onLayout={onBannerLayout}
      >
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
    position: "absolute",
  },
});

export default Banner;
