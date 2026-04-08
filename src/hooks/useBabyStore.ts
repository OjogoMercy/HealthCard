import { create } from 'zustand';
import { VaccineData } from '@/src/constants/Database';

interface Baby {
id: string;
name: string;
dob: string;
}

interface VaccineCategory {
title: string;
data: Array<{
id: string;
name: string;
summary: string;
isDone: boolean;
}>;
}

interface BabyStore {
baby: Baby | null;
currentVaccines: VaccineCategory | null;
setBaby: (name: string, dob: string) => void;
clearBaby: () => void;
getTargetTitle: (dob: string) => string | null;
}

export const useBabyStore = create<BabyStore>((set) => {
const getTargetTitle = (dob: string): string | null => {
if (!dob) return null;

const birthDate = new Date(dob);
const now = new Date();
const diffInDays = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
const weeks = Math.floor(diffInDays / 7);
const months = Math.floor(diffInDays / 30);
const years = Math.floor(diffInDays / 365);

if (weeks < 6) return "Birth";
if (weeks >= 6 && weeks < 10) return "6 Weeks";
if (weeks >= 10 && weeks < 14) return "10 Weeks";
if (weeks >= 14 && months < 6) return "14 Weeks";
if (months >= 6 && months < 9) return "6 Months";
if (months >= 9 && months < 12) return "9 Months";
if (months >= 12 && months < 15) return "12 Months";
if (months >= 15 && years < 9) return "15 Months";
if (years >= 9) return "9–13 Years";

return null;
};

return {
baby: null,
currentVaccines: null,
setBaby: (name: string, dob: string) => {
const babyId = Date.now().toString();
const targetTitle = getTargetTitle(dob);
const matchedCategory = VaccineData.find((item) => item.title === targetTitle);

set({
baby: { id: babyId, name, dob },
currentVaccines: matchedCategory || null,
});
},
clearBaby: () => {
set({ baby: null, currentVaccines: null });
},
getTargetTitle,
};
});
```