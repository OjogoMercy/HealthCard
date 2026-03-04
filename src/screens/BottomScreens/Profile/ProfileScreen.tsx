import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const name = "Michael";
  const age = "6";
  const Value = "70%";

  const Data = [
    {
      id: 1,
      iconName: "person",
      title: "Personal Information",
    },
    {
      id: 2,
      iconName: "calendar",
      title: "Calendar",
    },
    {
      id: 3,
      iconName: "settings",
      title: "Settings",
    },
  ];

  return (
    <WrapView screenTitle="Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.baby}
            style={{
              width: SIZES.navTitle * 2,
              height: SIZES.navTitle * 2,
              borderRadius: SIZES.navTitle * 2,
              borderWidth: 2,
              borderColor: COLORS.primary,
            }}
          />
        </TouchableOpacity>
        <View>
          <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
            {name}
          </ThemedText>
          <ThemedText type="text4">{age} months old </ThemedText>
        </View>
        <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
          <ThemedText type="text4white" style={{ color: COLORS.white }}>
            Edit Profile{" "}
          </ThemedText>
          <Ionicons name="pencil" size={15} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <LinearGradient
        colors={[COLORS.primary, COLORS.primary + "80"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.progress}
      >
        <ThemedText type="text3boldwhite">Vaccination Progress</ThemedText>
        <View style={[styles.progressBar]}>
          <View style={[styles.progressFill, { width: Value }]}></View>
        </View>
        <ThemedText type="text4white">Completion : {Value}</ThemedText>
        <ThemedText type="text4white">13 of 20 vaccines completed </ThemedText>
      </LinearGradient>

      <View style={styles.card}>
        <FlatList
          data={Data}
          renderItem={({ item }) => {
            return (
              <View style={styles.listItem}>
                <TouchableOpacity>
                  <Ionicons
                    name={item.iconName}
                    size={24}
                    color={COLORS.primary}
                  />
                </TouchableOpacity>
                <ThemedText type="text4" style={{ marginLeft: SIZES.base }}>
                  {item.title}
                </ThemedText>
                <TouchableOpacity style={{ marginLeft: "auto" }}>
                  <Ionicons
                    name="chevron-forward"
                    size={22}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
    </WrapView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: SIZES.navTitle,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.base,
  },
  card: {
    backgroundColor: COLORS.secondary + "20",
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding,
    width: "90%",
  },
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.padding,
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
    marginLeft: "auto",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.padding,
    justifyContent: "center",
    elevation: 3,
  },
  progress: {
    padding: SIZES.base * 2,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base,
    height: SCREEN_HEIGHT * 0.155,
  },
  progressBar: {
    width: SCREEN_WIDTH * 0.8,
    height: SIZES.base * 1.5,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.padding / 2,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
});
