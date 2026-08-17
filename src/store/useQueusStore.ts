import { createImmunisation } from "@/BackendComm/APIClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface PendingImmunisation {
  queueId: string;
  vaccineId: string;
  childId: string;
  dueDate: Date;
  userId: string;
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

        // Auto-trigger flush when a new item is added
        if (!get().isSyncing) {
          get().flush();
        }
      },

      flush: async () => {
        const { isSyncing, pending } = get();
        if (isSyncing || pending.length === 0) return;

        set({ isSyncing: true });

        const queueToProcess = [...get().pending];

        for (const entry of queueToProcess) {
          try {
            await createImmunisation({
              vaccineId: entry.vaccineId,
              childId: entry.childId,
              dueDate: new Date(entry.dueDate),
              userId: entry.userId,
            });
            console.log("sync successful");

            // Remove successfully synced item
            set((state) => ({
              pending: state.pending.filter((p) => p.queueId !== entry.queueId),
            }));
          } catch (e) {}
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
