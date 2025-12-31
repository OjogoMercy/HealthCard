import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";

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
        backgroundColor={"transparent"}
      />

      <View style={{}}>{children}</View>
    </View>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  profile: {
    height: SIZES.navTitle,
    width: SIZES.navTitle,
    borderRadius: SIZES.h1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
  },
  container: { flex: 1, alignItems: "center", backgroundColor: "white" },
  header: {
    flexDirection: "row",
    paddingHorizontal: SIZES.h3,
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 1,
    alignItems: "center",
  },
});
