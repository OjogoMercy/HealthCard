import CustomHeader from "@/src/components/CustomHeader";
import PrimaryButton from "@/src/components/PrimaryButton";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

// helper functions
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

const getProgressPercent = (vaccines: { isDone: boolean }[]): number => {
  if (!vaccines.length) return 0;
  const done = vaccines.filter((v) => v.isDone).length;
  return Math.round((done / vaccines.length) * 100);
};

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  // pulling the data needed form the store
  const baby = useBabyStore((s) => s.baby);
  const currentStageTitle = useBabyStore((s) => s.currentStageTitle);
  const currentVaccines = useBabyStore((s) => s.currentVaccines);
  const upcomingStage = useBabyStore((s) => s.upcomingStage);
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);

  const hasBaby = !!baby;
  const progress = getProgressPercent(currentVaccines);
  const dueVaccines = currentVaccines.filter((v) => !v.isDone);
  const allDone = dueVaccines.length === 0 && currentVaccines.length > 0;

  return (
    <CustomHeader
      title="Home"
      authScreen={false}
      tabScreen={true}
      screenTitle="Home"
    >
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.profileContainer}
          activeOpacity={0.5}
          onPress={() => navigation.navigate("MomProfile")}
        >
          <Image source={images.mom} style={styles.profileImage} />
        </TouchableOpacity>
        <ThemedText type="text2" style={{ marginRight: "auto" }}>
          {" "}
          Hey{" "}
          <ThemedText type="text2bold" style={{ color: COLORS.accent }}>
            {baby?.name ?? "Mummy"}
          </ThemedText>
          😉
        </ThemedText>
        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="notifications" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* {for the empty state } */}
      {!hasBaby && (
        <View style={styles.emptyState}>
          <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
            Welcome to HealthCard
          </ThemedText>
          <ThemedText>Track your baby's vaccines easily</ThemedText>

          <View style={styles.mascotContainer}>
            <Image style={styles.mascotImage} source={images.mascot} />
          </View>

          <ThemedText type="text3bold">
            Let's set up your baby's profile
          </ThemedText>
          <ThemedText type="text4gray" style={{ marginVertical: 5 }}>
            So we can track vaccines and reminders
          </ThemedText>
          <PrimaryButton
            title="Add Baby Profile"
            onPress={() => navigation.navigate("AgeCalc")}
          />
        </View>
      )}

      {/* {loading state for the baby } */}
      {hasBaby && (
        <>
          {allDone && (
            <View style={styles.allDoneCard}>
              <Ionicons
                name="checkmark-circle"
                size={28}
                color={COLORS.primary}
              />
              <ThemedText
                type="text2bold"
                style={{ color: COLORS.primary, marginTop: SIZES.base }}
              >
                All vaccines for this stage are done!
              </ThemedText>
              {upcomingStage && (
                <ThemedText
                  type="text4gray"
                  style={{ marginTop: SIZES.base * 0.5, textAlign: "center" }}
                >
                  Next stage: {upcomingStage.title}
                </ThemedText>
              )}
            </View>
          )}
          {/* card simulator  */}
          {!allDone && dueVaccines.length > 0 && (
            <>
              <LinearGradient
                style={styles.card}
                colors={[COLORS.primary, COLORS.primary + "80"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Ionicons name="time" size={23} color={COLORS.accent} />
                  <ThemedText
                    type="text2bold"
                    style={{ color: "white", marginLeft: SIZES.base }}
                  >
                    Next Immunisation
                  </ThemedText>
                </View>

                <ThemedText type="text3white">
                  {dueVaccines.map((v) => v.name).join(" + ")}
                </ThemedText>

                <ThemedText type="text4white">
                  Stage:{" "}
                  <ThemedText style={{ fontWeight: "bold" }} type="text4white">
                    {currentStageTitle}
                  </ThemedText>
                </ThemedText>

                <ThemedText type="text4white">
                  Remaining:{" "}
                  <ThemedText
                    style={{ fontWeight: "bold", color: COLORS.accent }}
                    type="text4white"
                  >
                    {dueVaccines.length} vaccine
                    {dueVaccines.length > 1 ? "s" : ""} due
                  </ThemedText>
                </ThemedText>
              </LinearGradient>

              <View style={styles.cardShadow} />
            </>
          )}

          <ThemedText type="text2bold" style={styles.sectionTitle}>
            Progress
          </ThemedText>

          <View style={styles.bigCard}>
            <View style={[styles.row, { marginVertical: SIZES.base / 2 }]}>
              <View style={styles.profileContainer}>
                <Image source={images.baby} style={styles.profileImage} />
              </View>
              <ThemedText
                type="text3bold"
                style={{ color: COLORS.primary, marginRight: "auto" }}
              >
                {" "}
                {baby.name}{" "}
                <ThemedText type="text4">| {getAgeLabel(baby.dob)}</ThemedText>
              </ThemedText>
            </View>

            <ThemedText type="text3">{progress}% Vaccines completed</ThemedText>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progress}%` }]} />
            </View>

            <ThemedText style={{ marginTop: SIZES.padding }}>
              Current Stage Vaccines ({currentStageTitle})
            </ThemedText>

            <FlatList
              data={currentVaccines}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              contentContainerStyle={{ marginTop: SIZES.base }}
              renderItem={({ item }) => (
                <View style={styles.listItem}>
                  <View style={{ flex: 1 }}>
                    <ThemedText type="text4" style={{ fontWeight: "bold" }}>
                      {item.name}
                    </ThemedText>
                    <ThemedText
                      type="text4"
                      style={{
                        color: item.isDone ? COLORS.primary : COLORS.accent,
                        marginTop: 2,
                      }}
                    >
                      {item.isDone ? "✓ Administered" : "Due"}
                    </ThemedText>
                  </View>

                  {!item.isDone && (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.markButton}
                      onPress={() => markVaccineDone(item.id)}
                    >
                      <ThemedText
                        type="text4"
                        style={{ color: "white", fontSize: 11 }}
                      >
                        Mark Done
                      </ThemedText>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            />
          </View>

          {upcomingStage && (
            <View style={[styles.bigCard, styles.upcomingCard]}>
              <ThemedText type="text4gray">Coming up next</ThemedText>
              <ThemedText
                type="text3bold"
                style={{ color: COLORS.primary, marginTop: 2 }}
              >
                {upcomingStage.title}
              </ThemedText>
              <ThemedText type="text4gray" style={{ marginTop: 4 }}>
                {upcomingStage.data.length} vaccine
                {upcomingStage.data.length > 1 ? "s" : ""} scheduled
              </ThemedText>
            </View>
          )}

          <View style={[styles.bigCard, styles.scheduleRow]}>
            <ThemedText type="text3">View Full Schedule</ThemedText>
            <TouchableOpacity
              onPress={() => navigation.navigate("Immunisation")}
              activeOpacity={0.5}
            >
              <Ionicons
                name="chevron-forward"
                size={24}
                color={COLORS.primary}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </CustomHeader>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SIZES.padding,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.navTitle * 1.4,
    width: SIZES.navTitle * 1.4,
  },
  profileImage: {
    height: "90%",
    width: "90%",
    borderRadius: SIZES.padding,
    resizeMode: "cover",
  },
  card: {
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    gap: SIZES.base,
  },
  cardShadow: {
    height: SIZES.base * 1.2,
    backgroundColor: COLORS.primary + "50",
    borderBottomLeftRadius: SIZES.padding,
    borderBottomRightRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.75,
  },
  sectionTitle: {
    marginTop: SIZES.base * 1.5,
    color: COLORS.primary,
    marginRight: "auto",
    fontWeight: "bold",
  },
  bigCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    marginTop: SIZES.base * 1.5,
    elevation: 2,
  },
  progressBar: {
    width: SCREEN_WIDTH * 0.8,
    height: SIZES.base * 1.5,
    backgroundColor: COLORS.primary + "40",
    borderRadius: SIZES.padding,
    marginTop: SIZES.base,
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4,
    marginVertical: SIZES.base * 0.5,
  },
  markButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 0.6,
    borderRadius: SIZES.padding,
    marginLeft: SIZES.base,
  },
  upcomingCard: {
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding * 2,
  },
  emptyState: {
    width: "100%",
    alignItems: "flex-start",
  },
  mascotContainer: {
    width: SCREEN_WIDTH * 0.8,
    height: SCREEN_HEIGHT * 0.3,
    marginVertical: SIZES.h1,
    alignItems: "center",
  },
  mascotImage: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    marginVertical: SIZES.padding,
  },
  allDoneCard: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: COLORS.primary + "10",
    borderRadius: SIZES.navTitle,
    padding: SIZES.padding,
    alignItems: "center",
    marginBottom: SIZES.base,
  },
});
