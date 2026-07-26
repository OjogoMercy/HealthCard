import { logoutUser } from "@/BackendComm/APIClient";
import WrapView from "@/src/components/WrapView";
import { getAgeLabel } from "@/src/constants/Functions";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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

const getProgressStats = (
  vaccines: { isDone: boolean }[],
): { percent: number; done: number; total: number } => {
  const total = vaccines?.length || 0;
  const done = vaccines?.filter((v) => v.isDone).length || 0;
  const percent = total ? Math.round((done / total) * 100) : 0;
  return { percent, done, total };
};

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getActiveChild = useBabyStore((s) => s.getActiveChild);
  const baby = getActiveChild();
  const currentVaccines = useBabyStore((s) => s.currentVaccines) || [];
  const currentStageTitle = useBabyStore((s) => s.currentStageTitle) || "N/A";
  const clearChildren = useBabyStore((s) => s.clearChildren);
  const setActiveChildId = useBabyStore((s) => s.activeChildId);
  const { percent, done, total } = getProgressStats(currentVaccines);
  const nextDueVaccines = currentVaccines.filter((v) => !v.isDone);
  const nextVaccineNames =
    nextDueVaccines.length > 0
      ? nextDueVaccines
          .slice(0, 3)
          .map((v) => v.name)
          .join(" + ") +
        (nextDueVaccines.length > 3
          ? ` +${nextDueVaccines.length - 3} more`
          : "")
      : null;
  const allDone = currentVaccines.length > 0 && nextDueVaccines.length === 0;

  const handleLogout = () => {
    Alert.alert(
      "Clear Profile",
      "Are you sure you want to clear this baby's profile? All progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            setIsLoggingOut(true);
            try {
              clearChildren();
              setActiveChildId(null);
              await logoutUser();
            } catch (error) {
              Alert.alert("Error", "Failed to logout. Please try again.");
            } finally {
              setIsLoggingOut(false);
            }
          },
        },
      ],
    );
  };

  const Data = [
    {
      id: 0,
      iconName: "person-circle",
      title: "My Profile",
      onPress: () => navigation.navigate("StackNav", { screen: "MomProfile" }),
    },
    {
      id: 1,
      iconName: "person",
      title: "Child Information",
      onPress: () => navigation.navigate("StackNav", { screen: "EditProfile" }),
    },
    {
      id: 2,
      iconName: "people-circle",
      title: "Switch Child Profile",
      onPress: () => setShowComingSoon(true),
    },
    {
      id: 3,
      iconName: "help-circle",
      title: "Help and Support",
      onPress: () => setShowComingSoon(true),
    },
    {
      id: 4,
      iconName: "log-out-outline",
      title: isLoggingOut ? "Logging out..." : "Logout",
      onPress: handleLogout,
      danger: true,
      disabled: isLoggingOut,
    },
  ];

  return (
    <WrapView screenTitle="Profile">
      <View style={styles.profileCard}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image source={images.baby} style={styles.profileImage} />
          <Ionicons
            name="camera"
            size={20}
            color={COLORS.primary}
            style={{ position: "absolute", bottom: 5, right: 5 }}
          />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
            {baby?.name ?? "No baby added yet"}
          </ThemedText>
          <ThemedText type="text4">
            {baby ? getAgeLabel(baby.dateOfBirth) : "—"}
          </ThemedText>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          activeOpacity={0.7}
          onPress={() =>
            navigation.navigate("StackNav", { screen: "EditProfile" })
          }
        >
          <ThemedText type="text4white" style={{ color: COLORS.white }}>
            Edit Profile{" "}
          </ThemedText>
          <Ionicons name="pencil" size={15} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <LinearGradient
        colors={[COLORS.primary, `${COLORS.primary}80`]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.progress}
      >
        <ThemedText type="text3boldwhite">Vaccination Progress</ThemedText>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${percent}%` }]} />
        </View>
        <ThemedText type="text4white">Completion: {percent}%</ThemedText>
        <ThemedText type="text4white">
          {done} of {total} vaccines completed
        </ThemedText>
      </LinearGradient>

      <View style={styles.nextContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="calendar" size={20} color={COLORS.accent} />
          <ThemedText type="text3bold" style={{ marginLeft: SIZES.base }}>
            Next Vaccine
          </ThemedText>
        </View>

        {currentVaccines.length === 0 ? (
          <ThemedText type="text4" style={{ marginTop: 4, color: COLORS.gray }}>
            No vaccines scheduled yet
          </ThemedText>
        ) : allDone ? (
          <ThemedText
            type="text4"
            style={{ marginTop: 4, color: COLORS.primary }}
          >
            ✓ All vaccines for this stage are done!
          </ThemedText>
        ) : (
          <>
            <ThemedText type="text4" style={{ marginTop: 4 }}>
              {nextVaccineNames}
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 4,
              }}
            >
              <Ionicons name="time" size={15} color={COLORS.accent} />
              <ThemedText
                type="text4"
                style={{ marginLeft: SIZES.base * 0.5, color: COLORS.accent }}
              >
                Stage: {currentStageTitle} · Due now
              </ThemedText>
            </View>
          </>
        )}
      </View>

      <View style={styles.card}>
        <FlatList
          data={Data}
          scrollEnabled={false}
          ListHeaderComponent={
            <ThemedText type="text4bold" style={{ marginVertical: SIZES.base }}>
              Quick Actions
            </ThemedText>
          }
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.listItem,
                item.disabled && styles.listItemDisabled,
              ]}
              activeOpacity={0.6}
              onPress={item.disabled ? undefined : item.onPress}
            >
              <Ionicons
                name={item.iconName as any}
                size={24}
                color={
                  item.danger
                    ? COLORS.alert || "#CC0000"
                    : item.disabled
                      ? COLORS.gray
                      : COLORS.primary
                }
              />
              <ThemedText
                type="text4"
                style={{
                  marginLeft: SIZES.base,
                  color: item.danger
                    ? COLORS.alert || "#CC0000"
                    : item.disabled
                      ? COLORS.gray
                      : undefined,
                }}
              >
                {item.title}
              </ThemedText>
              <Ionicons
                style={{ marginLeft: "auto" }}
                name="chevron-forward"
                size={22}
                color={
                  item.danger
                    ? COLORS.alert || "#CC0000"
                    : item.disabled
                      ? COLORS.gray
                      : COLORS.black
                }
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
            <Ionicons name="people-circle" size={48} color={COLORS.primary} />
            <ThemedText
              type="text2bold"
              style={{ color: COLORS.primary, marginTop: SIZES.base }}
            >
              Coming Soon
            </ThemedText>
            <ThemedText
              type="text4gray"
              style={{ textAlign: "center", marginTop: SIZES.base * 0.5 }}
            >
              Multiple child profiles are on the way. You'll be able to switch
              between your children's records easily very soon!
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
    </WrapView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  profileContainer: {
    borderRadius: SIZES.navTitle,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.base,
  },
  profileImage: {
    width: SIZES.navTitle * 2,
    height: SIZES.navTitle * 2,
    borderRadius: SIZES.navTitle * 2,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },
  profileCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.base,
    flexDirection: "row",
    elevation: 1,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: SIZES.padding,
    justifyContent: "center",
    elevation: 3,
  },
  progress: {
    padding: SIZES.base * 2,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    marginTop: SIZES.base / 2,
  },
  progressBar: {
    width: SCREEN_WIDTH * 0.8,
    height: SIZES.base * 1.5,
    backgroundColor: `${COLORS.primary}40`,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.padding / 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
  nextContainer: {
    backgroundColor: `${COLORS.accent}30`,
    width: SCREEN_WIDTH * 0.9,
    paddingVertical: SIZES.padding / 2,
    borderRadius: SIZES.padding,
    marginVertical: SIZES.base,
    alignItems: "flex-start",
    paddingHorizontal: SIZES.base * 1.5,
    minHeight: SCREEN_HEIGHT * 0.1,
    justifyContent: "center",
  },
  card: {
    backgroundColor: `${COLORS.secondary || "#F5F5F5"}20`,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginTop: SIZES.base / 2,
    width: "100%",
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4 || "#F0F0F0",
  },
  listItemDisabled: {
    opacity: 0.5,
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
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding * 2,
    marginTop: SIZES.padding,
  },
});
