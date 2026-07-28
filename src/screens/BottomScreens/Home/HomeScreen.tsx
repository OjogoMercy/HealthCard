import CustomHeader from "@/src/components/CustomHeader";
import PrimaryButton from "@/src/components/PrimaryButton";
import { getAgeLabel } from "@/src/constants/Functions";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { images } from "@/src/constants/images";
import { useBabyStore, Vaccine } from "@/src/store/useBabyStore";
import { useMomStore } from "@/src/store/useMomStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const getProgressPercent = (vaccines: { isDone: boolean }[]): number => {
  if (!vaccines.length) return 0;
  const done = vaccines.filter((v) => v.isDone).length;
  return Math.round((done / vaccines.length) * 100);
};

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState<Vaccine | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation<any>();

  // Store actions and data
  const getActiveChild = useBabyStore((s) => s.getActiveChild);
  const fetchBabyData = useBabyStore((s) => s.refreshBabyData); // Assuming you have this action
  const fetchMomData = useMomStore((s) => s.fetchMomFromStorage); // Assuming you have this action

  const baby = getActiveChild();
  const currentStageTitle = useBabyStore((s) => s.currentStageTitle);
  const currentVaccines = useBabyStore((s) => s.currentVaccines);
  const upcomingStage = useBabyStore((s) => s.upcomingStage);
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);
  const mom = useMomStore((s) => s.mom);
  const activeChildId = useBabyStore((s) => s.activeChildId);

  const hasBaby = !!baby;
  const progress = getProgressPercent(currentVaccines);
  const dueVaccines = currentVaccines.filter((v) => !v.isDone);
  const allDone = dueVaccines.length === 0 && currentVaccines.length > 0;

  // Refresh function
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      // Fetch all required data
      await Promise.all([
        fetchBabyData?.() || Promise.resolve(),
        fetchMomData?.() || Promise.resolve(),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to refresh data");
      console.error("Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  }, [fetchBabyData, fetchMomData]);

  // Retry function for error state
  const handleRetry = () => {
    onRefresh();
  };

  if (!baby || !mom) {
    return (
      <CustomHeader title="Home" authScreen={false} tabScreen={true}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {error ? (
            <View style={styles.errorContainer}>
              <Ionicons name="cloud-offline" size={48} color={COLORS.primary} />
              <ThemedText
                type="text2bold"
                style={{ color: COLORS.primary, marginTop: SIZES.base }}
              >
                Connection Error
              </ThemedText>
              <ThemedText
                type="text4gray"
                style={{ textAlign: "center", marginVertical: SIZES.base }}
              >
                {error}
              </ThemedText>
              <PrimaryButton
                title="Retry"
                onPress={handleRetry}
                style={{ width: "60%" }}
              />
            </View>
          ) : (
            <View style={styles.emptyState}>
              <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
                No active baby found
              </ThemedText>
            </View>
          )}
        </ScrollView>
      </CustomHeader>
    );
  }

  const handleMarkDone = (item: Vaccine) => {
    if (!activeChildId) return;
    setSelectedVaccine(item);
    setModalVisible(true);
  };

  const confirmMarkDone = () => {
    if (!selectedVaccine || !activeChildId) return;
    try {
      markVaccineDone(
        selectedVaccine.id,
        activeChildId,
        new Date(),
        mom.userId,
      );
      setModalVisible(false);
      setSelectedVaccine(null);
      // Optional: Refresh after marking done
      // onRefresh();
    } catch (err) {
      setError("Failed to mark vaccine as done");
      console.error("Mark done error:", err);
    }
  };

  return (
    <CustomHeader title="Home" authScreen={false} tabScreen={true}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Error Banner */}
        {error && (
          <View style={styles.errorBanner}>
            <Ionicons name="warning" size={20} color="white" />
            <ThemedText
              type="text4"
              style={{ color: "white", flex: 1, marginLeft: SIZES.base }}
            >
              {error}
            </ThemedText>
            <TouchableOpacity onPress={() => setError(null)}>
              <Ionicons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.profileContainer}
            activeOpacity={0.5}
            onPress={() => navigation.navigate("MomProfile")}
          >
            <Image source={images.mom} style={styles.profileImage} />
          </TouchableOpacity>
          <ThemedText type="text2bold" style={{ marginRight: "auto" }}>
            {" "}
            Hey{" "}
            <ThemedText type="text2bold" style={{ color: COLORS.accent }}>
              {mom?.userName ?? "Mummy"}
            </ThemedText>
          </ThemedText>
          <TouchableOpacity activeOpacity={0.5}>
            <Ionicons name="notifications" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {!hasBaby && (
          <View style={styles.emptyState}>
            <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
              When did your baby last get vaccinated?
            </ThemedText>
            <ThemedText type="text4">
              HealthCard keeps every dose recorded, and reminds you before you
              miss the next one.
            </ThemedText>

            <View style={styles.mascotContainer}>
              <Image style={styles.mascotImage} source={images.mascot} />
            </View>

            <View style={{ alignItems: "center", width: "100%" }}>
              <ThemedText
                type="text3bold"
                style={{ marginBottom: SIZES.padding / 2 }}
              >
                Let's set up your baby's profile
              </ThemedText>
              <ThemedText
                type="text5"
                style={{
                  marginBottom: -10,
                  textAlign: "center",
                  color: COLORS.gray,
                }}
              >
                Takes less than a minute
              </ThemedText>
              <PrimaryButton
                title="Add Baby Profile"
                style={{ width: "90%" }}
                onPress={() => navigation.navigate("BabyForm")}
              />
            </View>
          </View>
        )}

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
                    <ThemedText
                      style={{ fontWeight: "bold" }}
                      type="text4white"
                    >
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
                  <ThemedText type="text4">
                    | {getAgeLabel(baby.dateOfBirth)}
                  </ThemedText>
                </ThemedText>
              </View>

              <ThemedText type="text3">
                {progress}% Vaccines completed
              </ThemedText>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progress}%` }]}
                />
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
                        onPress={() => handleMarkDone(item)}
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

            <TouchableOpacity
              style={[styles.bigCard, styles.scheduleRow]}
              activeOpacity={0.5}
              onPress={() =>
                navigation.navigate("StackNav", { screen: "VaccineHistory" })
              }
            >
              <ThemedText type="text3">View Full History</ThemedText>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("StackNav", { screen: "VaccineHistory" })
                }
                activeOpacity={0.5}
              >
                <Ionicons
                  name="chevron-forward"
                  size={24}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </TouchableOpacity>

            {/* Last updated indicator */}
            <ThemedText
              type="text5"
              style={{
                textAlign: "center",
                color: COLORS.gray,
                marginTop: SIZES.base,
                marginBottom: SIZES.padding,
              }}
            >
              Pull down to refresh
            </ThemedText>
          </>
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        transparent
        animationType="fade"
      >
        <Pressable
          style={styles.backDrop}
          onPress={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <ThemedText type="text3green">Mark as Administered?</ThemedText>
              <ThemedText style={{ textAlign: "center" }}>
                Are you sure {selectedVaccine?.name} has been given to{" "}
                <Text style={{ fontWeight: "bold" }}>{baby?.name}?</Text>
                Only mark this if the vaccine was actually administered.
              </ThemedText>
              <View style={{ width: "100%" }}>
                <PrimaryButton
                  title="Mark Completed"
                  onPress={confirmMarkDone}
                />
                <PrimaryButton
                  title="Cancel"
                  onPress={() => {
                    setModalVisible(false);
                    setSelectedVaccine(null);
                  }}
                  style={{
                    backgroundColor: "white",
                    marginVertical: 0,
                  }}
                  textStyle={{ color: COLORS.primary }}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Pressable>
      </Modal>
    </CustomHeader>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: SIZES.padding * 2,
  },
  backDrop: {
    backgroundColor: COLORS.opacity,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  modal: {
    backgroundColor: "white",
    width: "80%",
    height: "40%",
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: SIZES.padding / 2,
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
    borderRadius: SIZES.h1,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.86,
    // gap: SIZES.base,
  },
  cardShadow: {
    height: SIZES.base,
    backgroundColor: COLORS.primary + "60",
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
    width: SCREEN_WIDTH * 0.87,
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
    marginBottom: SIZES.padding,
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
  errorBanner: {
    backgroundColor: "#FF3B30",
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    marginBottom: SIZES.base,
    width: SCREEN_WIDTH * 0.9,
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding * 2,
  },
});
