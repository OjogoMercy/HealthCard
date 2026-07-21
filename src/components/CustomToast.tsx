import React, { useEffect, useRef } from "react";
import { Animated, PanResponder, StyleSheet, Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "../constants/THEME";
import { ToastMessage } from "./ToastContext";

interface Props {
  toast: ToastMessage;
  index: number;
  onDismiss: () => void;
}

const VARIANT_STYLES: Record<
  ToastMessage["variant"],
  { bg: string; icon: string }
> = {
  success: { bg: COLORS.primary, icon: "✓" },
  error: { bg: "#C62828", icon: "✕" },
  warning: { bg: "#B26A00", icon: "!" },
  info: { bg: "#37474F", icon: "i" },
};

const TOAST_HEIGHT = 56;
const TOAST_SPACING = 8;

export default function CustomToast({ toast, index, onDismiss }: Props) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const variantStyle = VARIANT_STYLES[toast.variant];
  const insets = useSafeAreaInsets();
  const topOffset = insets.top + 8 + index * (TOAST_HEIGHT + TOAST_SPACING);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    dismissTimer.current = setTimeout(() => handleDismiss(), toast.duration);

    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, []);

  const handleDismiss = () => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => onDismiss());
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy < 0) translateY.setValue(gesture.dy); // only allow swipe-up
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy < -20) {
          handleDismiss();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.toast,
        {
          top: topOffset,
          // borderColor: variantStyle.bg,
          opacity,
          transform: [{ translateY }],
        },
      ]}
    >
      <Text style={[styles.icon, { color: variantStyle.bg }]}>
        {variantStyle.icon}
      </Text>
      <Text style={[styles.message,{color:variantStyle.bg}]} numberOfLines={2}>
        {toast.message}
      </Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    minHeight: TOAST_HEIGHT,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor:'white'
  },
  icon: {
    fontWeight: "700",
    fontSize: 14,
    width: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 14,
    flex: 1,
  },
});
