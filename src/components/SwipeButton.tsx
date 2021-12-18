import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  interpolateColor,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

const BUTTON_WIDTH = width * 0.85;
const BUTTON_HEIGHT = 56;
const BUTTON_PADDING = 7;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

const SwipeButton = (props: any) => {
  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = () => {
    setTimeout(() => {
      setToggled(false);
      X.value = 0;
    }, 1000);
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withTiming(0);
      } else {
        X.value = withTiming(H_SWIPE_RANGE);
        runOnJS(handleComplete)();
      }
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING],
          ["#FFF", "#FFF"]
        ),
        transform: [{ translateX: X.value }],
      };
    }),
    swipeText: useAnimatedStyle(() => {
      return {
        opacity: interpolate(
          X.value,
          InterpolateXInput,
          [1, 0],
          Extrapolate.CLAMP
        ),
        transform: [
          {
            translateX: interpolate(
              X.value,
              InterpolateXInput,
              [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    }),
  };

  return (
    <Animated.View style={styles.swipeCont}>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeable, AnimatedStyles.swipeable]}
        ></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, AnimatedStyles.swipeText]}>
        Swipe to confirm
      </Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    backgroundColor: "#FF00FF",
    borderRadius: BUTTON_HEIGHT / 2,
    padding: BUTTON_PADDING,
    display: "flex",

    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  colorWave: {
    position: "absolute",
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: "absolute",
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: SWIPEABLE_DIMENSIONS,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  swipeText: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    zIndex: 2,
    color: "#FFF",
  },
});

export default SwipeButton;
