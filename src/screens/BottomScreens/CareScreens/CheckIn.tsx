import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore"; // Import store
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const CheckIn = () => {
  const navigation = useNavigation<any>();

  // Connect to the store to get baby info and vaccin
  const active = useBabyStore((s) => s.getActiveChild);
  const baby = active();

  const currentVaccines = useBabyStore((s) => s.currentVaccines);
  const currentStageTitle = useBabyStore((s) => s.currentStageTitle);
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);

  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (!baby) {
    return (
      <WrapView screenTitle="Check-In">
        <View style={styles.emptyContainer}>
          <Image
            source={images.mascotCry}
            style={{ height: SCREEN_HEIGHT * 0.35, width: SCREEN_WIDTH * 0.5 }}
          />
          <ThemedText type="text3bold">No Baby Profile Found</ThemedText>
          <PrimaryButton
            title="Setup Baby Profile"
            onPress={() => navigation.navigate("AgeCalc")}
          />
        </View>
      </WrapView>
    );
  }
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

  return (
    <WrapView screenTitle="Check-In">
      <View style={styles.row}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image source={images.baby} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{ marginRight: "auto", marginLeft: SIZES.base }}>
          <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
            {baby.name}
          </ThemedText>
          <ThemedText type="text4">{getAgeLabel(baby.dateOfBirth)} </ThemedText>
        </View>
      </View>

      <View style={[styles.form, styles.rowBetween]}>
        <View style={styles.iconLabel}>
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
          <ThemedText type="text4">Visit Date</ThemedText>
        </View>
        <View style={styles.iconLabel}>
          <ThemedText type="text4bold">{date}</ThemedText>
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            activeOpacity={0.5}
          >
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          styles.form,
          { backgroundColor: COLORS.secondary + "20", elevation: 0 },
        ]}
      >
        <ThemedText type="text3bold">
          Vaccines for {currentStageTitle}
        </ThemedText>
        <ThemedText type="text4gray" style={{ marginBottom: SIZES.base }}>
          Tap the box to mark vaccines given today.
        </ThemedText>

        <FlatList
          data={currentVaccines}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.vaccineItem}>
              <ThemedText
                type="text4"
                style={
                  item.isDone
                    ? {
                        color: COLORS.primary,
                        fontWeight: "bold",
                        width: "80%",
                      }
                    : { width: "80%" }
                }
              >
                {item.name}
              </ThemedText>
              <TouchableOpacity
                onPress={() => markVaccineDone(item.id)}
                activeOpacity={0.5}
                disabled={item.isDone}
              >
                <Ionicons
                  name={item.isDone ? "checkbox" : "square-outline"}
                  size={28}
                  color={item.isDone ? COLORS.primary : COLORS.gray}
                />
              </TouchableOpacity>
            </View>
          )}
        />

        <PrimaryButton
          title="Done for Today"
          onPress={() => navigation.navigate("Home")}
          style={{ marginTop: SIZES.padding }}
        />
      </View>
    </WrapView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base,
    backgroundColor: COLORS.white,
    padding: SIZES.padding,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
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
  },
  form: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    marginTop: SIZES.base,
    elevation: 2,
  },
  vaccineItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SIZES.base * 1.5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray4,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: SIZES.padding,
    gap: 20,
  },
});
