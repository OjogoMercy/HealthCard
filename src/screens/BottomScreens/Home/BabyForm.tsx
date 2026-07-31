import { createChild } from "@/BackendComm/APIClient";
import PrimaryButton from "@/src/components/PrimaryButton";
import { useToast } from "@/src/components/ToastContext";
import WrapView from "@/src/components/WrapView";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

const BabyForm = () => {
  const navigation = useNavigation();
  const setChildren = useBabyStore((s) => s.setChildren);
  const children = useBabyStore((s) => s.children);

  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [gender, setGender] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();
  const handleSave = async () => {
    if (!name.trim() || !date || !gender) {
      showToast("Please enter the child's full details", "error");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const isDuplicate = children.some(
      (child) =>
        child.name.toLowerCase().trim() === name.toLowerCase().trim() &&
        new Date(child.dateOfBirth).toDateString() === date.toDateString(),
    );

    if (isDuplicate) {
      showToast(
        "A child with this name and date of birth already exists",
        "warning",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const newChild = await createChild(name.trim(), date, gender);
      setChildren([...children, newChild]);

      setName("");
      setDate(new Date());
      setGender(null);
      setShowPicker(false);

      showToast("Child record created successfully", "success");

      console.log(newChild);
      navigation.goBack();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to add child");
      showToast("Failed to create child record. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <WrapView screenTitle="Baby's Profile">
      <View style={styles.container}>
        <ThemedText type="text2bold" style={styles.title}>
          Let's get started, Mummy!
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
            placeholderTextColor={COLORS.gray + "90"}
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
            <ThemedText type="text3" style={{ color: COLORS.gray + "90" }}>
              {date.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </ThemedText>
            <Ionicons
              name="calendar-outline"
              size={20}
              color={COLORS.primary}
            />
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

        <View style={styles.inputGroup}>
          <ThemedText type="text4bold" style={styles.label}>
            Gender
          </ThemedText>
          <View style={styles.genderContainer}>
            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "Male" && styles.genderOptionSelected,
              ]}
              onPress={() => setGender("Male")}
            >
              <Ionicons
                name="male-outline"
                size={24}
                color={gender === "Male" ? COLORS.primary : COLORS.gray}
              />
              <ThemedText
                type="text3"
                style={gender === "Male" && styles.genderTextSelected}
              >
                Male
              </ThemedText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderOption,
                gender === "Female" && styles.genderOptionSelected,
              ]}
              onPress={() => setGender("Female")}
            >
              <Ionicons
                name="female-outline"
                size={24}
                color={gender === "Female" ? COLORS.primary : COLORS.gray}
              />
              <ThemedText
                type="text3"
                style={gender === "Female" && styles.genderTextSelected}
              >
                Female
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={isSubmitting ? "Creating..." : "Create HealthRecord"}
            onPress={handleSave}
            loading={isSubmitting}
            style={{ width: SCREEN_WIDTH * 0.9 }}
          />
          {error && (
            <ThemedText type="text4" style={styles.errorText}>
              {error}
            </ThemedText>
          )}
          <ThemedText type="text4gray" style={{ textAlign: "center" }}>
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
    borderRadius: SIZES.h3,
    backgroundColor: "white",
    paddingHorizontal: SIZES.padding,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  dateSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    height: 55,
    borderRadius: SIZES.h3,
    backgroundColor: "white",
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  genderOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    height: 55,
    borderRadius: SIZES.h3,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    marginHorizontal: 4,
    gap: 8,
  },
  genderOptionSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + "10",
  },
  genderTextSelected: {
    color: COLORS.primary,
    fontWeight: "bold",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginTop: SIZES.base,
    textAlign: "center",
  },
});

export default BabyForm;
