import WrapScrollView from "@/src/components/WrapScrollView";
import { images } from "@/src/constants/images";
import { COLORS, SIZES } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const VaccineDetails = () => {
  const params = useRoute().params as {
    item: {
      id: string;
      name: string;
      isDone: boolean;
      summary: string;
      preChecklist: string[];
      sideEffects: string[];
      warningSigns: string[];
    };
  };
  const VaccineDetailHeader = () => {
    return (
      <View style={styles.header}>
        {params.item.isDone ? (
          <Image source={images.mascot} style={styles.mascotImage} />
        ) : (
          <Image source={images.mascot} style={styles.mascotImage} />
        )}
        <Text style={styles.title}>{params.item.name}</Text>
      </View>
    );
  };
  return (
    <WrapScrollView screenTitle="Vaccine Details">
      <ThemedText
        type="text3bold"
        style={{
          marginRight: "auto",
          marginVertical: SIZES.padding,
          color: COLORS.primary,
        }}
      >
        Vaccine Name: {params.item.name}
      </ThemedText>
      <ThemedText>{params.item.summary}</ThemedText>
      <ThemedText
        type="text3bold"
        style={{
          marginRight: "auto",
          marginVertical: SIZES.padding,
          color: COLORS.primary,
        }}
      >
        Pre-Checklist:
      </ThemedText>
      {params.item.preChecklist.map((item, index) => (
        <ThemedText key={index} style={{ marginBottom: SIZES.base }}>
          {index + 1}. {item}
        </ThemedText>
      ))}
      <ThemedText
        type="text3bold"
        style={{
          marginRight: "auto",
          marginVertical: SIZES.padding,
          color: COLORS.primary,
        }}
      >
        Side Effects:
      </ThemedText>
      {params.item.sideEffects.map((item, index) => (
        <ThemedText key={index} style={{ marginBottom: SIZES.base }}>
          {" "}
          {index + 1}. {item}
        </ThemedText>
      ))}
      <ThemedText
        type="text3bold"
        style={{
          marginRight: "auto",
          marginVertical: SIZES.padding,
          color: COLORS.primary,
        }}
      >
        Warning Signs:
      </ThemedText>
      {params.item.warningSigns.map((item, index) => (
        <ThemedText key={index} style={{ marginBottom: SIZES.base }}>
          {" "}
          {index + 1}. {item}
        </ThemedText>
      ))}
    </WrapScrollView>
  );
};

export default VaccineDetails;

const styles = StyleSheet.create({});
