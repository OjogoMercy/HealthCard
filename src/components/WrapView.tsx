import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { useNavigation } from "expo-router";
import React from "react";
import { StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { COLORS, SIZES } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";
interface WrapViewProps {
  children: React.ReactNode;
  style: object;
  screenTitle?: string;
}
const WrapView = ({ children, style, screenTitle }: WrapViewProps) => {
  const navigation = useNavigation();
  return (
    <SafeAreaProvider style={[styles.container, style]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={COLORS.background}
      />

      <SafeAreaView
        style={{
          alignItems: "center",
          flex: 1,
          paddingHorizontal: SIZES.base,
        }}
      >
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
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SIZES.h4,
  },
});
