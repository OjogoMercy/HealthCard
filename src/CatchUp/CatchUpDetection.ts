const STAGE_OFFSET_DAYS: Record<string, number> = {
  Birth: 0,
  "6 Weeks": 42,
  "10 Weeks": 70,
  "14 Weeks": 98,
  "6 Months": 182,
  "9 Months": 273,
  "12 Months": 365,
  "15 Months": 456,
  "9–13 Years": 3287,
};

export interface VaccineGroup {
  title: string;
  status: string;
  data: { id: string; name: string; [key: string]: any }[];
}
export interface OpenCatchupGroup {
  title: string;
  dueDate: Date;
  vaccines: { id: string; name: string }[];
}

function addDays(days: number, date: Date) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function openCatchUpGroups(
  dob: Date,
  schedule: VaccineGroup[],
  completedIds: string[],
  declinedIds: string[],
  today: Date = new Date(),
): OpenCatchupGroup[] {
  const answered = new Set([...completedIds, ...declinedIds]);
  const openedGroups: OpenCatchupGroup[] = [];

  for (const group of schedule) {
    const offsetDays = STAGE_OFFSET_DAYS[group.title];
    if (offsetDays === undefined) continue;
    const dueDate = addDays(offsetDays, dob);
    if (dueDate > today) continue;

    const openVaccines = group.data.filter((v) => !answered.has(v.id));
    if (openVaccines.length > 0) {
      openedGroups.push({
        title: group.title,
        dueDate,
        vaccines: openVaccines.map((v) => ({
          id: v.id,
          name: v.name,
        })),
      });
    }
  }
  return openedGroups;
}

export function hasOpenCatchupQuestions(
  dob: Date,
  schedule: VaccineGroup[],
  completedIds: string[],
  declinedIds: string[],
  today: Date = new Date(),
): boolean {
  return (
    openCatchUpGroups(dob, schedule, completedIds, declinedIds, today).length >
    0
  );
}

export type ApproximateTime = "on_time" | "within_week" | "not_received";

export function returnApproximateTime(dueDate: Date, timing: ApproximateTime) {
  if (timing === "not_received") return null;
  if (timing === "on_time") return dueDate;
  if (timing === "within_week") return addDays(3, dueDate);
  return null;
}
