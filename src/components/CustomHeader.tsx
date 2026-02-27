import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";
interface CustomHeaderProps {
  children: React.ReactNode;
  title: string;
  authScreen: boolean;
  tabScreen: boolean;
  screenTitle: string;
}

const CustomHeader = ({
  children,
  title,
  authScreen,
  tabScreen,
  screenTitle,
}: CustomHeaderProps) => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.background,
        paddingTop: SIZES.base,
        alignItems:'center'
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View
        style={{
          flex: 1,
          width: SCREEN_WIDTH,
          padding: SIZES.padding * 1.2,
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  arrow: {
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
