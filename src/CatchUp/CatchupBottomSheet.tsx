import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { COLORS } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";
import { useBabyStore } from "../store/useBabyStore";
import { useMomStore } from "../store/useMomStore";
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

type Selections = Record<string, ApproximateTime | undefined>;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const BOTTOM_SHEET_HEIGHT = SCREEN_HEIGHT * 0.6;

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
  const panY = useRef(new Animated.Value(0)).current;

  const currentGroup = groups[groupIndex];
  const allSelected = useMemo(
    () =>
      currentGroup?.vaccines.every((v) => selections[v.id] !== undefined) ??
      false,
    [currentGroup, selections],
  );
  const activeUser = useMomStore((s) => s.mom);

  useEffect(() => {
    if (visible) {
      panY.setValue(0);
    }
  }, [visible, panY]);

  const handleDismiss = useMemo(() => {
    return () => {
      Animated.spring(panY, {
        toValue: BOTTOM_SHEET_HEIGHT,
        useNativeDriver: true,
        tension: 300,
        friction: 30,
      }).start(() => {
        panY.setValue(0);
        onDismiss();
      });
    };
  }, [panY, onDismiss]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: (_, gestureState) => {
          return gestureState.dy > 5;
        },
        onPanResponderMove: (_, gestureState) => {
          if (gestureState.dy > 0) {
            panY.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dy > BOTTOM_SHEET_HEIGHT * 0.15) {
            handleDismiss();
          } else {
            Animated.spring(panY, {
              toValue: 0,
              useNativeDriver: true,
              tension: 300,
              friction: 30,
            }).start();
          }
        },
      }),
    [panY, handleDismiss],
  );

  if (!visible) return null;

  if (!groups.length || !currentGroup) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={handleDismiss}
        statusBarTranslucent
      >
        <TouchableWithoutFeedback onPress={handleDismiss}>
          <View style={styles.overlay}>
            <View style={styles.bottomSheet}>
              <View style={styles.dragHandleContainer}>
                <View style={styles.dragHandle} />
              </View>
              <View style={styles.container}>
                <ThemedText type="text2bold">No vaccines available</ThemedText>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleDismiss}
                >
                  <Text style={styles.continueText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  const selectTiming = (vaccineId: string, timing: ApproximateTime) => {
    setSelections((prev) => ({ ...prev, [vaccineId]: timing }));
  };

  const commitGroupAndAdvance = () => {
    if (!activeUser) return;
    for (const vaccine of currentGroup.vaccines) {
      const timing = selections[vaccine.id];
      if (!timing) continue;

      const resolvedDate = returnApproximateTime(currentGroup.dueDate, timing);
      if (resolvedDate) {
        markVaccineDone(vaccine.id, childId, resolvedDate, activeUser?.userId);
      } else {
        markVaccineDeclined(vaccine.id);
      }
    }

    setSelections({});

    if (groupIndex + 1 < groups.length) {
      setGroupIndex(groupIndex + 1);
    } else {
      onAllAnswered();
      handleDismiss();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={handleDismiss}
      statusBarTranslucent
    >
      <Pressable style={styles.overlay} onPress={handleDismiss}>
        <Pressable
          style={styles.sheetContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <Animated.View
            style={[
              styles.bottomSheet,
              {
                transform: [
                  {
                    translateY: panY.interpolate({
                      inputRange: [0, BOTTOM_SHEET_HEIGHT],
                      outputRange: [0, BOTTOM_SHEET_HEIGHT],
                      extrapolate: "clamp",
                    }),
                  },
                ],
              },
            ]}
          >
            <View
              {...panResponder.panHandlers}
              style={styles.dragHandleContainer}
            >
              <View style={styles.dragHandle} />
            </View>

            <ScrollView
              style={styles.scrollContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.container}>
                <ThemedText type="text2bold">
                  {currentGroup.title} visit
                </ThemedText>
                <ThemedText type="text4gray">
                  Were these vaccines given?
                </ThemedText>

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
                        const isSelected = selections[vaccine.id] === opt.key;
                        return (
                          <TouchableOpacity
                            key={opt.key}
                            style={[
                              styles.optionPill,
                              isSelected && styles.optionPillSelected,
                            ]}
                            onPress={() => selectTiming(vaccine.id, opt.key)}
                          >
                            <Text
                              style={[
                                styles.optionLabel,
                                isSelected && styles.optionLabelSelected,
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
                  <TouchableOpacity onPress={handleDismiss}>
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
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    width: "100%",
  },
  bottomSheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: BOTTOM_SHEET_HEIGHT,
  },
  scrollContainer: {
    maxHeight: BOTTOM_SHEET_HEIGHT - 30,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  dragHandleContainer: {
    paddingTop: 12,
    paddingBottom: 8,
    alignItems: "center",
    width: "100%",
  },
  dragHandle: {
    width: 40,
    height: 4,
    backgroundColor: "#DDD",
    borderRadius: 2,
  },
  container: {
    padding: 20,
    gap: 16,
  },
  vaccineBlock: {
    gap: 8,
  },
  vaccineName: {
    fontSize: 15,
    fontWeight: "600",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  optionPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  optionPillSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionLabel: {
    fontSize: 13,
    color: COLORS.black,
  },
  optionLabelSelected: {
    color: "#FFF",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  laterText: {
    color: COLORS.gray,
    fontSize: 14,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonDisabled: {
    backgroundColor: COLORS.gray4,
  },
  continueText: {
    color: "#FFF",
    fontWeight: "600",
  },
  progress: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.gray,
  },
});
