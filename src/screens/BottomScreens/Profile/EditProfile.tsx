import CustomInput from "@/src/components/CustomInput";
import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { COLORS, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { User } from "lucide-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";


const EditProfile = () => {
  const [babyName,setBabyName] = useState('')
  const Baby = {
    name: "Michael",
    age: "6",
    Value: "64%",
  };

  return (
    <WrapView screenTitle="Edit Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image
            source={images.baby}
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
          style={{ marginTop: SIZES.base, color: COLORS.primary }}
        >
          {Baby.name}
        </ThemedText>
        <ThemedText type="text4">{Baby.age} Months Old</ThemedText>
      </View>
      <View style={styles.form}>
        <CustomInput value={babyName} onChangeText={setBabyName}/>
      </View>
    </WrapView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.base,
    elevation: 1,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle * 2,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base /4,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  form:{
    width:SCREEN_WIDTH*0.9,
    backgroundColor:COLORS.primary +"20",
    borderRadius:SIZES.padding,
    marginVertical:SIZES.padding,
    padding:SIZES.base,
  }
});
