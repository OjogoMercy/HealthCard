import * as Haptics from "expo-haptics";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";

interface PrimaryButtonProps {
  onPress: () => void;
  title: string;
  style?: object;
  textStyle?: object;
  type?: "impact" | "success" | "error" | "light";
}

export default function PrimaryButton({
  onPress,
  title,
  style,
  textStyle,
  type = "light",
}: PrimaryButtonProps) {
  const handlePress = () => {
    if (type === "impact") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } else if (type === "success") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else if (type === "error") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } else if (type === "light") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    if (onPress) onPress();
  };
  return (
    <View>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
        style={[styles.button, style]}
      >
        <ThemedText type="text3white" style={[textStyle]}>
          {title}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    padding: SIZES.base * 1.7,
    alignItems: "center",
    marginVertical: SIZES.base * 2,
    elevation: 3,
  },
});
