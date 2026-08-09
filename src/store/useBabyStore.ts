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
  declinedIds: string[];

  // Loading and error states for refresh
  isLoading: boolean;
  refreshError: string | null;

  // Actions
  setChildren: (children: ChildProfile[]) => void;
  setActiveChild: (childId: string) => void;
  setCompletedIds: (ids: string[]) => void;
  markVaccineDone: (
    vaccineId: string,
    childId: string,
    dueDate: Date,
    userId: string,
  ) => void;
  unMarkVaccine: (vaccineId: string) => void;
  clearChildren: () => void;
  clearCatchUpState: () => void;
  markVaccineDeclined: (vaccineId: string) => void;

  getActiveChild: () => ChildProfile | null;

  // New refresh/fetch actions
  refreshBabyData: () => Promise<void>;
  fetchChildrenFromStorage: () => Promise<ChildProfile[]>;
  fetchCompletedIdsFromStorage: () => Promise<string[]>;
  setLoading: (loading: boolean) => void;
  setRefreshError: (error: string | null) => void;
  refreshVaccines: () => Promise<void>;
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
      declinedIds: [],
      isLoading: false,
      refreshError: null,

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
          refreshError: null,
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
          ...vaccineState,
          refreshError: null,
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
          refreshError: null,
        });
      },

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setRefreshError: (error: string | null) => set({ refreshError: error }),

      // Fetch children data directly from AsyncStorage
      fetchChildrenFromStorage: async () => {
        try {
          const storedData = await AsyncStorage.getItem(
            "healthcard-baby-storage",
          );
          if (storedData) {
            const parsed = JSON.parse(storedData);
            return parsed.state?.children || [];
          }
          return [];
        } catch (error) {
          console.error("Error fetching children from storage:", error);
          return [];
        }
      },

      // Fetch completed vaccine IDs from AsyncStorage
      fetchCompletedIdsFromStorage: async () => {
        try {
          const storedData = await AsyncStorage.getItem(
            "healthcard-baby-storage",
          );
          if (storedData) {
            const parsed = JSON.parse(storedData);
            return parsed.state?.completedIds || [];
          }
          return [];
        } catch (error) {
          console.error("Error fetching completed IDs from storage:", error);
          return [];
        }
      },

      // Refresh vaccines for current active child
      refreshVaccines: async () => {
        const {
          activeChildId,
          children,
          setCompletedIds,
          fetchCompletedIdsFromStorage,
        } = get();

        if (!activeChildId) {
          console.warn("No active child to refresh vaccines for");
          return;
        }

        const activeChild = children.find((c) => c.id === activeChildId);
        if (!activeChild) {
          console.warn("Active child not found");
          return;
        }

        try {
          const completedIds = await fetchCompletedIdsFromStorage();

          // Update the state with the new vaccine data
          setCompletedIds(completedIds);
        } catch (error) {
          console.error("Error refreshing vaccines:", error);
          throw error;
        }
      },

      // Main refresh function for all baby data
      refreshBabyData: async () => {
        const {
          setLoading,
          setRefreshError,
          fetchChildrenFromStorage,
          setChildren,
          activeChildId,
          refreshVaccines,
        } = get();

        setLoading(true);
        setRefreshError(null);

        try {
          // Fetch the latest children data from storage
          const childrenData = await fetchChildrenFromStorage();

          if (childrenData.length > 0) {
            // Update children in state
            setChildren(childrenData);

            // If there's an active child, refresh their vaccines
            if (activeChildId) {
              await refreshVaccines();
            }
          } else {
            // No children found - clear the state
            set({
              children: [],
              activeChildId: null,
              currentStageTitle: null,
              currentVaccines: [],
              upcomingStage: null,
              completedIds: [],
            });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to refresh baby data";
          setRefreshError(errorMessage);
          console.error("Refresh baby data error:", error);
          throw error;
        } finally {
          setLoading(false);
        }
      },

      markVaccineDone: (
        vaccineId: string,
        childId: string,
        dueDate: Date,
        userId: string,
      ) => {
        set((state) => {
          if (state.completedIds.includes(vaccineId)) return state;
          const newCompletedIds = [...state.completedIds, vaccineId];
          const updatedVaccines = state.currentVaccines.map((v) =>
            v.id === vaccineId ? { ...v, isDone: true } : v,
          );
          const newDeclinedIds = state.declinedIds?.filter(
            (id) => id !== vaccineId,
          );

          return {
            completedIds: newCompletedIds,
            currentVaccines: updatedVaccines,
            declinedIds: newDeclinedIds,
            refreshError: null,
          };
        });

        useSyncQueueStore.getState().enqueue({
          vaccineId,
          childId,
          dueDate,
          userId: userId,
        });
      },

      markVaccineDeclined: (vaccineId: string) => {
        set((state) => {
          if (state.declinedIds.includes(vaccineId)) return state;
          return {
            declinedIds: [...state.declinedIds, vaccineId],
            refreshError: null,
          };
        });
      },

      clearCatchUpState: () => set({ declinedIds: [] }),

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
            refreshError: null,
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
          declinedIds: [],
          refreshError: null,
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
        completedIds: state.completedIds,
        declinedIds: state.declinedIds,
        // Don't persist loading and error states
      }),
    },
  ),
);
