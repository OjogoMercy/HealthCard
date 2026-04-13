import PrimaryButton from "@/src/components/PrimaryButton";
import WrapScrollView from "@/src/components/WrapScrollView";
import { VaccineData } from "@/src/constants/Database";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

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

const CatchUpFlow = () => {
  const navigation = useNavigation<any>();

  const currentStageTitle = useBabyStore((s) => s.currentStageTitle);
  const baby = useBabyStore((s) => s.baby);
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);
  // for checking the stages
  const currentIndex = STAGE_ORDER.indexOf(currentStageTitle ?? "Birth");
  const pastStages = STAGE_ORDER.slice(0, currentIndex);
  // checking the history
  const [checkedIds, setCheckedIds] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleVaccine = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id],
    );
  };

  // Toggle the entire stage
  const toggleStage = (stageTitle: string) => {
    const stageVaccines =
      VaccineData.find((v) => v.title === stageTitle)?.data ?? [];
    const stageIds = stageVaccines.map((v) => v.id);
    const allChecked = stageIds.every((id) => checkedIds.includes(id));

    if (allChecked) {
      setCheckedIds((prev) => prev.filter((id) => !stageIds.includes(id)));
    } else {
      setCheckedIds((prev) => [
        ...prev,
        ...stageIds.filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleSave = () => {
    checkedIds.forEach((id) => markVaccineDone(id));
    setShowConfirmation(false);
    navigation.navigate("Default");
  };

  const handleSkip = () => {
    Alert.alert(
      "Skip Catch-Up?",
      "You can always update your baby's vaccine history later from the History screen.",
      [
        { text: "Go Back", style: "cancel" },
        {
          text: "Skip for Now",
          onPress: () => navigation.navigate("Home"),
        },
      ],
    );
  };

  if (pastStages.length === 0) {
    navigation.replace("Default");
    return null;
  }

  const confirmedVaccines = pastStages.flatMap((stageTitle) => {
    const stageData = VaccineData.find((v) => v.title === stageTitle)?.data ?? [];
    return stageData
      .filter((v) => checkedIds.includes(v.id))
      .map((v) => ({ ...v, stage: stageTitle }));
  });

  return (
    <WrapScrollView screenTitle="Update Vaccine History">
      <View style={styles.introCard}>
        <Ionicons name="medkit" size={32} color={COLORS.primary} />
        <ThemedText
          type="text2bold"
          style={{
            color: COLORS.primary,
            marginTop: SIZES.base,
            textAlign: "center",
          }}
        >
          Let's update {baby?.name ?? "your baby"}'s record
        </ThemedText>
        <ThemedText type="text4gray" style={styles.introText}>
          Since your baby is already past some vaccine stages, please tick the
          vaccines that have already been given. Use your paper immunization
          card as a guide if you have it handy.
        </ThemedText>
      </View>
{/* all stages */}
      {pastStages.map((stageTitle) => {
        const stageData =  VaccineData.find((v) => v.title === stageTitle)?.data ?? [];
        const stageIds = stageData.map((v) => v.id);
        const allChecked =
          stageIds.length > 0 &&
          stageIds.every((id) => checkedIds.includes(id));
        const someChecked = stageIds.some((id) => checkedIds.includes(id));
        const checkedCount = stageIds.filter((id) =>
          checkedIds.includes(id)).length;

        return (
          <View key={stageTitle} style={styles.stageCard}>
            <TouchableOpacity
              style={styles.stageHeader}
              activeOpacity={0.7}
              onPress={() => toggleStage(stageTitle)}
            >
              <View
                style={[
                  styles.stageCheckbox,
                  allChecked && styles.stageCheckboxChecked,
                  someChecked && !allChecked && styles.stageCheckboxPartial,
                ]}
              >
                {allChecked && (
                  <Ionicons name="checkmark" size={14} color={COLORS.white} />
                )}
                {someChecked && !allChecked && (
                  <View style={styles.partialDot} />
                )}
              </View>

              <View style={{ flex: 1 }}>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {stageTitle}
                </ThemedText>
                <ThemedText type="text4gray">
                  {checkedCount} of {stageIds.length} selected
                </ThemedText>
              </View>

              <ThemedText type="text4" style={{ color: COLORS.primary }}>
                {allChecked ? "Deselect all" : "Select all"}
              </ThemedText>
            </TouchableOpacity>

            {stageData.map((vaccine) => {
              const isChecked = checkedIds.includes(vaccine.id);
              return (
                <TouchableOpacity
                  key={vaccine.id}
                  style={styles.vaccineRow}
                  activeOpacity={0.7}
                  onPress={() => toggleVaccine(vaccine.id)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isChecked && styles.checkboxChecked,
                    ]}
                  >
                    {isChecked && (
                      <Ionicons
                        name="checkmark"
                        size={13}
                        color={COLORS.white}
                      />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <ThemedText
                      type="text4"
                      style={{
                        color: isChecked ? COLORS.black : COLORS.gray,
                        fontWeight: isChecked ? "600" : "400",
                      }}
                    >
                      {vaccine.name}
                    </ThemedText>
                    <ThemedText
                      type="text4"
                      style={{
                        fontSize: 11,
                        color: isChecked ? COLORS.primary : COLORS.gray,
                        marginTop: 2,
                      }}
                    >
                      {isChecked
                        ? "✓ Will be marked as administered"
                        : "Tap to mark as given"}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );
      })}

      <View style={styles.buttonContainer}>
        <PrimaryButton
          title={
            checkedIds.length > 0
              ? `Review & Save (${checkedIds.length} vaccines)`
              : "Review & Save"
          }
          onPress={() => {
            if (checkedIds.length === 0) {
              Alert.alert(
                "Nothing Selected",
                "You haven't selected any vaccines. If none have been given yet, you can skip this step.",
                [
                  { text: "Go Back", style: "cancel" },
                  {
                    text: "Skip for Now",
                    onPress: () => navigation.navigate("Home"),
                  },
                ],
              );
              return;
            }
            setShowConfirmation(true);
          }}
        />
        <TouchableOpacity
          style={styles.skipButton}
          activeOpacity={0.7}
          onPress={handleSkip}
        >
          <ThemedText type="text4" style={{ color: COLORS.gray }}>
            I don't have my card right now , Skip
          </ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        visible={showConfirmation}
        transparent
        animationType="slide"
        onRequestClose={() => setShowConfirmation(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ThemedText
              type="text2bold"
              style={{ color: COLORS.primary, marginBottom: SIZES.base }}
            >
              Confirm Vaccine Record
            </ThemedText>
            <ThemedText type="text4gray" style={{ marginBottom: SIZES.base }}>
              The following vaccines will be marked as administered for{" "}
              {baby?.name ?? "your baby"}:
            </ThemedText>

            <ScrollView
              style={styles.confirmList}
              showsVerticalScrollIndicator={false}
            >
              {confirmedVaccines.length > 0 ? (
                confirmedVaccines.map((v) => (
                  <View key={v.id} style={styles.confirmRow}>
                    <Ionicons
                      name="checkmark-circle"
                      size={16}
                      color={COLORS.primary}
                    />
                    <View style={{ flex: 1, marginLeft: SIZES.base * 0.5 }}>
                      <ThemedText type="text4" style={{ fontWeight: "600" }}>
                        {v.name}
                      </ThemedText>
                      <ThemedText type="text4gray" style={{ fontSize: 11 }}>
                        {v.stage}
                      </ThemedText>
                    </View>
                  </View>
                ))
              ) : (
                <ThemedText type="text4gray">No vaccines selected.</ThemedText>
              )}
            </ScrollView>

            <ThemedText type="text4gray" style={styles.confirmNote}>
              You can always edit this later from the History screen.
            </ThemedText>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalSecondaryButton}
                activeOpacity={0.7}
                onPress={() => setShowConfirmation(false)}
              >
                <ThemedText type="text4" style={{ color: COLORS.primary }}>
                  Go Back
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalPrimaryButton}
                activeOpacity={0.7}
                onPress={handleSave}
              >
                <ThemedText type="text4white" style={{ color: COLORS.white }}>
                  Confirm & Save
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </WrapScrollView>
  );
};

export default CatchUpFlow;
const styles = StyleSheet.create({
  introCard: {
    backgroundColor: COLORS.primary + "10",
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.base,
  },
  introText: {
    textAlign: "center",
    marginTop: SIZES.base,
    lineHeight: 22,
  },
  stageCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base * 0.5,
    overflow: "hidden",
    elevation: 1,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: SIZES.base * 1.2,
    backgroundColor: COLORS.primary + "08",
    gap: SIZES.base,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "15",
  },
  stageCheckbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  stageCheckboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  stageCheckboxPartial: {
    backgroundColor: COLORS.primary + "30",
    borderColor: COLORS.primary,
  },
  partialDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  vaccineRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.base * 1.2,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "08",
    gap: SIZES.base,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.gray,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  buttonContainer: {
    width: SCREEN_WIDTH * 0.9,
    alignItems: "center",
    marginVertical: SIZES.padding,
    gap: SIZES.base,
  },
  skipButton: {
    paddingVertical: SIZES.base,
    paddingHorizontal: SIZES.padding,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  modalCard: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.navTitle,
    borderTopRightRadius: SIZES.navTitle,
    padding: SIZES.padding * 1.5,
    width: "100%",
    maxHeight: "75%",
  },
  confirmList: {
    maxHeight: 280,
    marginBottom: SIZES.base,
  },
  confirmRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: SIZES.base * 0.7,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primary + "10",
  },
  confirmNote: {
    textAlign: "center",
    marginVertical: SIZES.base,
    fontStyle: "italic",
  },
  modalButtons: {
    flexDirection: "row",
    gap: SIZES.base,
    marginTop: SIZES.base,
  },
  modalSecondaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.base * 1.2,
    borderRadius: SIZES.padding,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  modalPrimaryButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SIZES.base * 1.2,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
});
