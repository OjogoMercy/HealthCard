import WrapView from "@/src/components/WrapView";
import { general } from "@/src/constants/General";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MomProfile = () => {
  const User = {
    name: "Sarah Williams",
    email: "email.com",
    Phone: "070845346257",
  };
  const Baby = {
    name: "Michael",
    age: "6",
    Value: "64%",
  };
  return (
    <WrapView screenTitle="Mom Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.mom}
            style={{
              width: SCREEN_WIDTH * 0.25,
              height: SCREEN_WIDTH * 0.25,
              borderRadius: SIZES.navTitle * 2,
            }}
          />
          <Ionicons
            name="camera"
            size={22}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          />
        </TouchableOpacity>
        <ThemedText
          type="text3bold"
          style={{ marginVertical: SIZES.base, color: COLORS.primary }}
        >
          {User.name}
        </ThemedText>
        <ThemedText type="text4">{User.email}</ThemedText>
        <ThemedText type="text4">{User.Phone}</ThemedText>
      </View>
      <View style={styles.nextContainer}>
        <View style={{ flexDirection: "row" }}>
          <Ionicons name="calendar" size={20} color={COLORS.accent} />
          <ThemedText type="text3bold" style={{ marginLeft: SIZES.base }}>
            Children
          </ThemedText>
        </View>

        <View
          style={[
            general.row,
            {
              marginVertical: SIZES.base,
              elevation: 0,
              backgroundColor: "white",
            },
          ]}
        >
          <View style={general.profileContainer}>
            <Image source={images.baby} style={general.profileImage} />
          </View>
          <ThemedText
            type="text3bold"
            style={{ color: COLORS.primary, marginRight: "auto" }}
          >
            {" "}
            Michael{" "}
            <ThemedText type="text4">| {Baby.age} months old</ThemedText>
          </ThemedText>
        </View>
      </View>
    </WrapView>
  );
};

export default MomProfile;

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.padding,
    elevation: 1,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle * 2,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base / 4,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  card: {
    backgroundColor: COLORS.secondary + "20",
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginTop: SIZES.padding,
    width: "90%",
  },
  nextContainer: {
    backgroundColor: COLORS.accent + "30",
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.base,
    alignItems: "flex-start",
    paddingHorizontal: SIZES.base * 1.5,
    height: SCREEN_HEIGHT * 0.12,
  },
 
});
