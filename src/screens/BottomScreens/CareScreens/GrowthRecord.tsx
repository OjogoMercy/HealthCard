import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { ThemedText } from "@/src/constants/ThemedText";
import { useBabyStore } from "@/src/store/useBabyStore";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
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
  const [headCircumference, setHeadCircumference] = useState("");
  const [bmi, setBmi] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedDate, setSelectedDate] = useState(date);
  const [isMetric, setIsMetric] = useState(true); // true for metric, false for imperial

  // Baby's age in months for percentile calculations
  const ageInMonths = baby ? getAgeInMonths(baby.dateOfBirth) : 0;

  // Mock growth data - in real app, this would come from store
  const [growthHistory] = useState([
    { date: "2024-12-01", weight: 8.5, height: 72, headCircumference: 44 },
    { date: "2024-11-15", weight: 8.2, height: 71, headCircumference: 43.5 },
    { date: "2024-11-01", weight: 7.9, height: 70, headCircumference: 43 },
  ]);

  // Get last recorded values
  const lastRecord = growthHistory[growthHistory.length - 1];

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
    // Validation
    if (!weight && !height && !headCircumference) {
      Alert.alert("Error", "Please enter at least one measurement");
      return;
    }

    // In real app, save to store/backend
    const growthData = {
      date: selectedDate,
      weight: weight ? parseFloat(weight) : null,
      height: height ? parseFloat(height) : null,
      headCircumference: headCircumference
        ? parseFloat(headCircumference)
        : null,
      bmi: bmi ? parseFloat(bmi) : null,
      notes: notes,
      ageInMonths: ageInMonths,
    };

    console.log("Saving growth data:", growthData);
    Alert.alert("Success", "Growth record saved successfully!", [
      {
        text: "OK",
        onPress: () => {
          // Reset form
          setWeight("");
          setHeight("");
          setHeadCircumference("");
          setBmi("");
          setNotes("");
        },
      },
    ]);
  };

  return (
    <WrapView screenTitle="Growth Record">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Baby Profile Header */}
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

        {/* Last Recorded Stats */}
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
              <View style={styles.lastRecordItem}>
                <Ionicons
                  name="analytics-outline"
                  size={20}
                  color={COLORS.primary}
                />
                <ThemedText type="text4bold">
                  {lastRecord.headCircumference} cm
                </ThemedText>
              </View>
            </View>
          </View>
        )}

        {/* Unit Toggle */}
        <View style={styles.unitToggleContainer}>
          <ThemedText type="text4" style={{ marginRight: SIZES.base }}>
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

        {/* Growth Metrics Form */}
        <View style={styles.formContainer}>
          <View style={styles.rowBetween}>
            <ThemedText type="text3bold">Record Measurements</ThemedText>
            <ThemedText type="text4gray">{selectedDate}</ThemedText>
          </View>

          {/* Weight */}
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

          {/* Head Circumference */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="analytics-outline"
                size={20}
                color={COLORS.primary}
              />
              <ThemedText type="text4bold" style={styles.inputLabelText}>
                Head Circumference
              </ThemedText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={isMetric ? "e.g., 44" : "e.g., 17.3"}
                keyboardType="decimal-pad"
                value={headCircumference}
                onChangeText={setHeadCircumference}
                placeholderTextColor="#999"
              />
              <ThemedText type="text4gray">{isMetric ? "cm" : "in"}</ThemedText>
            </View>
          </View>

          {/* BMI (Optional) */}
          <View style={styles.inputGroup}>
            <View style={styles.inputLabel}>
              <Ionicons
                name="calculator-outline"
                size={20}
                color={COLORS.primary}
              />
              <ThemedText type="text4bold" style={styles.inputLabelText}>
                BMI (Optional)
              </ThemedText>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="e.g., 16.5"
                keyboardType="decimal-pad"
                value={bmi}
                onChangeText={setBmi}
                placeholderTextColor="#999"
              />
              <ThemedText type="text4gray">kg/m²</ThemedText>
            </View>
          </View>

          {/* Notes */}
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
            <ThemedText type="text4bold" style={styles.percentileTitle}>
              Growth Percentiles
            </ThemedText>
            <View style={styles.percentileGrid}>
              <View style={styles.percentileItem}>
                <ThemedText type="text4gray">Weight</ThemedText>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {weight
                    ? calculatePercentile(
                        parseFloat(weight),
                        "weight",
                        ageInMonths,
                      )
                    : "--"}
                </ThemedText>
              </View>
              <View style={styles.percentileItem}>
                <ThemedText type="text4gray">Height</ThemedText>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {height
                    ? calculatePercentile(
                        parseFloat(height),
                        "height",
                        ageInMonths,
                      )
                    : "--"}
                </ThemedText>
              </View>
              <View style={styles.percentileItem}>
                <ThemedText type="text4gray">Head</ThemedText>
                <ThemedText type="text3bold" style={{ color: COLORS.primary }}>
                  {headCircumference
                    ? calculatePercentile(
                        parseFloat(headCircumference),
                        "head",
                        ageInMonths,
                      )
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

// Helper Functions
const getAgeInMonths = (dateOfBirth: string | number | Date) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let months = (today.getFullYear() - birthDate.getFullYear()) * 12;
  months -= birthDate.getMonth();
  months += today.getMonth();
  return months <= 0 ? 0 : months;
};

const getAgeLabel = (dateOfBirth: string | number | Date) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years}y ${months}m`;
  } else if (months > 0) {
    return `${months}m ${days}d`;
  } else {
    return `${days}d`;
  }
};

// Mock percentile calculation - replace with actual WHO growth data
const calculatePercentile = (
  value: number,
  type: string,
  ageInMonths: number,
) => {
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

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: SIZES.padding * 2,
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
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  profileContainer: {
    marginRight: SIZES.base,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
  },
  historyButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SIZES.base,
    paddingVertical: SIZES.base / 2,
    backgroundColor: COLORS.primary + "10",
    borderRadius: SIZES.radius,
  },
  lastRecordContainer: {
    backgroundColor: "white",
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    padding: SIZES.base,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.base,
  },
  unitToggle: {
    paddingHorizontal: SIZES.base * 1.5,
    paddingVertical: SIZES.base / 2,
    borderRadius: SIZES.radius,
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
    borderRadius: SIZES.radius,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
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
    borderColor: "#E0E0E0",
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
  },
  input: {
    flex: 1,
    paddingVertical: SIZES.base,
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.base,
    paddingTop: SIZES.base,
  },
  percentileContainer: {
    backgroundColor: COLORS.secondary + "10",
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.base,
  },
  percentileTitle: {
    marginBottom: SIZES.base,
    textAlign: "center",
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
