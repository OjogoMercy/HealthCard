import BottomSheet from "@gorhom/bottom-sheet";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemedText } from "../constants/ThemedText";
import { useBabyStore } from "../store/useBabyStore";
import {
  ApproximateTime,
  OpenCatchupGroup,
  returnApproximateTime,
} from "./CatchUpDetection";
interface Props {
  groups: OpenCatchupGroup[];
  dob: Date;
  childId: string;
  visible: boolean;
  onDismiss: () => void;
  onAllAnswered: () => void;
}

// local selection state per vaccine within the currently-open visit group
type Selections = Record<string, ApproximateTime | undefined>;

export default function CatchupBottomSheet({
  groups,
  dob,
  childId,
  visible,
  onDismiss,
  onAllAnswered,
}: Props) {
  const [groupIndex, setGroupIndex] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const markVaccineDone = useBabyStore((s) => s.markVaccineDone);
  const markVaccineDeclined = useBabyStore((s) => s.markVaccineDeclined);

  const currentGroup = groups[groupIndex];
  const allSelected = useMemo(
    () =>
      currentGroup?.vaccines.every((v) => selections[v.id] !== undefined) ??
      false,
    [currentGroup, selections],
  );

  if (!visible || !currentGroup) return null;

  const selectTiming = (vaccineId: string, timing: ApproximateTime) => {
    setSelections((prev) => ({ ...prev, [vaccineId]: timing }));
  };

  const commitGroupAndAdvance = () => {
    for (const vaccine of currentGroup.vaccines) {
      const timing = selections[vaccine.id];
      if (!timing) continue;

      const resolvedDate = returnApproximateTime(currentGroup.dueDate, timing);
      if (resolvedDate) {
        markVaccineDone(vaccine.id, childId, resolvedDate.toISOString());
      } else {
        markVaccineDeclined(vaccine.id);
      }
    }

    setSelections({});

    if (groupIndex + 1 < groups.length) {
      setGroupIndex(groupIndex + 1);
    } else {
      onAllAnswered();
    }
  };

  return (
    <BottomSheet snapPoints={["60%"]} enablePanDownToClose onClose={onDismiss}>
      <View style={styles.container}>
        <ThemedText type="text2bold">{currentGroup.title} visit</ThemedText>
        <ThemedText type="text4gray">Were these vaccines given?</ThemedText>

        {currentGroup.vaccines.map((vaccine) => (
          <View key={vaccine.id} style={styles.vaccineBlock}>
            <Text style={styles.vaccineName}>{vaccine.name}</Text>

            <View style={styles.optionsRow}>
              {(
                [
                  { key: "on_time", label: "Around that time" },
                  { key: "within_week", label: "A bit later" },
                  { key: "not_received", label: "Not received" },
                ] as { key: ApproximateTime; label: string }[]
              ).map((opt) => {
                const selected = selections[vaccine.id] === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.optionPill,
                      selected && styles.optionPillSelected,
                    ]}
                    onPress={() => selectTiming(vaccine.id, opt.key)}
                  >
                    <Text
                      style={[
                        styles.optionLabel,
                        selected && styles.optionLabelSelected,
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <TouchableOpacity onPress={onDismiss}>
            <Text style={styles.laterText}>I'll do this later</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.continueButton,
              !allSelected && styles.continueButtonDisabled,
            ]}
            disabled={!allSelected}
            onPress={commitGroupAndAdvance}
          >
            <Text style={styles.continueText}>
              {groupIndex + 1 < groups.length ? "Next visit" : "Finish"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.progress}>
          Visit {groupIndex + 1} of {groups.length}
        </Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, gap: 16 },
  vaccineBlock: { gap: 8 },
  vaccineName: { fontSize: 15, fontWeight: "600" },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  optionPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  optionPillSelected: { backgroundColor: "#378ADD", borderColor: "#378ADD" },
  optionLabel: { fontSize: 13, color: "#333" },
  optionLabelSelected: { color: "#FFF", fontWeight: "600" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  laterText: { color: "#888", fontSize: 14 },
  continueButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonDisabled: { backgroundColor: "#CCC" },
  continueText: { color: "#FFF", fontWeight: "600" },
  progress: { textAlign: "center", fontSize: 12, color: "#AAA" },
});
