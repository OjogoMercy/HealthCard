import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import React from "react";
import { StyleSheet } from "react-native";

const FirstScreen = () => {
  import React, { useState } from "react";
  import { View, Text, Image, StyleSheet, Alert } from "react-native";
  import AppIntroSlider from "react-native-app-intro-slider";

  const slides = [
    {
      key: "1",
      title: "Welcome to HealthCard",
      text: "Your Partner In Nurturing A Healthy ,Happy Child. Supporting you through every step of your childs care",
      image:images.mamaIntro
      },
    {
      key: "2",
      title: "Explore Features",
      text: "Discover amazing features that make our app stand out",
      image:images.slide3
      },
    {
      key: "3",
      title: "Get Started",
      text: "Start using our app and enjoy the benefits it offers",
      image:images.mamaIntro
      },
  ];
  return (
    <WrapView>
      <Image
        source={images.mamaIntro}
        style={{
          height: SCREEN_HEIGHT * 0.4,
          width: SCREEN_WIDTH * 0.8,
          resizeMode: "contain",
        }}
      />
      <ThemedText type="text2bold"></ThemedText>
      <ThemedText type="text4">
        {" "}
      </ThemedText>
      <ThemedText type="text3bold" style={{ color: COLORS.accent }}>
        Trusted.Simple
      </ThemedText>
    </WrapView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({});
