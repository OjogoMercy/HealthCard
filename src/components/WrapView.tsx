import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/THEME";

interface WrapViewProps {
  children: React.ReactNode;
  style: object;
}
const WrapView = ({ children, style }: WrapViewProps) => {
  return (
    <SafeAreaProvider style={[styles.container, style]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={COLORS.background}
      />

      <View style={{ alignItems: "center", flex: 1, justifyContent: "center" }}>
        {children}
      </View>
    </SafeAreaProvider>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.background,
    paddingVertical: SIZES.navTitle,
  },
});
