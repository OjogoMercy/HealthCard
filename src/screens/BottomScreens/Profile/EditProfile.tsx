import { createChild } from "@/BackendComm/APIClient";
import CustomInput from "@/src/components/CustomInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const getAgeLabel = (dateOfBirth: string): string => {
  const birth = new Date(dateOfBirth);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weeks = Math.floor(diffInDays / 7);
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  const years = now.getFullYear() - birth.getFullYear();

  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} old`;
  if (months < 24) return `${months} month${months === 1 ? "" : "s"} old`;
  return `${years} year${years === 1 ? "" : "s"} old`;
};

const formatDate = (d: Date): string => d.toLocaleDateString("en-GB");

const EditProfile = () => {
  const navigation = useNavigation<any>();

  // ── Store ──
  const activeChild = useBabyStore((s) => s.getActiveChild);
  const baby = activeChild();

  const [babyName, setBabyName] = useState(baby?.name ?? "");
  const [date, setDate] = useState(
    baby?.dateOfBirth ? new Date(baby.dateOfBirth) : new Date(),
  );
  const [gender, setGender] = useState(baby?.gender ?? "");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(!!baby?.dateOfBirth);
  const [error, setError] = useState("");

  const [doctor, setDoctor] = useState("Dr Adewale Johnson");
  const [hospital, setHospital] = useState("Lagos State Hospital");

  const onChange = (event: { type: string }, selectedDate?: Date) => {
    setPickerOpen(Platform.OS === "ios");
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setIsDateSelected(true);
    } else {
      setPickerOpen(false);
    }
  };
  const children = useBabyStore((s) => s.children);

  const handleSave = async () => {
    if (!babyName.trim()) {
      Alert.alert("Missing Information", "Please enter your baby's name.");
      return;
    }
    if (!isDateSelected) {
      Alert.alert(
        "Missing Information",
        "Please select your baby's date of birth.",
      );
      return;
    }
    if (!gender) {
      Alert.alert("Missing Information", "Please select your baby's gender.");
      return;
    }
    const isDuplicate = children.some(
      (child) =>
        child.name.toLowerCase().trim() === babyName.toLowerCase().trim() &&
        new Date(child.dateOfBirth).toDateString() === date.toDateString(),
    );

    if (isDuplicate) {
      setError("A child with this name and date of birth already exists");
      return;
    }

    await createChild(gender, date, babyName.trim());

    Alert.alert(
      "Profile Saved",
      `${babyName.trim()}'s profile has been updated!`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <WrapScrollView screenTitle="Edit Child Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image source={images.baby} style={styles.profileImage} />
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
          {baby?.name ?? "New Baby"}
        </ThemedText>
        <ThemedText type="text4">
          {baby?.dateOfBirth ? getAgeLabel(baby.dateOfBirth) : "Age not set"}
        </ThemedText>
      </View>

      <View style={general.form}>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          Basic Information
        </ThemedText>

        <ThemedText type="text4bold" style={styles.label}>
          Name
        </ThemedText>
        <CustomInput
          value={babyName}
          onChangeText={setBabyName}
          placeholder="Child's Name"
          editable={true}
        />

        <ThemedText type="text4bold" style={styles.label}>
          Date Of Birth
        </ThemedText>
        <TouchableOpacity
          onPress={() => setPickerOpen(true)}
          style={styles.date}
        >
          <Ionicons name="calendar-outline" size={18} color={COLORS.gray} />
          <ThemedText
            type="text4"
            style={{ color: COLORS.gray, marginLeft: SIZES.base }}
          >
            {isDateSelected ? formatDate(date) : "Child's D.O.B"}
          </ThemedText>
        </TouchableOpacity>

        {pickerOpen && (
          <View style={styles.pickerContainer}>
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

        <ThemedText type="text4bold" style={styles.label}>
          Gender
        </ThemedText>
        <View style={styles.genderRow}>
          {["Male", "Female"].map((option) => (
            <TouchableOpacity
              key={option}
              activeOpacity={0.7}
              style={[
                styles.genderButton,
                gender === option && styles.genderButtonActive,
              ]}
              onPress={() => setGender(option)}
            >
              <Ionicons
                name={option === "Male" ? "male" : "female"}
                size={18}
                color={gender === option ? COLORS.white : COLORS.primary}
              />
              <ThemedText
                type="text4bold"
                style={{
                  marginLeft: SIZES.base * 0.5,
                  color: gender === option ? COLORS.white : COLORS.primary,
                }}
              >
                {option}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.buttonRow}>
          <PrimaryButton title="Save Changes" onPress={handleSave} />
          <PrimaryButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: SIZES.padding * 2 }}
          />
        </View>
      </View>

      <View style={general.form}>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          Healthcare Provider
        </ThemedText>
        <ThemedText type="text4gray" style={{ marginBottom: SIZES.base }}>
          This information helps personalise your experience
        </ThemedText>

        <ThemedText type="text4bold" style={styles.label}>
          Primary Hospital
        </ThemedText>
        <CustomInput
          value={hospital}
          onChangeText={setHospital}
          placeholder="Child's Hospital"
          editable={false}
        />

        <ThemedText type="text4bold" style={styles.label}>
          Paediatrician / Doctor
        </ThemedText>
        <CustomInput
          value={doctor}
          onChangeText={setDoctor}
          placeholder="Child's Doctor"
          editable={false}
        />

        <PrimaryButton title="Save Changes" onPress={() => {}} />
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
  profileImage: {
    width: SCREEN_WIDTH * 0.25,
    height: SCREEN_WIDTH * 0.25,
    borderRadius: SIZES.navTitle * 2,
  },
  label: {
    marginLeft: SIZES.base / 2,
    marginTop: SIZES.base,
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
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: SIZES.padding,
    marginBottom: SIZES.base,
    overflow: "hidden",
  },
  genderRow: {
    flexDirection: "row",
    gap: SIZES.base,
    marginVertical: SIZES.base,
  },
  genderButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.base,
    borderRadius: SIZES.padding,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    backgroundColor: "transparent",
  },
  genderButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: SIZES.base,
  },
});
