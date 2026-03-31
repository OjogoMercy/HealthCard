import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";

interface WrapScrollViewProps {
  children: React.ReactNode;
  style: object;
  screenTitle?: string;
}

const WrapScrollView = ({ children, screenTitle }: WrapScrollViewProps) => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <View style={styles.contentWrapper}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: SCREEN_WIDTH * 0.95,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={22} color={"black"} />
          </TouchableOpacity>
          <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
            {screenTitle}
          </ThemedText>
          <TouchableOpacity onPress={undefined}>
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={COLORS.background}
            />
          </TouchableOpacity>
        </View>
        {children}
      </View>
    </ScrollView>
  );
};

export default WrapScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SIZES.h4,
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
    paddingHorizontal: SIZES.h3,
  },
});
