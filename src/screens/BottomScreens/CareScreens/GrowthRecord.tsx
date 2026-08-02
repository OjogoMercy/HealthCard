import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { calculatePercentile, getAgeLabel } from "@/src/constants/Functions";
import { images } from "@/src/constants/images";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

import { useToast } from "@/src/components/ToastContext";
import {
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "../../../constants/THEME";

const GrowthRecord = () => {
  const navigation = useNavigation<any>();
  const active = useBabyStore((s) => s.getActiveChild);
  const baby = active();
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // State for growth metrics
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(date);
  const [isMetric, setIsMetric] = useState(true); // true for metric, false for imperial

  const [growthHistory] = useState([
    { date: "2024-12-01", weight: 8.5, height: 72 },
    { date: "2024-11-15", weight: 8.2, height: 71 },
    { date: "2024-11-01", weight: 7.9, height: 70 },
  ]);

  // Get last recorded values
  const lastRecord = growthHistory[growthHistory.length - 1];
  const { showToast } = useToast();
  if (!baby) {
    return (
      <WrapView screenTitle="Growth Record">
        <View style={styles.emptyContainer}>
          <Image
            source={images.mascotWaving}
            style={{
              width: SCREEN_WIDTH * 0.6,
              height: SCREEN_HEIGHT * 0.32,
              resizeMode: "contain",
              marginBottom: SIZES.padding,
            }}
          />

          <ThemedText type="text2bold">
            Let's start your baby's journey
          </ThemedText>

          <ThemedText
            type="text4gray"
            style={{ textAlign: "center", marginVertical: SIZES.h5 }}
          >
            Create a baby profile to begin tracking growth, vaccinations,
            nutrition, and developmental milestones.
          </ThemedText>

          <PrimaryButton
            title="Create Baby Record"
            onPress={() =>
              navigation.navigate("StackNav", { screen: "BabyForm" })
            }
            style={{ width: SCREEN_WIDTH * 0.8, marginBottom: -SIZES.h1 * 3 }}
          />
        </View>
      </WrapView>
    );
  }
  const handleSave = () => {
    if (!weight && !height) {
      showToast("Please enter at least one measurement", "error");
      return;
    }

    const growthData = {
      date: selectedDate,
      weight: weight ? parseFloat(weight) : null,
      height: height ? parseFloat(height) : null,
      notes: notes,
    };

    console.log("Saving growth data:", growthData);
    showToast("Growth record saved successfully!", "success");
  };
  return (
    <WrapView screenTitle="Growth Record">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.row}>
          <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
            <Image source={images.baby} style={styles.profileImage} />
          </TouchableOpacity>
          <View style={{ marginRight: "auto", marginLeft: SIZES.base }}>
            <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
              {baby.name}
            </ThemedText>
            <ThemedText type="text4gray">
              {getAgeLabel(baby.dateOfBirth)}
            </ThemedText>
          </View>
          <TouchableOpacity
            style={styles.historyButton}
            onPress={() => navigation.navigate("GrowthHistory")}
          >
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
            <ThemedText
              type="text4"
              style={{ color: COLORS.primary, marginLeft: 4 }}
            >
              History
            </ThemedText>
          </TouchableOpacity>
        </View>

        {lastRecord && (
          <View style={styles.lastRecordContainer}>
            <ThemedText type="text4bold" style={{ marginBottom: 8 }}>
              Last Recorded ({new Date(lastRecord.date).toLocaleDateString()})
            </ThemedText>
            <View style={styles.lastRecordGrid}>
              <View style={styles.lastRecordItem}>
                <Ionicons
                  name="barbell-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <ThemedText type="text4bold">{lastRecord.weight} kg</ThemedText>
              </View>
              <View style={styles.lastRecordItem}>
                <Ionicons
                  name="resize-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <ThemedText type="text4bold">{lastRecord.height} cm</ThemedText>
              </View>
            </View>
          </View>
        )}

        <View style={styles.unitToggleContainer}>
          <ThemedText
            type="text4bold"
            style={{ marginRight: SIZES.base, color: COLORS.primary }}
          >
            Units:
          </ThemedText>
          <TouchableOpacity
            style={[styles.unitToggle, isMetric && styles.unitToggleActive]}
            onPress={() => setIsMetric(true)}
          >
            <ThemedText
              type="text4"
              style={isMetric && styles.unitToggleTextActive}
            >
              Metric
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitToggle, !isMetric && styles.unitToggleActive]}
            onPress={() => setIsMetric(false)}
          >
            <ThemedText
              type="text4"
              style={!isMetric && styles.unitToggleTextActive}
            >
              Imperial
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.rowBetween}>
            <ThemedText type="text3">Record Measurements</ThemedText>
            <ThemedText type="text4gray">{selectedDate}</ThemedText>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="barbell-outline"
                size={20}
                color={COLORS.primary}
              />
              <ThemedText type="text4bold" style={styles.inputLabelText}>
                Weight
              </ThemedText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={isMetric ? "e.g., 8.5" : "e.g., 18.7"}
                keyboardType="decimal-pad"
                value={weight}
                onChangeText={setWeight}
                placeholderTextColor="#999"
              />
              <ThemedText type="text4gray">
                {isMetric ? "kg" : "lbs"}
              </ThemedText>
            </View>
          </View>

          {/* Height/Length */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="resize-outline"
                size={20}
                color={COLORS.primary}
              />
              <ThemedText type="text4bold" style={styles.inputLabelText}>
                Height / Length
              </ThemedText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={isMetric ? "e.g., 72" : "e.g., 28.3"}
                keyboardType="decimal-pad"
                value={height}
                onChangeText={setHeight}
                placeholderTextColor="#999"
              />
              <ThemedText type="text4gray">{isMetric ? "cm" : "in"}</ThemedText>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="document-text-outline"
                size={20}
                color={COLORS.primary}
              />
              <ThemedText type="text4bold" style={styles.inputLabelText}>
                Notes (Optional)
              </ThemedText>
            </View>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Any additional notes..."
              multiline
              numberOfLines={3}
              value={notes}
              onChangeText={setNotes}
              placeholderTextColor="#999"
              textAlignVertical="top"
            />
          </View>

          {/* Percentile Info */}
          <View style={styles.percentileContainer}>
            <ThemedText type="text3bold" style={styles.percentileTitle}>
              Growth Percentiles
            </ThemedText>
            <View style={styles.percentileGrid}>
              <View style={styles.percentileItem}>
                <ThemedText type="text4gray">Weight</ThemedText>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {weight
                    ? calculatePercentile(parseFloat(weight), "weight")
                    : "--"}
                </ThemedText>
              </View>
              <View style={styles.percentileItem}>
                <ThemedText type="text4gray">Height</ThemedText>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {height
                    ? calculatePercentile(parseFloat(height), "height")
                    : "--"}
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <PrimaryButton
            title="Save Growth Record"
            onPress={handleSave}
            style={styles.saveButton}
          />
        </View>
      </ScrollView>
    </WrapView>
  );
};
const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SIZES.padding * 2,
    width: SCREEN_WIDTH * 0.9,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    backgroundColor: "white",
    borderRadius: SIZES.h3,
    marginVertical: SIZES.h4,
  },
  profileContainer: {
    marginRight: SIZES.base,
  },
  profileImage: {
    width: SIZES.h1 * 1.7,
    height: SIZES.h1 * 1.7,
    borderRadius: SIZES.h1,
    resizeMode: "cover",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    backgroundColor: COLORS.primary + "20",
    borderRadius: SIZES.h4,
  },
  lastRecordContainer: {
    backgroundColor: "white",
    padding: SIZES.padding,
    borderRadius: SIZES.h4,
    marginBottom: SIZES.base,
    width: "98%",
  },
  lastRecordGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  lastRecordItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  unitToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: SIZES.h5,
    borderRadius: SIZES.h4,
    marginBottom: SIZES.base,
    width: "98%",
  },
  unitToggle: {
    paddingHorizontal: SIZES.base * 1.5,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.h5,
    marginHorizontal: 4,
  },
  unitToggleActive: {
    backgroundColor: COLORS.primary,
  },
  unitToggleTextActive: {
    color: "white",
  },
  formContainer: {
    backgroundColor: "white",
    padding: SIZES.padding,
    borderRadius: SIZES.h4,
    width: "98%",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SIZES.padding,
  },
  inputGroup: {
    marginBottom: SIZES.base * 1.5,
  },
  inputLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  inputLabelText: {
    marginLeft: SIZES.base / 2,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.h4,
    paddingHorizontal: SIZES.base,
  },
  input: {
    flex: 1,
    paddingVertical: SIZES.h5,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: SIZES.h1 * 4,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: COLORS.gray2,
    borderRadius: SIZES.h5,
    paddingHorizontal: SIZES.base,
    paddingTop: SIZES.base,
  },
  percentileContainer: {
    backgroundColor: COLORS.secondary + "20",
    padding: SIZES.padding,
    borderRadius: SIZES.h4,
    marginVertical: SIZES.base,
  },
  percentileTitle: {
    marginBottom: SIZES.base,
    textAlign: "center",
    color: COLORS.primary,
  },
  percentileGrid: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  percentileItem: {
    alignItems: "center",
  },
  saveButton: {
    marginTop: SIZES.base,
  },
});

export default GrowthRecord;
