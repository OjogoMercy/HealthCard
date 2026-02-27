import WrapView from "@/src/components/WrapView";
import { VaccineData } from "@/src/constants/Database";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Immunisation = () => {
  const age = "6";
  const Data = [
    {
      title: "Birth",
      status: "Completed",
      data: [
        { id: "1", name: "BCG", isDone: true },
        { id: "2", name: "OPV 0", isDone: true },
      ],
    },
    {
      title: "6 Weeks",
      status: "Completed",
      data: [
        { id: "3", name: "OPV 1", isDone: true },
        { id: "4", name: "Pentavalent 1", isDone: true },
      ],
    },
    {
      title: "10 Weeks",
      status: "Upcoming",
      data: [
        { id: "5", name: "OPV 2", isDone: false },
        { id: "6", name: "Pentavalent 2", isDone: false },
      ],
    },
    {
      title: "9 Months",
      status: "Pending",
      data: [
        { id: "7", name: "Measles", isDone: false },
        { id: "8", name: "Yellow Fever", isDone: false },
      ],
    },
  ];
  return (
    <WrapView  title={""} authScreen={false}  >
      <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
        Vaccination Timeline
      </ThemedText>
      <View style={[styles.row, { marginVertical: SIZES.base / 2 }]}>
        <View style={styles.profileContainer}>
          <Image source={images.baby} style={styles.profileImage} />
        </View>
        <ThemedText
          type="text3bold"
          style={{ color: COLORS.primary, marginRight: "auto" }}
        >
          {" "}
          Michael <ThemedText type="text4">| {age} months old</ThemedText>
        </ThemedText>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons
            name="chevron-down-circle-outline"
            size={SIZES.navTitle}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <ThemedText type="text4bold" style={{ color: COLORS.primary ,marginTop:SIZES.base}}>
        Reccomended Nigerian Immunisation Schedule
      </ThemedText>
      <SectionList
        sections={VaccineData}
        keyExtractor={(item, index) => item.id + index}
        showsVerticalScrollIndicator={false}
        stickySectionHeadersEnabled={false}
        contentContainerStyle={{ marginVertical: SIZES.padding }}
        style={{
          width: SCREEN_WIDTH * 0.9,
          alignSelf: "center",
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <View style={styles.tag}>
              <ThemedText> {title}</ThemedText>
            </View>
          );
        }}
        renderItem={({ item, index, section }) => {
          const lastItem = index === section.data.length - 1;
          return (
            <View style={[styles.list, lastItem && styles.lastItem]}>
              <View
                style={[
                  styles.bigCard,
                  lastItem && {
                    borderBottomLeftRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                  },
                ]}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <ThemedText type="text4bold">{item.name}</ThemedText>
                  <TouchableOpacity>
                    <Ionicons
                      name="chevron-down"
                      size={SIZES.padding}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        }}
      />
    </WrapView>
  );
};

export default Immunisation;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    elevation: 4,
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.navTitle * 1.4,
    width: SIZES.navTitle * 1.4,
  },
  profileImage: {
    height: "90%",
    width: "90%",
    borderRadius: SIZES.padding,
    resizeMode: "cover",
  },
  bigCard: {
    width: "100%",
    backgroundColor: "white",
    padding: SIZES.padding / 1.5,
  },
  tag: {
    backgroundColor: COLORS.secondary + "80",
    height: SIZES.padding * 1.5,
    width: "100%",
    borderTopRightRadius: SIZES.padding,
    borderTopLeftRadius: SIZES.padding,
    justifyContent: "center",
    paddingHorizontal: SIZES.base,
  },
  list: {
    width: SCREEN_WIDTH * 0.9,
    alignSelf: "center",
  },
  lastItem: {
    borderBottomLeftRadius: SIZES.padding,
    borderBottomRightRadius: SIZES.padding,
    marginBottom: SIZES.padding,
    backgroundColor: COLORS.white,
  },
});
