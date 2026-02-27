import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../constants/THEME";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

interface WrapViewProps {
  children: React.ReactNode;

}
const WrapView = ({  children,  }: WrapViewProps) => {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={COLORS.background}
      />

      <View style={{ alignItems: "center" }}>{children}</View>
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
