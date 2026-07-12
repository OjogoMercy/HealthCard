import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { VaccineData } from "../constants/Database";
import { useSyncQueueStore } from "./useQueusStore";

export interface ChildProfile {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  userId: string;
}

export interface Vaccine {
  id: string;
  name: string;
  isDone: boolean;
  summary: string;
  preChecklist: string[];
  sideEffects: string[];
  warningSigns: string[];
}

export interface VaccineCategory {
  title: string;
  status: string;
  data: Vaccine[];
}
const getAgeInWeeks = (dob: Date): number =>
  Math.floor((Date.now() - dob.getTime()) / (1000 * 60 * 60 * 24 * 7));

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
  const hasHadBirthday =
    now.getMonth() > dob.getMonth() ||
    (now.getMonth() === dob.getMonth() && now.getDate() >= dob.getDate());
  return hasHadBirthday ? years : years - 1;
};

const getStageTitle = (dob: Date): string => {
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

const getUpcomingStage = (currentTitle: string): VaccineCategory | null => {
  const currentIndex = STAGE_ORDER.indexOf(currentTitle);
  const nextTitle = STAGE_ORDER[currentIndex + 1];
  if (!nextTitle) return null;
  return VaccineData.find((v) => v.title === nextTitle) ?? null;
};

// Derives vaccine stage data from a child's DOB and completed vaccine IDs
const deriveVaccineState = (
  dob: string,
  completedIds: string[],
): {
  currentStageTitle: string;
  currentVaccines: Vaccine[];
  upcomingStage: VaccineCategory | null;
} => {
  const dobDate = new Date(dob);
  const stageTitle = getStageTitle(dobDate);
  const matched = VaccineData.find((v) => v.title === stageTitle);
  const upcoming = getUpcomingStage(stageTitle);

  const vaccinesWithStatus = (matched?.data ?? []).map((v) => ({
    ...v,
    isDone: completedIds.includes(v.id),
  }));

  return {
    currentStageTitle: stageTitle,
    currentVaccines: vaccinesWithStatus,
    upcomingStage: upcoming ?? null,
  };
};

interface BabyStore {
  // Children data
  children: ChildProfile[];
  activeChildId: string | null;
  currentStageTitle: string | null;
  currentVaccines: Vaccine[];
  upcomingStage: VaccineCategory | null;

  completedIds: string[];

  // Actions
  setChildren: (children: ChildProfile[]) => void;
  setActiveChild: (childId: string) => void;
  setCompletedIds: (ids: string[]) => void;
  markVaccineDone: (vaccineId: string, childId: string, dueDate: Date) => void;
  unMarkVaccine: (vaccineId: string) => void;
  clearChildren: () => void;

  getActiveChild: () => ChildProfile | null;
}

export const useBabyStore = create<BabyStore>()(
  persist(
    (set, get) => ({
      children: [],
      activeChildId: null,
      currentStageTitle: null,
      currentVaccines: [],
      upcomingStage: null,
      completedIds: [],

      setChildren: (children: ChildProfile[]) => {
        const { activeChildId, completedIds } = get();

        // Determine which child to make active:
        // 1. Keep the previously active child if they still exist
        // 2. Fall back to the first child in the list
        const validActiveId =
          activeChildId && children.find((c) => c.id === activeChildId)
            ? activeChildId
            : (children[0]?.id ?? null);

        const activeChild = children.find((c) => c.id === validActiveId);
        const vaccineState = activeChild
          ? deriveVaccineState(activeChild.dateOfBirth, completedIds)
          : {
              currentStageTitle: null,
              currentVaccines: [],
              upcomingStage: null,
            };

        set({
          children,
          activeChildId: validActiveId,
          ...vaccineState,
        });
      },

      setActiveChild: (childId: string) => {
        const { children, completedIds } = get();
        const activeChild = children.find((c) => c.id === childId);

        if (!activeChild) {
          console.warn(
            "[useBabyStore] setActiveChild: child not found:",
            childId,
          );
          return;
        }
        const vaccineState = deriveVaccineState(
          activeChild.dateOfBirth,
          completedIds,
        );

        set({
          activeChildId: childId,
          completedIds: [],
          ...vaccineState,
        });
      },

      // Called after fetching immunisation records from backend for active child
      setCompletedIds: (ids: string[]) => {
        const { children, activeChildId } = get();
        const activeChild = children.find((c) => c.id === activeChildId);

        if (!activeChild) return;

        const vaccineState = deriveVaccineState(activeChild.dateOfBirth, ids);

        set({
          completedIds: ids,
          ...vaccineState,
        });
      },

      markVaccineDone: (vaccineId: string, childId: string, dueDate: Date) => {
        set((state) => {
          if (state.completedIds.includes(vaccineId)) return state;
          const newCompletedIds = [...state.completedIds, vaccineId];
          const updatedVaccines = state.currentVaccines.map((v) =>
            v.id === vaccineId ? { ...v, isDone: true } : v,
          );

          return {
            completedIds: newCompletedIds,
            currentVaccines: updatedVaccines,
          };
        });

        useSyncQueueStore.getState().enqueue({ vaccineId, childId, dueDate });
      },

      unMarkVaccine: (vaccineId: string) => {
        set((state) => {
          const newCompletedIds = state.completedIds.filter(
            (id) => id !== vaccineId,
          );
          const updatedVaccines = state.currentVaccines.map((v) =>
            v.id === vaccineId ? { ...v, isDone: false } : v,
          );

          return {
            completedIds: newCompletedIds,
            currentVaccines: updatedVaccines,
          };
        });
      },

      clearChildren: () =>
        set({
          children: [],
          activeChildId: null,
          currentStageTitle: null,
          currentVaccines: [],
          upcomingStage: null,
          completedIds: [],
        }),

      getActiveChild: () => {
        const { children, activeChildId } = get();
        return children.find((c) => c.id === activeChildId) ?? null;
      },
    }),
    {
      name: "healthcard-baby-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        children: state.children,
        activeChildId: state.activeChildId,
      }),
    },
  ),
);
