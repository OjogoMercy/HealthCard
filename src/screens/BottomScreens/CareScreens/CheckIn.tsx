import CustomHeader from "@/src/components/CustomHeader";
import PrimaryButton from "@/src/components/PrimaryButton";
import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const CheckIn = () => {
  const [checked, setChecked] = React.useState<string[]>([]);
  const age = "6";
  const date = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const data = [
    {
      id: 1,
      vaccine: "OPV 1",
      dueDate: "15th June 2024",
      status: "Due in 7 days",
    },
    {
      id: 2,
      vaccine: "Pentavalent 1",
      dueDate: "15th June 2024",
      status: "Due in 3 days",
    },
    {
      id: 3,
      vaccine: "PCV 1",
      dueDate: "15th June 2024",
      status: "Due in 15 days",
    },
    {
      id: 4,
      vaccine: "Rotavirus 1",
      dueDate: "15th June 2024",
      status: "Due in 15 days",
    },
  ];
  const toggleVaccine = (vaccine: string) => {
    setChecked((prev) =>
      prev.includes(vaccine)
        ? prev.filter((v) => v !== vaccine)
        : [...prev, vaccine],
    );
  };

  return (
    <WrapView title={""} authScreen={false}  >
      <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
        Check-In
      </ThemedText>
      <View style={styles.row}>
        <TouchableOpacity style={styles.profileContainer} activeOpacity={0.5}>
          <Image source={images.baby} style={styles.profileImage} />
        </TouchableOpacity>
        <View style={{ marginRight: "auto" }}>
          <ThemedText
            type="text3bold"
            style={{ color: COLORS.primary, marginRight: "auto" }}
          >
            {" "}
            Michael
          </ThemedText>
          <ThemedText type="text4"> {age} months old</ThemedText>
        </View>

        <TouchableOpacity activeOpacity={0.5}>
          <Ionicons name="chevron-down" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.form,
          {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="calendar-outline" size={24} color={COLORS.primary} />
          <ThemedText type="text4">Visit Date</ThemedText>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ThemedText type="text4bold">{date}</ThemedText>
          <TouchableOpacity
            style={{ marginLeft: SIZES.base }}
            activeOpacity={0.5}
          >
            <Ionicons name="time-outline" size={24} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          styles.form,
          { backgroundColor: COLORS.secondary + "40", elevation: 0 },
        ]}
      >
        <ThemedText type="text3bold">Vaccines Given Today</ThemedText>
        <View>
          <FlatList
            data={data}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingVertical: SIZES.base,
                  }}
                >
                  <ThemedText type="text4">{item.vaccine}</ThemedText>
                  <TouchableOpacity
                    onPress={() => toggleVaccine(item.vaccine)}
                    activeOpacity={0.5}
                  >
                    <Ionicons
                      name={
                        checked.includes(item.vaccine)
                          ? "checkbox"
                          : "square-outline"
                      }
                      size={24}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        </View>

        <PrimaryButton title="Save Check-In" />
      </View>
    </WrapView>
  );
};

export default CheckIn;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: SCREEN_WIDTH * 0.9,
    marginVertical: SIZES.base,
    backgroundColor: COLORS.white,
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    elevation: 2,
  },
  profileContainer: {
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    height: SIZES.navTitle * 1.4,
    width: SIZES.navTitle * 1.4,
  },
  profileImage: {
    height: "90%",
    width: "90%",
    borderRadius: SIZES.padding,
    resizeMode: "cover",
  },
  form: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: "white",
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    marginTop: SIZES.base * 1.5,
    elevation: 2,
  },
});
