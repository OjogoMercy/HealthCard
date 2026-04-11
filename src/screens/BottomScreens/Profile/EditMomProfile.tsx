import CustomInput from "@/src/components/CustomInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useMomStore } from "@/src/store/useMomStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, Image, StyleSheet, TouchableOpacity, View } from "react-native";

const EditMomProfile = () => {
  const navigation = useNavigation<any>();
  // mom store
  const mom = useMomStore((s) => s.mom);
  const updateMom = useMomStore((s) => s.updateMom);
  const setMom = useMomStore((s) => s.setMom);

  const [fullName, setFullName] = useState(mom?.fullName ?? "");
  const [email, setEmail] = useState(mom?.email ?? "");
  const [phone, setPhone] = useState(mom?.phone ?? "");

  //   validation logic
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPhone = (value: string) =>
    /^[0-9]{10,14}$/.test(value.replace(/\s/g, ""));

  const handleSave = () => {
    if (!fullName.trim()) {
      Alert.alert("Missing Information", "Please enter your full name.");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    if (!isValidPhone(phone)) {
      Alert.alert(
        "Invalid Phone Number",
        "Please enter a valid Nigerian phone number.",
      );
      return;
    }

    // If mom profile already exists update it, otherwise create it fresh
    if (mom) {
      updateMom({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
    } else {
      setMom({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
    }

    Alert.alert(
      "Profile Updated",
      `Your profile has been saved successfully!`,
      [{ text: "OK", onPress: () => navigation.goBack() }],
    );
  };

  return (
    <WrapScrollView
      screenTitle="Edit Profile"
      children={undefined}
      style={undefined}
    >
      <View style={styles.photoCard}>
        <TouchableOpacity style={styles.photoContainer} activeOpacity={0.7}>
          <Image
            source={mom?.photoUri ? { uri: mom.photoUri } : images.mom}
            style={styles.photo}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <ThemedText
          type="text3bold"
          style={{ color: COLORS.primary, marginTop: SIZES.base }}
        >
          {mom?.fullName ?? "Your Name"}
        </ThemedText>
        <ThemedText type="text4gray">Tap photo to update</ThemedText>
      </View>

      <View style={general.form}>
        <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
          Personal Information
        </ThemedText>

        <ThemedText type="text4bold" style={styles.label}>
          Full Name
        </ThemedText>
        <CustomInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Your Full Name"
        //   editable={false}
        />

        <ThemedText type="text4bold" style={styles.label}>
          Email Address
        </ThemedText>
        <CustomInput
          value={email}
          onChangeText={setEmail}
          placeholder="Your Email Address"
          keyboardType="email-address"
        />

        <ThemedText type="text4bold" style={styles.label}>
          Phone Number
        </ThemedText>
        <CustomInput
          value={phone}
          onChangeText={setPhone}
          placeholder="e.g. 08012345678"
          keyboardType="phone-pad"
        //   editable={false}
        />

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
          Account Info
        </ThemedText>
        <ThemedText
          type="text4gray"
          style={{ marginBottom: SIZES.base, lineHeight: 20 }}
        >
          These details are linked to your account and cannot be changed here.
          Contact support if you need to update them.
        </ThemedText>

        <View style={styles.readOnlyRow}>
          <Ionicons name="mail-outline" size={18} color={COLORS.primary} />
          <ThemedText type="text4" style={styles.readOnlyText}>
            {mom?.email ?? "Not set"}
          </ThemedText>
          <View style={styles.lockedBadge}>
            <Ionicons name="lock-closed" size={12} color={COLORS.gray} />
          </View>
        </View>

        <View style={styles.readOnlyRow}>
          <Ionicons name="call-outline" size={18} color={COLORS.primary} />
          <ThemedText type="text4" style={styles.readOnlyText}>
            {mom?.phone ?? "Not set"}
          </ThemedText>
          <View style={styles.lockedBadge}>
            <Ionicons name="lock-closed" size={12} color={COLORS.gray} />
          </View>
        </View>
      </View>
    </WrapScrollView>
  );
};

export default EditMomProfile;
const styles = StyleSheet.create({
  photoCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    paddingVertical: SIZES.padding,
    marginVertical: SIZES.base,
    elevation: 1,
  },
  photoContainer: {
    position: "relative",
  },
  photo: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderRadius: SCREEN_WIDTH * 0.14,
    borderWidth: 2.5,
    borderColor: COLORS.primary,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 4,
  },
  label: {
    marginLeft: SIZES.base / 2,
    marginTop: SIZES.base,
  },
  buttonRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: SIZES.base,
  },
  readOnlyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary + "08",
    borderRadius: SIZES.padding,
    padding: SIZES.base,
    marginTop: SIZES.base,
  },
  readOnlyText: {
    flex: 1,
    marginLeft: SIZES.base,
    color: COLORS.gray,
  },
  lockedBadge: {
    backgroundColor: COLORS.primary + "15",
    borderRadius: SIZES.base,
    padding: 4,
  },
});
