import React from "react";
import {
  Image,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import WrapView from "../components/WrapView";
import { images } from "../constants/images";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from "../constants/THEME";
import { ThemedText } from "../constants/ThemedText";
import { useBabyStore } from "../store/useBabyStore";

interface Props {
  openVaccineCount: number;
  onPress: () => void;
  close: boolean;
  setClose: () => void;
}
const PromptModal = ({ openVaccineCount, onPress, close, setClose }: Props) => {
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
    <Modal
      onRequestClose={setClose}
      visible={close}
      style={styles.backdrop}
      animationType="slide"
      transparent
      statusBarTranslucent
    >
      <TouchableWithoutFeedback
        onPress={setClose}
        style={{
          flex: 1,
          backgroundColor: COLORS.opacity,
        }}
      >
        <View
          style={{
            height: SCREEN_HEIGHT * 0.5,
            width: "100%",
            backgroundColor: "red",
            padding: SIZES.padding,
          }}
        >
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
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PromptModal;
const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
