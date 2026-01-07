import WrapView from "@/src/components/WrapView";
import { images } from "@/src/constants/images";
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from "@/src/constants/THEME";
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
      title: "Every Child Deserves a Healthy Start",
      text: "Many children face malnutrition and missed healthcare simply because support is hard to access. We’re here to change that.",
      image:images.slide3
      },
    {
      key: "3",
      title: "Post-Natal Care Shouldn’t End at Birth",
      text: "After delivery, many mothers miss vital follow-ups like growth checks, nutrition tracking, and developmental assessments.",
      image:images.slide3
      },
      {
        key:'4',
        title:"Built for Busy and Underserved Moms",
        text:"Whether you’re a working mom with little time or a mother with limited internet access, HealthCard is designed to work for you.",
        image:images.slide4,
      },
      {
        key:'5',
        title:"Never Miss a Vaccine Again",
        text:"Your child’s immunization schedule, digitized. Get reminders based on your child’s date of birth, just like the green card, but safer.",
        image:images.slide5,
      },
      {
        key:'6',
        title:'Simple Care. Smarter Decisions.',
        text:'Get reminders, track nutrition, and stay informed—so you can focus on what matters most: your child’s well-being.',
        image:images.slide6
      }
  ];
  return (
    <WrapView>
      <AppIntroSlider
      data={slides}
      renderItem ={({item}) => (
        <View style={styles.slide}>
          <Image source={item.image}/>
          <ThemedText type="text2" style={{color: COLORS.primary}}>{item.title}</ThemedText>
          <ThemedText type="text4" style={{color:COLORS.background}}>{item.text}</ThemedText>
        </View>
      )}
      
      />
    </WrapView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  slide:{
    alignItems:"center",
    padding:SIZES.padding
  }
});
