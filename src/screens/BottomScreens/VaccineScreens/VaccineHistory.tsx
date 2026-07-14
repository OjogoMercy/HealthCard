import CatchupBottomSheet from "@/src/CatchUp/CatchupBottomSheet";
import PromptModal from "@/src/CatchUp/PromptModal";
import { useCatchupPrompt } from "@/src/CatchUp/UseCatchUpPrompt";
import WrapScrollView from "@/src/components/WrapScrollView";
import { VaccineData } from "@/src/constants/Database";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
interface VaccineRow {
  id: string;
  name: string;
  isDone: boolean;
  isCurrentStage: boolean;
}
interface StageSection {
  title: string;
  isCurrentStage: boolean;
  allDone: boolean;
  data: VaccineRow[];
}
const STAGE_ORDER = [
  "Birth",
  "6 Weeks",
  "10 Weeks",
  "14 Weeks",
  "6 Months",
  "9 Months",
  "12 Months",
  "15 Months",
  "9–13 Years",
];

const VaccineHistory = () => {
  const completedIds = useBabyStore((s) => s.completedIds);
  const currentStageTitle = useBabyStore((s) => s.currentStageTitle);
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);
  const markVaccineUndone = useBabyStore((s) => s.unMarkVaccine);
  const activeChild = useBabyStore((s) => s.getActiveChild);
  const babyId = useBabyStore((s) => s.activeChildId);
  const baby = activeChild();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const [expandedStages, setExpandedStages] = useState<string[]>([
    currentStageTitle ?? "Birth",
  ]);
  const toggleStage = (title: string) => {
    setExpandedStages((prev) =>
      prev.includes(title) ? prev.filter((s) => s !== title) : [...prev, title],
    );
  };
  const safeDate = baby?.dateOfBirth ? new Date(baby.dateOfBirth) : null;

  const {
    openGroups,
    sheetVisible,
    triggerIfFirstVisit,
    dismiss,
    onAllAnswered,
    openVaccineCount,
  } = useCatchupPrompt(babyId || "", safeDate);
  useFocusEffect(
    useCallback(() => {
      if (babyId && safeDate) {
        triggerIfFirstVisit();
      }
    }, [babyId, safeDate]),
  );

  // different sections
  const sections: StageSection[] = STAGE_ORDER.map((stageTitle) => {
    const found = VaccineData.find((v) => v.title === stageTitle);
    const isCurrentStage = stageTitle === currentStageTitle;
    const vaccines: VaccineRow[] = (found?.data ?? []).map((v) => ({
      id: v.id,
      name: v.name,
      isDone: completedIds.includes(v.id),
      isCurrentStage,
    }));
    const allDone = vaccines.length > 0 && vaccines.every((v) => v.isDone);

    return {
      title: stageTitle,
      isCurrentStage,
      allDone,
      data: expandedStages.includes(stageTitle) ? vaccines : [],
    };
  });
  const totalVaccines = sections.reduce(
    (acc, s) =>
      acc + (VaccineData.find((v) => v.title === s.title)?.data.length ?? 0),
    0,
  );
  const totalDone = completedIds.length;
  const overallPercent = totalVaccines
    ? Math.round((totalDone / totalVaccines) * 100)
    : 0;
  const handleMarkDone = (id: string, name: string) => {
    Alert.alert(
      "Mark as Administered?",
      `Are you sure ${name} has been given to ${baby?.name ?? "your baby"}? Only mark this if the vaccine was actually administered.`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Mark as Done",
          onPress: () => markVaccineDone(id),
        },
      ],
    );
  };
  const handleUnMark = (id: string, name: string) => {
    Alert.alert(
      "UnMark Vaccine?",
      `Are you sure you want to unMark this Vaccine`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes UnMark",
          onPress: () => markVaccineUndone(id),
          style: "destructive",
        },
      ],
    );
  };

  return (
    <WrapScrollView screenTitle="Vaccine History">
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View>
            <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
              {overallPercent}%
            </ThemedText>
            <ThemedText type="text4gray">Overall complete</ThemedText>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
              {totalDone}
            </ThemedText>
            <ThemedText type="text4gray">Vaccines done</ThemedText>
          </View>
          <View style={styles.summaryDivider} />
          <View>
            <ThemedText type="text2bold" style={{ color: COLORS.accent }}>
              {totalVaccines - totalDone}
            </ThemedText>
            <ThemedText type="text4gray">Remaining</ThemedText>
          </View>
        </View>

        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${overallPercent}%` }]}
          />
        </View>
      </View>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: COLORS.primary }]}
          />
          <ThemedText type="text5">Administered</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[styles.legendDot, { backgroundColor: COLORS.accent }]}
          />
          <ThemedText type="text5">Due / Upcoming</ThemedText>
        </View>
        <View style={styles.legendItem}>
          <View
            style={[
              styles.legendDot,
              { backgroundColor: COLORS.primary + "30" },
            ]}
          />
          <ThemedText type="text5">Current stage</ThemedText>
        </View>
      </View>

      <SectionList
        sections={sections}
        scrollEnabled={false}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section }) => {
          const isExpanded = expandedStages.includes(section.title);
          const isCurrentStage = section.isCurrentStage;
          const fullSection = VaccineData.find(
            (v) => v.title === section.title,
          );
          const sectionTotal = fullSection?.data.length ?? 0;
          const sectionDone =
            fullSection?.data.filter((v) => completedIds.includes(v.id))
              .length ?? 0;

          return (
            <TouchableOpacity
              style={[
                styles.stageHeader,
                isCurrentStage && styles.stageHeaderCurrent,
                section.allDone && styles.stageHeaderDone,
              ]}
              activeOpacity={0.7}
              onPress={() => toggleStage(section.title)}
            >
              <View style={styles.stageIconContainer}>
                {section.allDone ? (
                  <Ionicons
                    name="checkmark-circle"
                    size={22}
                    color={COLORS.primary}
                  />
                ) : isCurrentStage ? (
                  <Ionicons name="time" size={22} color={COLORS.accent} />
                ) : (
                  <Ionicons
                    name="ellipse-outline"
                    size={22}
                    color={COLORS.gray}
                  />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <ThemedText
                  type="text3bold"
                  style={{
                    color: isCurrentStage
                      ? COLORS.accent
                      : section.allDone
                        ? COLORS.primary
                        : COLORS.black,
                  }}
                >
                  {section.title}
                  {isCurrentStage && (
                    <ThemedText
                      type="text4"
                      style={{ color: COLORS.accent, fontSize: 11 }}
                    >
                      {" "}
                      · Current stage
                    </ThemedText>
                  )}
                </ThemedText>
                <ThemedText type="text4gray">
                  {sectionDone} of {sectionTotal} vaccines done
                </ThemedText>
              </View>

              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color={COLORS.gray}
              />
            </TouchableOpacity>
          );
        }}
        renderItem={({ item }) => (
          <View
            style={[styles.vaccineRow, item.isDone && styles.vaccineRowDone]}
          >
            <View
              style={[
                styles.vaccineDot,
                {
                  backgroundColor: item.isDone
                    ? COLORS.primary
                    : COLORS.accent + "40",
                },
              ]}
            />
            <View style={{ flex: 1 }}>
              <ThemedText
                type="text4"
                style={{
                  color: item.isDone ? COLORS.black : COLORS.gray,
                  textDecorationLine: item.isDone ? "none" : "none",
                }}
              >
                {item.name}
              </ThemedText>
              <ThemedText
                type="text4"
                style={{
                  fontSize: 11,
                  color: item.isDone ? COLORS.primary : COLORS.accent,
                  marginTop: 2,
                }}
              >
                {item.isDone ? "✓ Administered" : "Not yet administered"}
              </ThemedText>
            </View>
            {!item.isDone && item.isCurrentStage && (
              <TouchableOpacity
                style={styles.markButton}
                activeOpacity={0.7}
                onPress={() => handleMarkDone(item.id, item.name)}
              >
                <ThemedText
                  type="text4"
                  style={{ color: COLORS.white, fontSize: 11 }}
                >
                  Mark Done
                </ThemedText>
              </TouchableOpacity>
            )}
            {item.isDone && (
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={COLORS.primary}
                />
                <TouchableOpacity
                  style={[
                    styles.markButton,
                    { backgroundColor: COLORS.accent, marginLeft: SIZES.h6 },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handleUnMark(item.id, item.name)}
                >
                  <ThemedText
                    type="text5"
                    style={{ color: COLORS.white, fontSize: 11 }}
                  >
                    Undo
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
        renderSectionFooter={({ section }) =>
          expandedStages.includes(section.title) ? (
            <View style={styles.sectionFooter} />
          ) : null
        }
      />
      {babyId && (
        <>
          <PromptModal
            openVaccineCount={openVaccineCount}
            setClose={() => setModalVisible(false)}
            close={modalVisible}
            onPress={() => {
              setModalVisible(false);
              setVisible(true);
            }}
          />
          <CatchupBottomSheet
            groups={openGroups}
            dob={safeDate}
            childId={babyId || ""}
            visible={visible}
            onDismiss={() => setVisible(false)}
            onAllAnswered={onAllAnswered}
          />
        </>
      )}
    </WrapScrollView>
  );
};

export default VaccineHistory;

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base * 1.3,
    elevation: 1,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.base,
  },
  summaryDivider: {
    width: 1,
    height: 40,
    backgroundColor: COLORS.primary + "20",
    marginHorizontal: SIZES.base / 2,
  },
  progressBar: {
    width: "100%",
    height: SIZES.base * 1.2,
    backgroundColor: COLORS.primary + "20",
    borderRadius: SIZES.padding,
    marginTop: SIZES.base,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    marginBottom: SIZES.base,
    paddingHorizontal: SIZES.base * 0.5,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: SIZES.base * 0.5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    padding: SIZES.base * 1.2,
    marginVertical: SIZES.base / 2,
    width: SCREEN_WIDTH * 0.9,
    elevation: 1,
    gap: SIZES.base,
  },
  stageHeaderCurrent: {
    backgroundColor: COLORS.accent + "15",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  stageHeaderDone: {
    backgroundColor: COLORS.primary + "10",
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  stageIconContainer: {
    width: 28,
    alignItems: "center",
  },
  vaccineRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "10",
    width: SCREEN_WIDTH * 0.9,
    gap: SIZES.base,
  },
  vaccineRowDone: {
    backgroundColor: COLORS.primary + "05",
  },
  vaccineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    flexShrink: 0,
  },
  markButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base * 0.5,
    borderRadius: SIZES.padding,
    flexShrink: 0,
  },
  sectionFooter: {
    height: SIZES.base,
  },
});
