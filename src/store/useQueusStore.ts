import { createImmunisation } from "@/BackendComm/APIClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PendingImmunisation {
  queueId: string;
  vaccineId: string;
  childId: string;
  dueDate: Date;
}

interface SyncQueueStore {
  pending: PendingImmunisation[];
  isSyncing: boolean;
  enqueue: (entry: Omit<PendingImmunisation, "queueId">) => void;
  flush: () => Promise<void>;
}

export const useSyncQueueStore = create<SyncQueueStore>()(
  persist(
    (set, get) => ({
      pending: [],
      isSyncing: false,

      enqueue: (entry) => {
        const queueId = `${entry.childId}-${entry.vaccineId}-${Date.now()}`;
        set((state) => ({
          pending: [...state.pending, { ...entry, queueId }],
        }));
      },

      flush: async () => {
        const { pending, isSyncing } = get();
        if (isSyncing || pending.length === 0) return;

        set({ isSyncing: true });

        for (const entry of pending) {
          try {
            await createImmunisation({
              vaccineId: entry.vaccineId,
              childId: entry.childId,
              dueDate: entry.dueDate,
              userId: "",
            });
            // success — remove just this entry
            set((state) => ({
              pending: state.pending.filter((p) => p.queueId !== entry.queueId),
            }));
          } catch (e) {
            console.warn(
              "[SyncQueue] Failed to sync entry, will retry later",
              entry.queueId,
            );
          }
        }

        set({ isSyncing: false });
      },
    }),
    {
      name: "healthcard-sync-queue",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
