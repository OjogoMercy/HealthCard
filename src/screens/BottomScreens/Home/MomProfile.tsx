import WrapView from "@/src/components/WrapView";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const MomProfile = () => {
  const User = {
    name: "Sarah Williams",
    email: "email.com",
    Phone:"070845346257"
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
            size={25}
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
        <ThemedText type="text4" >{User.email}</ThemedText>
        <ThemedText type="text4" >{User.Phone}</ThemedText>
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
});
