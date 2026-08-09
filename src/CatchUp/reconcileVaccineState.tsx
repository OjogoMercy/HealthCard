import { getImmunisationsByChild } from "@/BackendComm/APIClient";
import { useBabyStore } from "../store/useBabyStore";
import { useSyncQueueStore } from "../store/useQueusStore";

export async function reconcileVaccineState(childId: string, userId: string) {
  try {
    const immunisations = await getImmunisationsByChild(childId, userId);
    const pending = useSyncQueueStore.getState().pending;

    const administeredIds = immunisations
      .filter((imm: any) => imm.administered)
      .map((imm: any) => imm.vaccineId);

    const pendingIds = pending
      .filter((p) => p.childId === childId)
      .map((p) => p.vaccineId);

    const completedIds = Array.from(
      new Set([...administeredIds, ...pendingIds]),
    );

    useBabyStore.getState().setCompletedIds(completedIds);
    return completedIds;
  } catch (e) {
    console.log(e);
  }
}