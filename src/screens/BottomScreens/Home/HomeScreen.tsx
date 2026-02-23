import CustomHeader from "@/src/components/CustomHeader";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
const HomeScreen = () => {
  const [checked, setChecked] = useState(false);

  return (
    <CustomHeader
      title="Home"
      authScreen={false}
      tabScreen={true}
      screenTitle="Home"
    >
      <View style={styles.row}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image source={images.mom} style={styles.profileImage} />
        </TouchableOpacity>
        <ThemedText type="text2">
          Hey there{" "}
          <ThemedText type="text2bold" style={{ color: COLORS.accent }}>
            Sarah
          </ThemedText>
          😉
        </ThemedText>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
          Next Vaccines
        </ThemedText>
        <ThemedText type="text4"> OPV 1 + Pentavalent 1 + PCV 1 </ThemedText>
        <ThemedText type="text4">
          Due date:
          <ThemedText style={{ color: COLORS.black }} type="text4bold">
            {" "}
            15th June 2024
          </ThemedText>
        </ThemedText>
        <ThemedText type="text4">
          Status:{" "}
          <ThemedText style={{ color: COLORS.black }} type="text4bold">
            Due in 3 days
          </ThemedText>
        </ThemedText>
        <View style={styles.row}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.checkButtons}
            onPress={() => setChecked(!checked)}
          >
            <ThemedText type="text4">Mark as Taken</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.checkButtons}
            onPress={() => setChecked(!checked)}
          >
            <ThemedText type="text4">Set Reminder</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: SIZES.base *1.2,
          backgroundColor: COLORS.primary +"50",
          borderBottomLeftRadius: SIZES.padding,
          borderBottomRightRadius: SIZES.padding,
          width: SCREEN_WIDTH * 0.75,
        }}
      />
    </CustomHeader>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: SIZES.padding,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.navTitle * 1.3,
    width: SIZES.navTitle * 1.3,
  },
  profileImage: {
    height: "90%",
    width: "90%",
    borderRadius: SIZES.padding,
    resizeMode: "cover",
  },
  checkButtons: {
    height: SIZES.padding * 1.2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.padding,
  },
  card: {
    backgroundColor: COLORS.primary + "25",
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.22,
  },
});
