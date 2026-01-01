import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";

interface WrapScrollViewProps {
  children: React.ReactNode;
  title?: string;
  authScreen?: boolean;
}

const WrapScrollView = ({ children, title }: WrapScrollViewProps) => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.contentWrapper}>{children}</View>
    </ScrollView>
  );
};

export default WrapScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "white",
  },
  contentContainer: {
    alignItems: "center",
    paddingBottom: SIZES.padding * 2,
  },
  headerContainer: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentWrapper: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    paddingTop: SIZES.padding * 2,
  },
});
