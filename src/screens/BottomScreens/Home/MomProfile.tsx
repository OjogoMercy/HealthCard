import { createChild, logoutUser } from "@/BackendComm/APIClient";
import CustomInput from "@/src/components/CustomInput";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import { useMomStore } from "@/src/store/useMomStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
const getAgeLabel = (dob: string): string => {
  const birth = new Date(dob);
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

const MomProfile = () => {
  const navigation = useNavigation<any>();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [comingSoonMessage, setComingSoonMessage] = useState("");
  const [formActive, setFormActive] = useState(false);

  const mom = useMomStore((s) => s.mom);
  const clearMom = useMomStore((s) => s.clearMom);
  const clearBaby = useBabyStore((s) => s.clearChildren);

  const triggerComingSoon = (message: string) => {
    setComingSoonMessage(message);
    setShowComingSoon(true);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out? Your data will be saved.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Log Out",
          style: "destructive",
          onPress: () => {
            clearMom();
            clearBaby();
            logoutUser();
          },
        },
      ],
    );
  };

  const settingsData = [
    {
      id: 1,
      iconName: "person-outline",
      title: "Edit Profile",
      onPress: () => navigation.navigate("EditMomProfile"),
    },
    {
      id: 2,
      iconName: "shield-checkmark-outline",
      title: "Security",
      onPress: () =>
        triggerComingSoon(
          "Security settings like password change and two-factor authentication are coming soon.",
        ),
    },
    {
      id: 3,
      iconName: "settings-outline",
      title: "Settings",
      onPress: () =>
        triggerComingSoon(
          "App settings including language and notification preferences are on the way.",
        ),
    },
    {
      id: 4,
      iconName: "help-circle-outline",
      title: "Help",
      onPress: () =>
        triggerComingSoon(
          "Our help centre and support chat are coming soon. Hang tight!",
        ),
    },
    {
      id: 5,
      iconName: "log-out-outline",
      title: "Logout",
      onPress: handleLogout,
      danger: true,
    },
  ];
  const activeChild = useBabyStore((s) => s.getActiveChild);
  const baby = activeChild();

  const [babyName, setBabyName] = useState(baby?.name ?? "");
  const [date, setDate] = useState(
    baby?.dateOfBirth ? new Date(baby.dateOfBirth) : new Date(),
  );
  const [gender, setGender] = useState(baby?.gender ?? null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [isDateSelected, setIsDateSelected] = useState(!!baby?.dateOfBirth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formatDate = (d: Date): string => d.toLocaleDateString("en-GB");

  const onChange = (event: { type: string }, selectedDate?: Date) => {
    setPickerOpen(Platform.OS === "ios");
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
      setIsDateSelected(true);
    } else {
      setPickerOpen(false);
    }
  };
  const setChildren = useBabyStore((s) => s.setChildren);
  const children = useBabyStore((s) => s.children);

  const handleSave = async () => {
    if (!babyName.trim() || !date || !gender) {
      Alert.alert("Please enter the child's full details");
      return;
    }
    setIsSubmitting(true);
    setError(null);
    const isDuplicate = children.some(
      (child) =>
        child.name.toLowerCase().trim() === babyName.toLowerCase().trim() &&
        new Date(child.dateOfBirth).toDateString() === date.toDateString(),
    );

    if (isDuplicate) {
      Alert.alert("A child with this name and date of birth already exists");
      return;
    }

    try {
      const newChild = await createChild(babyName.trim(), date, gender);
      setChildren([...children, newChild]);
      setFormActive(false);

      Alert.alert("Child record created successfully");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add child");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WrapScrollView screenTitle="Mom Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.photoContainer} activeOpacity={0.7}>
          <Image source={images.mom} style={styles.photo} />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <ThemedText type="text2bold" style={styles.name}>
          {mom?.userName}
        </ThemedText>
        <ThemedText type="text4" style={styles.subInfo}>
          {mom?.email ?? "email@example.com"}
        </ThemedText>
      </View>

      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <Ionicons name="people" size={22} color={COLORS.primary} />
          <ThemedText type="text2bold" style={styles.sectionTitle}>
            Children
          </ThemedText>
        </View>

        {baby ? (
          <View style={styles.childRow}>
            <Image source={images.baby} style={styles.childPhoto} />
            <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
              {baby.name}{" "}
              <ThemedText type="text4" style={{ color: COLORS.black }}>
                | {getAgeLabel(baby.dateOfBirth)}
              </ThemedText>
            </ThemedText>
          </View>
        ) : (
          <ThemedText
            type="text4gray"
            style={{ marginVertical: SIZES.base, marginLeft: SIZES.base }}
          >
            No child profile added yet
          </ThemedText>
        )}

        <PrimaryButton
          title="Add New Child"
          onPress={() => setFormActive(true)}
        />
      </View>

      <View style={styles.sectionCard}>
        <ThemedText type="text2bold" style={styles.sectionTitle}>
          Account Settings
        </ThemedText>

        <FlatList
          data={settingsData}
          scrollEnabled={false}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.listItem,
                item.id === settingsData.length && { borderBottomWidth: 0 },
              ]}
              activeOpacity={0.6}
              onPress={item.onPress}
            >
              <Ionicons
                name={item.iconName as any}
                size={22}
                color={
                  item.danger ? (COLORS.alert ?? "#CC0000") : COLORS.primary
                }
              />
              <ThemedText
                type="text4"
                style={[
                  styles.listLabel,
                  item.danger && { color: COLORS.alert ?? "#CC0000" },
                ]}
              >
                {item.title}
              </ThemedText>
              <Ionicons
                name="chevron-forward"
                size={20}
                style={{ marginLeft: "auto" }}
                color={item.danger ? (COLORS.alert ?? "#CC0000") : COLORS.black}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <Modal
        visible={formActive}
        transparent
        animationType="fade"
        onRequestClose={() => setFormActive(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { padding: SIZES.base }]}>
            <View style={[general.form, { width: "100%", marginVertical: 0 }]}>
              <ThemedText
                type="text3bold"
                style={{
                  color: COLORS.primary,
                }}
              >
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
                containerStyle={{ width: "100%" }}
              />

              <ThemedText type="text4bold" style={styles.label}>
                Date Of Birth
              </ThemedText>
              <TouchableOpacity
                onPress={() => setPickerOpen(true)}
                style={styles.date}
              >
                <Ionicons
                  name="calendar-outline"
                  size={18}
                  color={COLORS.gray}
                />
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
                        color:
                          gender === option ? COLORS.white : COLORS.primary,
                      }}
                    >
                      {option}
                    </ThemedText>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={{ width: "100%" }}>
                <PrimaryButton title="Save Changes" onPress={handleSave} />
                <PrimaryButton
                  title="Cancel"
                  onPress={() => setFormActive(false)}
                  style={{
                    paddingHorizontal: SIZES.padding * 2,
                    backgroundColor: "white",
                  }}
                  textStyle={{ color: COLORS.primary }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showComingSoon}
        transparent
        animationType="fade"
        onRequestClose={() => setShowComingSoon(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Ionicons name="rocket" size={48} color={COLORS.primary} />
            <ThemedText
              type="text2bold"
              style={{ color: COLORS.primary, marginTop: SIZES.base }}
            >
              Coming Soon
            </ThemedText>
            <ThemedText type="text4gray" style={styles.modalMessage}>
              {comingSoonMessage}
            </ThemedText>
            <TouchableOpacity
              style={styles.modalButton}
              activeOpacity={0.7}
              onPress={() => setShowComingSoon(false)}
            >
              <ThemedText type="text4white" style={{ color: COLORS.white }}>
                Got it
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </WrapScrollView>
  );
};

