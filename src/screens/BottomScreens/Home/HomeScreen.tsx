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
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const HomeScreen = () => {
  const [checked, setChecked] = useState("A");
  const Value = "70%";
  const visits = "6 Weeks";
  const data = [
    {
      id: 1,
      vaccine: "OPV 1",
      dueDate: "15th June 2024",
      status: "Due in 7 days",
    },
    {
      id: 2,
      vaccine: "Pentavalent 1",
      dueDate: "15th June 2024",
      status: "Due in 3 days",
    },
    {
      id: 3,
      vaccine: "PCV 1",
      dueDate: "15th June 2024",
      status: "Due in 15 days",
    },
  ];

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
            style={[
              styles.checkButtons,
              checked === "A" && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setChecked("A")}
          >
            <ThemedText
              type="text4"
              style={{ color: checked === "A" ? COLORS.white : COLORS.black }}
            >
              Mark as Taken
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={[
              styles.checkButtons,
              checked === "B" && { backgroundColor: COLORS.primary },
            ]}
            onPress={() => setChecked("B")}
          >
            <ThemedText
              type="text4"
              style={{ color: checked === "B" ? COLORS.white : COLORS.black }}
            >
              Set Reminder
            </ThemedText>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          height: SIZES.base * 1.2,
          backgroundColor: COLORS.primary + "50",
          borderBottomLeftRadius: SIZES.padding,
          borderBottomRightRadius: SIZES.padding,
          width: SCREEN_WIDTH * 0.75,
        }}
      />
      <ThemedText
        type="text2bold"
        style={{
          marginTop: SIZES.base * 1.5,
          color: COLORS.primary,
          marginRight: "auto",
          fontWeight: "bold",
        }}
      >
        Progress
      </ThemedText>
      <View style={styles.bigCard}>
        <ThemedText type="text3">{Value} Vaccines completed</ThemedText>
        <View style={[styles.progressBar]}>
          <View style={[styles.progressFill, { width: Value }]}></View>
        </View>
        <ThemedText style={{ marginTop: SIZES.padding }}>
          Upcoming Visits ({visits})
        </ThemedText>
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <ThemedText type="text4" style={{ fontWeight: "bold" }}>
                {item.vaccine}
              </ThemedText>
              <ThemedText type="text4" style={{ color: COLORS.primary }}>
                {item.status}
              </ThemedText>
            </View>
          )}
        />
      </View>
      <View
        style={[
          styles.bigCard,
          {
            borderRadius: SIZES.padding,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <ThemedText type="text3">View Full Schedule</ThemedText>
        <TouchableOpacity>
          <Ionicons name="chevron-forward" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
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
    backgroundColor: COLORS.primary + "35",
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    height: SCREEN_HEIGHT * 0.22,
  },
  progressBar: {
    width: SCREEN_WIDTH * 0.8,
    height: SIZES.base * 1.5,
    backgroundColor: COLORS.primary + "50",
    borderRadius: SIZES.padding,
    marginTop: SIZES.base,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
  },
  bigCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    marginTop: SIZES.base * 1.5,
    elevation: 2,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4,
    marginVertical: SIZES.base,
  },
});
