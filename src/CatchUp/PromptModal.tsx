import React from "react";
import { Image } from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import WrapView from "../components/WrapView";
import { images } from "../constants/images";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";
import { useBabyStore } from "../store/useBabyStore";

interface Props {
  openVaccineCount: number;
  onPress: () => void;
}
const PromptModal = ({ openVaccineCount, onPress }: Props) => {
  function getAgeLabel(dob: string): string {
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
  }

  const activeChild = useBabyStore((s) => s.getActiveChild);
  const baby = activeChild();

  if (!baby) {
    return (
      <WrapView>
        <ThemedText>Theres no baby yet</ThemedText>
      </WrapView>
    );
  }
  if (openVaccineCount === 0) return null;

  return (
    <WrapView>
      <ThemedText>
        We noticed your baby is {getAgeLabel(baby.dateOfBirth)} Recording
        earlier vaccinations helps us keep reminders accurate.
      </ThemedText>
      <Image
        source={images.mascotCry}
        style={{
          width: SCREEN_WIDTH * 0.3,
          height: SCREEN_HEIGHT * 0.25,
          resizeMode: "contain",
        }}
      />
      <PrimaryButton title="Continue" onPress={onPress} />
    </WrapView>
  );
};

export default PromptModal;
