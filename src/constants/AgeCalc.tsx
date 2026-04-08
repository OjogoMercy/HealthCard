import PrimaryButton from "@/src/components/PrimaryButton";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { VaccineData } from "./Database";

interface BabyData {
  dob: string;
}

const getDiffInDays = (dob: Date): number =>
  Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24));

const getAgeInWeeks = (dob: Date): number => Math.floor(getDiffInDays(dob) / 7);

const getAgeInMonths = (dob: Date): number => {
  const now = new Date();
  return (
    (now.getFullYear() - dob.getFullYear()) * 12 +
    (now.getMonth() - dob.getMonth())
  );
};

const getAgeInYears = (dob: Date): number => {
  const now = new Date();
  const years = now.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  return hasHadBirthdayThisYear ? years : years - 1;
};

const getTargetTitle = (dob: Date): string => {
  const weeks = getAgeInWeeks(dob);
  const months = getAgeInMonths(dob);
  const years = getAgeInYears(dob);

  if (weeks < 6) return "Birth";
  if (weeks < 10) return "6 Weeks";
  if (weeks < 14) return "10 Weeks";
  if (months < 6) return "14 Weeks";
  if (months < 9) return "6 Months";
  if (months < 12) return "9 Months";
  if (months < 15) return "12 Months";
  if (years < 9) return "15 Months";
  return "9–13 Years";
};

const SIMULATIONS: { label: string; daysAgo: number }[] = [
  { label: "Born today (Birth)", daysAgo: 0 },
  { label: "6 weeks old", daysAgo: 42 },
  { label: "10 weeks old", daysAgo: 70 },
  { label: "14 weeks old", daysAgo: 98 },
  { label: "6 months old", daysAgo: 182 },
  { label: "9 months old", daysAgo: 274 },
  { label: "12 months old", daysAgo: 365 },
  { label: "15 months old", daysAgo: 456 },
  { label: "9 years old", daysAgo: 3287 },
];

const subtractDays = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d;
};

const AgeCalc = () => {
  const [babyData, setBabyData] = useState<BabyData | null>(null);
  const [showSimulations, setShowSimulations] = useState(false);

  const saveBirthDate = (date: Date) => {
    setBabyData({ dob: date.toISOString() });
    setShowSimulations(false);
  };

  const dob = babyData ? new Date(babyData.dob) : null;
  const currentTitle = dob ? getTargetTitle(dob) : null;
  const currentCategory = VaccineData.find((v) => v.title === currentTitle);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ThemedText type="text1" style={styles.header}>
        Immunization Tracker
      </ThemedText>

      {babyData && currentTitle && (
        <View style={styles.stageCard}>
          <ThemedText type="text2" style={styles.stageLabel}>
            Current stage
          </ThemedText>
          <ThemedText type="text2bold" style={styles.stageTitle}>
            {currentTitle}
          </ThemedText>
        </View>
      )}

      {!babyData && (
        <View style={styles.section}>
          <ThemedText type="text2" style={styles.sectionHint}>
            Select a simulation to preview vaccine recommendations
          </ThemedText>

          <PrimaryButton
            title={
              showSimulations ? "Hide simulations" : "Choose age simulation"
            }
            onPress={() => setShowSimulations((prev) => !prev)}
          />

          {showSimulations && (
            <View style={styles.simList}>
              {SIMULATIONS.map((sim) => (
                <TouchableOpacity
                  key={sim.label}
                  style={styles.simItem}
                  onPress={() => saveBirthDate(subtractDays(sim.daysAgo))}
                  activeOpacity={0.7}
                >
                  <ThemedText type="text2" style={styles.simLabel}>
                    {sim.label}
                  </ThemedText>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}

      {currentCategory && (
        <View style={styles.section}>
          {currentCategory.data.map((item) => (
            <View key={item.id} style={styles.vaccineCard}>
              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: item.isDone
                      ? COLORS.primary + "20"
                      : COLORS.accent + "20",
                  },
                ]}
              >
                <ThemedText
                  type="text2bold"
                  style={{
                    color: item.isDone ? COLORS.primary : COLORS.accent,
                    fontSize: 11,
                  }}
                >
                  {item.isDone ? "✓ Administered" : "Due"}
                </ThemedText>
              </View>

              <ThemedText type="text2bold" style={styles.vaccineName}>
                {item.name}
              </ThemedText>
              <ThemedText type="text2" style={styles.vaccineSummary}>
                {item.summary}
              </ThemedText>
            </View>
          ))}
        </View>
      )}

      {babyData && currentCategory && currentCategory.data.length === 0 && (
        <View style={styles.emptyState}>
          <ThemedText type="text2" style={styles.sectionHint}>
            No vaccines listed for this stage yet.
          </ThemedText>
        </View>
      )}

      {babyData && (
        <View style={styles.resetRow}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => setBabyData(null)}
            activeOpacity={0.7}
          >
            <ThemedText type="text2bold" style={styles.resetText}>
              Reset simulation
            </ThemedText>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default AgeCalc;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding * 2,
    paddingBottom: SIZES.padding * 3,
  },
  header: {
    marginBottom: SIZES.base * 2,
  },
  stageCard: {
    backgroundColor: COLORS.primary + "15",
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.base * 2,
  },
  stageLabel: {
    color: COLORS.primary,
    marginBottom: SIZES.base * 0.5,
  },
  stageTitle: {
    color: COLORS.primary,
    fontSize: 20,
  },
  section: {
    marginBottom: SIZES.base * 2,
  },
  sectionHint: {
    color: COLORS.secondary,
    marginBottom: SIZES.base * 1.5,
  },
  simList: {
    marginTop: SIZES.base,
    gap: SIZES.base,
  },
  simItem: {
    width: SCREEN_WIDTH * 0.88,
    backgroundColor: COLORS.primary + "10",
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
  },
  simLabel: {
    color: COLORS.primary,
  },
  vaccineCard: {
    backgroundColor: COLORS.opacity ?? "#F9F9F9",
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    marginBottom: SIZES.base,
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: SIZES.base,
    paddingVertical: 3,
    paddingHorizontal: SIZES.base,
    marginBottom: SIZES.base,
  },
  vaccineName: {
    fontSize: 16,
    marginBottom: SIZES.base * 0.5,
    color: COLORS.primary,
  },
  vaccineSummary: {
    color: COLORS.secondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: SIZES.padding * 2,
  },
  resetRow: {
    marginTop: SIZES.base * 2,
    alignItems: "center",
  },
  resetButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding * 1.5,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.alert ? COLORS.alert + "15" : "#FF000015",
  },
  resetText: {
    color: COLORS.accent ?? "#CC0000",
  },
});
