import WrapScrollView from "@/src/components/WrapScrollView";
import PrimaryButton from "@/src/components/PrimaryButton";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useMomStore } from "@/src/store/useMomStore";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";


const getAgeLabel = (dob: string): string => {
  const birth = new Date(dob);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24)
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

  const mom = useMomStore((s) => s.mom);
  const clearMom = useMomStore((s) => s.clearMom);
  const baby = useBabyStore((s) => s.baby);
  const clearBaby = useBabyStore((s) => s.clearBaby);

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
            navigation.navigate("Home");
          },
        },
      ]
    );
  };

  const settingsData = [
    {
      id: 1,
      iconName: "person-outline",
      title: "Edit Profile",
      onPress: () =>
        navigation.navigate("StackNav", { screen: "EditMomProfile" }),
    },
    {
      id: 2,
      iconName: "shield-checkmark-outline",
      title: "Security",
      onPress: () =>
        triggerComingSoon(
          "Security settings like password change and two-factor authentication are coming soon."
        ),
    },
    {
      id: 3,
      iconName: "settings-outline",
      title: "Settings",
      onPress: () =>
        triggerComingSoon(
          "App settings including language and notification preferences are on the way."
        ),
    },
    {
      id: 4,
      iconName: "help-circle-outline",
      title: "Help",
      onPress: () =>
        triggerComingSoon(
          "Our help centre and support chat are coming soon. Hang tight!"
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

  return (
    <WrapScrollView screenTitle="Mom Profile">

      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.photoContainer} activeOpacity={0.7}>
          <Image
            source={mom?.photoUri ? { uri: mom.photoUri } : images.mom}
            style={styles.photo}
          />
          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color={COLORS.white} />
          </View>
        </TouchableOpacity>

        <ThemedText type="text2bold" style={styles.name}>
          {mom?.fullName ?? "Your Name"}
        </ThemedText>
        <ThemedText type="text4" style={styles.subInfo}>
          {mom?.email ?? "email@example.com"}
        </ThemedText>
        <ThemedText type="text4" style={styles.subInfo}>
          {mom?.phone ?? "Phone not set"}
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
                | {getAgeLabel(baby.dob)}
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
          onPress={() =>
            triggerComingSoon(
              "Multiple child profiles are on the way. You will be able to track all your children's vaccines in one place very soon!"
            )
          }
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
                color={item.danger ? COLORS.alert ?? "#CC0000" : COLORS.primary}
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
                color={item.danger ? COLORS.alert ?? "#CC0000" : COLORS.black}
              />
            </TouchableOpacity>
          )}
        />
      </View>

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
            <ThemedText
              type="text4gray"
              style={styles.modalMessage}
            >
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