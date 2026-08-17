import { useMemo, useState } from "react";
import { VaccineData } from "../constants/Database";
import { useBabyStore } from "../store/useBabyStore";
import { openCatchUpGroups } from "./CatchUpDetection";

export function useCatchupPrompt(childId: string, dob: Date) {
  const EMPTY_ARRAY: string[] = [];
  const completedIds = useBabyStore((s) => s.completedIds[childId] ?? EMPTY_ARRAY);
  const declinedIds = useBabyStore((s) => s.declinedIds[childId] ?? EMPTY_ARRAY);
  const [sheetVisible, setSheetVisible] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState<Record<string, boolean>>({});

  const openGroups = useMemo(
    () => openCatchUpGroups(dob, VaccineData, completedIds, declinedIds),
    [dob, completedIds, declinedIds],
  );

  const openVaccineCount = useMemo(
    () => openGroups.reduce((sum, g) => sum + g.vaccines.length, 0),
    [openGroups],
  );

  const triggerIfFirstVisit = () => {
    if (openGroups.length === 0) return;
    if (hasAutoShown[childId]) return;

    setHasAutoShown((prev) => ({ ...prev, [childId]: true }));
    setSheetVisible(true);
  };

  const openManually = () => {
    if (openGroups.length > 0) setSheetVisible(true);
  };

  const dismiss = () => setSheetVisible(false);
  const onAllAnswered = () => setSheetVisible(false);

  return {
    openGroups,
    openVaccineCount,
    sheetVisible,
    triggerIfFirstVisit,
    openManually,
    dismiss,
    onAllAnswered,
  };
}
