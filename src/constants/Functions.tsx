export const getAgeLabel = (dob: string): string => {
  const birth = new Date(dob);
  const now = new Date();
  const diffInDays = Math.floor(
    (now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );
  const weeks = Math.floor(diffInDays / 7);
  const months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  const years = now.getFullYear() - birth.getFullYear();
  if (weeks < 4) return `${weeks} week${weeks === 1 ? "" : "s"} old`;
  if (months < 24) return `${months} month${months === 1 ? "" : "s"} old`;
  return `${years} year${years === 1 ? "" : "s"} old`;
};

export const calculatePercentile = (value: number, type: string) => {
  // This is a simplified mock - in production, use WHO growth charts
  const percentiles = [
    "<3rd",
    "5th",
    "10th",
    "25th",
    "50th",
    "75th",
    "90th",
    "95th",
    ">97th",
  ];
  const index = Math.floor(Math.random() * percentiles.length);
  return percentiles[index];
};
