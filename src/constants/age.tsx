export const getAgeLabel = (dob: string): string => {
  const birth = new Date(dob);
  const now = new Date();
  
  const diffInTime = now.getTime() - birth.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} old`;
  }

  const weeks = Math.floor(diffInDays / 7);
  if (weeks < 12) {
    return `${weeks} week${weeks === 1 ? "" : "s"} old`;
  }

  const months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (months < 24) {
    return `${months} month${months === 1 ? "" : "s"} old`;
  }

  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} old`;
};