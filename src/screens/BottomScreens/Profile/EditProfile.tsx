import CustomInput from "@/src/components/CustomInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { COLORS, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const EditProfile = () => {
  const [babyName, setBabyName] = useState("");
  const [date, setDate] = useState("");
  const [gender, setGender] = useState("Male");
  const [doctor, setDoctor] = useState("Dr Adewale Johnson");
  const [hospital, setHospital] = useState("Lagos State Hospital");
  const Baby = {
    name: "Michael",
    age: "6",
    Value: "64%",
  };

  return (
    <WrapScrollView screenTitle="Edit Child Profile">
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
      <View style={general.form}>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          Basic Information
        </ThemedText>
        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Name
        </ThemedText>
        <CustomInput
          value={babyName}
          onChangeText={setBabyName}
          placeholder="Child's Name"
        />
        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Date Of Birth
        </ThemedText>
        <CustomInput
          value={date}
          onChangeText={setDate}
          placeholder="Child's D.O.B"
        />
        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Gender
        </ThemedText>
        <CustomInput
          value={gender}
          onChangeText={setGender}
          placeholder="Baby's Name"
        />
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <PrimaryButton title="Save Changes" onPress={undefined} />
          <PrimaryButton
            title="Cancel"
            onPress={undefined}
            style={{ paddingHorizontal: SIZES.padding * 2 }}
          />
        </View>
      </View>
      <View style={general.form}>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          HealthCare Provider
        </ThemedText>
        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Primary Hospital
        </ThemedText>
        <CustomInput
          value={hospital}
          onChangeText={setHospital}
          placeholder="Child's Hospital"
        />
        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Pediatrician / Doctor
        </ThemedText>
        <CustomInput
          value={doctor}
          onChangeText={setDoctor}
          placeholder="Child's Doctor"
        />
        <PrimaryButton title="Save Changes" />
      </View>
    </WrapScrollView>
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
    padding: SIZES.base / 4,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
});
