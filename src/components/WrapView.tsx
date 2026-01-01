import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";

import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/theme";

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
  container: { flex: 1, alignItems: "center", backgroundColor:COLORS.background},
 
});
