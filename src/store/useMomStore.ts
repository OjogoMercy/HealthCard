import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface MomProfile {
  userName: string;
  email: string;
  userId: string;
}

interface MomStore {
  mom: MomProfile | null;
  isLoading: boolean;
  error: string | null;

  // Original actions
  setMom: (profile: MomProfile) => void;
  updateMom: (partial: Partial<MomProfile>) => void;
  clearMom: () => void;

  // New refresh actions
  refreshMom: () => Promise<void>;
  fetchMomFromStorage: () => Promise<MomProfile | null>;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMomStore = create<MomStore>()(
  persist(
    (set, get) => ({
      mom: null,
      isLoading: false,
      error: null,

      setMom: (profile: MomProfile) => {
        set({ mom: profile, error: null });
      },

      updateMom: (partial: Partial<MomProfile>) => {
        const current = get().mom;
        if (!current) return;
        set({ mom: { ...current, ...partial }, error: null });
      },

      clearMom: () => set({ mom: null, error: null }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      // Fetch mom data directly from AsyncStorage
      fetchMomFromStorage: async () => {
        try {
          const storedData = await AsyncStorage.getItem(
            "healthcard-mom-storage",
          );
          if (storedData) {
            const parsed = JSON.parse(storedData);
            return parsed.state?.mom || null;
          }
          return null;
        } catch (error) {
          console.error("Error fetching mom from storage:", error);
          return null;
        }
      },

      // Refresh mom data from storage
      refreshMom: async () => {
        const { setLoading, setError, setMom, fetchMomFromStorage } = get();

        setLoading(true);
        setError(null);

        try {
          const momData = await fetchMomFromStorage();

          if (momData) {
            setMom(momData);
          } else {
            set({ mom: null });
          }
        } catch (error) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to refresh mom data";
          setError(errorMessage);
          console.error("Refresh mom error:", error);
        } finally {
          setLoading(false);
        }
      },
    }),
    {
      name: "healthcard-mom-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        mom: state.mom,
        // Don't persist isLoading and error states
      }),
    },
  ),
);
