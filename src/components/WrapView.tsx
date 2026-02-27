import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SIZES } from "../constants/THEME";

import { useNavigation } from "@react-navigation/native";

interface WrapViewProps {
  children: React.ReactNode;
  title: string;
  authScreen: boolean;
  headerStyle?: object;
}
const WrapView = ({ title, children, headerStyle }: WrapViewProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={COLORS.background}
      />

      <View style={{ alignItems: "center" }}>{children}</View>
    </View>
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
