import WrapView from "@/src/components/WrapView";
import { ThemedText } from "@/src/constants/ThemedText";
import React from "react";
import { StyleSheet } from "react-native";
import {COLORS} from '../../../constants/THEME'

const ProfileScreen = () => {
  return (
    <WrapView>
      <ThemedText type="text2bold" style={{ color: COLORS.primary }}>
        Profile
      </ThemedText>
      
    </WrapView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
