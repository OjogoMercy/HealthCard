import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MomProfile {
  fullName: string;
  email: string;
  phone: string;
  photoUri?: string;
}

interface MomStore {
  mom: MomProfile | null;
  setMom: (profile: MomProfile) => void;
  updateMom: (partial: Partial<MomProfile>) => void;
  clearMom: () => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useMomStore = create<MomStore>()(
  persist(
    (set, get) => ({
      mom: null,

      // ── Set full profile (used on registration / first setup) ──
      setMom: (profile: MomProfile) => {
        set({ mom: profile });
      },

      // ── Update individual fields without wiping the rest ──
      updateMom: (partial: Partial<MomProfile>) => {
        const current = get().mom;
        if (!current) return;
        set({ mom: { ...current, ...partial } });
      },

      // ── Clear on logout ──
      clearMom: () => set({ mom: null }),
    }),
    {
      name: "healthcard-mom-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mom: state.mom,
      }),
    }
  )
);