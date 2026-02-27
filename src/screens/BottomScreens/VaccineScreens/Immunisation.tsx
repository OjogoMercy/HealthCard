import CustomHeader from "@/src/components/CustomHeader";
import { COLORS } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import React from "react";
import { StyleSheet,View } from "react-native";

const Immunisation = () => {
  return (
    <CustomHeader>
      <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
        Vaccination Timeline
      </ThemedText>
      <View style={styles.bigCard}>

      </View>
    </CustomHeader>
  );
};

export default Immunisation;

const styles = StyleSheet.create({});