export default MomProfile;
const styles = StyleSheet.create({
  label: {
    marginLeft: SIZES.base / 2,
    marginTop: SIZES.base,
  },
  date: {
    width: "100%",
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
  profileCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    elevation: 1,
  },
  photoContainer: {
    position: "relative",
    marginBottom: SIZES.base,
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
  name: {
    color: COLORS.primary,
    marginTop: SIZES.base * 0.5,
  },
  subInfo: {
    color: COLORS.gray ?? "#888",
    marginTop: 2,
  },
  sectionCard: {
    backgroundColor: COLORS.primary + "10",
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    padding: SIZES.padding,
    marginVertical: SIZES.base,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  sectionTitle: {
    marginLeft: SIZES.base,
    marginBottom: SIZES.base * 0.5,
  },
  childRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SIZES.base * 1.5,
    gap: SIZES.base,
  },
  childPhoto: {
    width: SIZES.navTitle * 1.8,
    height: SIZES.navTitle * 1.8,
    borderRadius: SIZES.navTitle,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.base * 1.2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "20",
  },
  listLabel: {
    marginLeft: SIZES.base,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding * 1.5,
    width: SCREEN_WIDTH * 0.82,
    alignItems: "center",
    elevation: 5,
  },
  modalMessage: {
    textAlign: "center",
    marginTop: SIZES.base,
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
});
