import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { SIZES ,COLORS} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const name = "Michael";
  const age = "6";
  const gender="male"

  
  return (
    <WrapView screenTitle="Profile">
      <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
        <Image
          source={images.baby}
          style={{
            width: SIZES.navTitle * 3,
            height: SIZES.navTitle * 3,
            borderRadius: SIZES.navTitle *2,
            borderWidth: 2,
            borderColor: COLORS.primary,
          }}
        />
      </TouchableOpacity>
      <ThemedText type="text3bold" style={{color:COLORS.primary}}>{name}</ThemedText>
      <ThemedText type="text3" >{age} months old </ThemedText>
      <ThemedText type="text3" style={{color:COLORS.primary}}>{gender}</ThemedText>
    </WrapView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profileContainer: {
      borderRadius: SIZES.navTitle,
      alignItems: "center",
      justifyContent: "center",
      padding:SIZES.base,
      

    },
});
