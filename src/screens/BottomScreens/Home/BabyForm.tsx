import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const BabyForm = () => {
  const navigation = useNavigation();
  const setBaby = useBabyStore((s) => s.setBaby);
  const stage = useBabyStore((s)=> s.currentStageTitle)

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert(
        "Ehen!",
        "Please enter your baby's name so we can personalize their card.",
      );
      return;
    }

    setBaby({
      name: name,
      dob: date.toISOString(),
    });
    if(stage && stage !== "Birth"){
      navigation.navigate("CatchUpFlow")
    }else{
    navigation.goBack();
    }
  };

  return (
    <WrapView screenTitle="Baby's Profile">
      <View style={styles.container}>
        <ThemedText type="text2bold" style={styles.title}>
          Let’s get started, Mummy!
        </ThemedText>
        <ThemedText type="text4gray" style={styles.subtitle}>
          Tell us a bit about your little one so we can track their drops.
        </ThemedText>

        <View style={styles.inputGroup}>
          <ThemedText type="text4bold" style={styles.label}>
            Baby's Name
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="e.g. Chidi or Amina"
            value={name}
            onChangeText={setName}
            placeholderTextColor={COLORS.gray4}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="text4bold" style={styles.label}>
            Date of Birth
          </ThemedText>
          <TouchableOpacity
            style={styles.dateSelector}
            onPress={() => setShowPicker(true)}
            activeOpacity={0.7}
          >
            <ThemedText type="text3">
              {date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </ThemedText>
            <Ionicons name="calendar" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="spinner"
            maximumDate={new Date()}
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) setDate(selectedDate);
            }}
          />
        )}

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Create HealthCard"
            onPress={handleSave}
            style={{ width: SCREEN_WIDTH * 0.9 }}
          />
          <ThemedText type="text4gray" style={styles.footerText}>
            Don't worry, Ma. You can always change these details later in the
            Profile section.
          </ThemedText>
        </View>
      </View>
    </WrapView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.padding,
    alignItems: "center",
  },
  title: {
    color: COLORS.primary,
    textAlign: "center",
    marginTop: SIZES.base,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: SIZES.padding * 2,
  },
  inputGroup: {
    width: SCREEN_WIDTH * 0.9,
    marginBottom: SIZES.padding,
  },
  label: {
    marginBottom: SIZES.base,
    color: COLORS.primary,
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: SIZES.base,
    backgroundColor: "white",
    paddingHorizontal: SIZES.padding,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: SIZES.base,
    backgroundColor: "white",
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.gray4,
  },
  buttonContainer: {
    width: "100%",
    marginTop: SIZES.padding,
    alignItems: "center",
  },
  footerText: {
    marginTop: SIZES.padding,
    textAlign: "center",
    paddingHorizontal: SIZES.base,
  },
});

export default BabyForm;
