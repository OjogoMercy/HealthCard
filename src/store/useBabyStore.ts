import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VaccineData } from "../constants/Database";

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

export interface BabyProfile {
  name: string;
  dob: string;
  gender?: string;
}

interface BabyStore {
  baby: BabyProfile | null;
  currentStageTitle: string | null;
  currentVaccines: Vaccine[];
  upcomingStage: VaccineCategory | null;
  completedIds: string[];
  setBaby: (profile: BabyProfile) => void;
  markVaccineDone: (vaccineId: string) => void;
  clearBaby: () => void;
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

export const useBabyStore = create<BabyStore>()(
  persist(
    (set, get) => ({
      baby: null,
      currentStageTitle: null,
      currentVaccines: [],
      upcomingStage: null,
      completedIds: [],

      setBaby: (profile: BabyProfile) => {
        const dob = new Date(profile.dob);
        const stageTitle = getStageTitle(dob);
        const matched = VaccineData.find((v) => v.title === stageTitle);
        const upcoming = getUpcomingStage(stageTitle);

        const vaccinesWithStatus = (matched?.data ?? []).map((v) => ({
          ...v,
          isDone: get().completedIds.includes(v.id),
        }));

        set({
          baby: profile,
          currentStageTitle: stageTitle,
          currentVaccines: vaccinesWithStatus,
          upcomingStage: upcoming ?? null,
        });
      },

      markVaccineDone: (vaccineId: string) => {
        set((state) => {
          const newCompletedIds = state.completedIds.includes(vaccineId)
            ? state.completedIds
            : [...state.completedIds, vaccineId];

          const updatedCurrent = state.currentVaccines.map((v) =>
            v.id === vaccineId ? { ...v, isDone: true } : v
          );

          return {
            completedIds: newCompletedIds,
            currentVaccines: updatedCurrent,
          };
        });
      },
// to clear and persist baby info on storage
      clearBaby: () =>
        set({
          baby: null,
          currentStageTitle: null,
          currentVaccines: [],
          upcomingStage: null,
          completedIds: [],
        }),
    }),
    {
      name: "healthcard-baby-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        baby: state.baby,
        completedIds: state.completedIds,
      }),
    }
  )
);