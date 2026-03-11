import CustomInput from "@/src/components/CustomInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { COLORS, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const EditProfile = () => {
  const [babyName, setBabyName] = useState("");
  const [date, setDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [doctor, setDoctor] = useState("Dr Adewale Johnson");
  const [hospital, setHospital] = useState("Lagos State Hospital");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isDateSelected, setIsDateSeleted] = useState(false);

  const Baby = {
    name: "Michael",
    age: "6",
    Value: "64%",
  };
  const onChange = (
    event: { type: string },
    selectedDate: React.SetStateAction<Date>,
  ) => {
    const currentDate = selectedDate || date;
    setPickerOpen(Platform.OS === "ios");
    setDate(currentDate);

    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setIsDateSeleted(true);
    } else {
      setPickerOpen(false);
    }
  };
  const formatDate = (datetoFormat: {
    toLocaleDateString: (arg0: string) => any;
  }) => {
    return datetoFormat.toLocaleDateString("en-GB");
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
        <TouchableOpacity
          onPress={() => setPickerOpen(true)}
          style={styles.date}
        >
          <ThemedText
            type="text4"
            style={{ color: COLORS.gray, marginLeft: SIZES.h6 }}
          >
            {isDateSelected ? formatDate(date) : "Child's D.O.B"}
          </ThemedText>
          {pickerOpen && (
            <View style={{ backgroundColor: "white", borderRadius: 10 }}>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={onChange}
                maximumDate={new Date()}
                themeVariant="light"
              />
            </View>
          )}
        </TouchableOpacity>

        <ThemedText type="text4bold" style={{ marginLeft: SIZES.base / 2 }}>
          Gender
        </ThemedText>
        <CustomInput
          value={gender}
          onChangeText={setGender}
          placeholder="Baby's Gender"
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
  date: {
    width: SCREEN_WIDTH * 0.85,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: SIZES.padding / 1.5,
    marginVertical: SIZES.base,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.padding / 1.7,
  },
});
