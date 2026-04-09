import { create } from "zustand";
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
}

interface BabyStore {
  // ── State ──
  baby: BabyProfile | null;
  currentStageTitle: string | null;
  currentVaccines: Vaccine[];
  upcomingStage: VaccineCategory | null;

  // ── Actions ──
  setBaby: (profile: BabyProfile) => void;
  markVaccineDone: (vaccineId: string) => void;
  clearBaby: () => void;
}

// for age calculation 
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

// ─── Upcoming stage helper ────────────────────────────────────────────────────

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

// ─── Store ────────────────────────────────────────────────────────────────────

export const useBabyStore = create<BabyStore>((set, get) => ({
  // initial state 
  baby: null,
  currentStageTitle: null,
  currentVaccines: [],
  upcomingStage: null,

  // Set baby profile and calculate stage immediately 
  setBaby: (profile: BabyProfile) => {
    const dob = new Date(profile.dob);
    const stageTitle = getStageTitle(dob);
    const matched = VaccineData.find((v) => v.title === stageTitle);
    const upcoming = getUpcomingStage(stageTitle);

    set({
      baby: profile,
      currentStageTitle: stageTitle,
      currentVaccines: matched?.data ?? [],
      upcomingStage: upcoming ?? null,
    });
  },

  // mark vaccines done by ID 
  markVaccineDone: (vaccineId: string) => {
    const { currentVaccines } = get();
    const updated = currentVaccines.map((v) =>
      v.id === vaccineId ? { ...v, isDone: true } : v
    );
    set({ currentVaccines: updated });
  },

  //clear everything and reset 
  clearBaby: () =>
    set({
      baby: null,
      currentStageTitle: null,
      currentVaccines: [],
      upcomingStage: null,
    }),
}));