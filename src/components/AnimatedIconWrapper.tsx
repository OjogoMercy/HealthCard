import React from "react";
import { Animated,StyleSheet } from "react-native";

export const AnimatedIconWrapper = ({ focused, children, glowColor }) => {
  const animatedValue = React.useRef(
    new Animated.Value(focused ? 1 : 0)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: focused ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const backgroundStyle = {
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["transparent", glowColor],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.glowContainer, backgroundStyle]}>
      {children}
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  glowContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 55,
    height: 32,
    borderRadius: 20,
  },
});
