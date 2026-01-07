import PrimaryButton from "@/src/components/PrimaryButton";
import { images } from "@/src/constants/images";
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "@/src/constants/THEME";
import { ThemedText } from "@/src/constants/ThemedText";
import React, { useRef } from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const FirstScreen = ({ onDone }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);

  const slides = [
    {
      key: "1",
      title: "Welcome to HealthCard",
      text: "Your partner in nurturing a healthy, happy child. Supporting you through every step of your childs care",
      image: images.mamaIntro,
      footerText: "Trusted.Simple",
    },
    {
      key: "2",
      title: "Every Child Deserves a Healthy Start",
      text: "Many children face malnutrition and missed healthcare simply because support is hard to access. We’re here to change that.",
      image: images.slide3,
      footerText: "Early Care Matters",
    },
    {
      key: "3",
      title: "Post-Natal Care Shouldn’t End at Birth",
      text: "After delivery, many mothers miss vital follow-ups like growth checks, nutrition tracking, and developmental assessments.",
      image: images.slide2,
      footerText: "Consistency Matters",
    },
    {
      key: "4",
      title: "Built for Busy and Underserved Moms",
      text: "Whether you’re a working mom with little time or a mother with limited internet access, HealthCard is designed to work for you.",
      image: images.slide4,
      footerText: "Care Within Reach",
    },
    {
      key: "5",
      title: "Never Miss a Vaccine Again",
      text: "Your child’s immunization schedule, digitized. Get reminders based on your child’s date of birth, just like the green card, but safer.",
      image: images.slide5,
      footerText: "Get Digital Reminders",
    },
    {
      key: "6",
      title: "Simple Care. Smarter Decisions.",
      text: "Get reminders, track nutrition, and stay informed so you can focus on what matters most: your child’s well-being.",
      image: images.slide6,
      footerText: "Let's Get Started",
    },
  ];

  const renderPagination = (activeIndex) => {
    const isLastSlide = activeIndex === slides.length - 1;

    return (
      <View style={styles.paginationContainer}>
        <View style={styles.paginationDots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === activeIndex && styles.activeDot]}
            />
          ))}
        </View>

        <View style={styles.buttonWrapper}>
          <PrimaryButton
            title={isLastSlide ? "Get Started" : "Next"}
            onPress={() =>{
              if(isLastSlide) {onDone()

              }else{
                 Animated.timing(scrollX, {
            toValue:activeIndex  +1,
            useNativeDriver: true,
            duration:300
          }).start();

          sliderRef.current?.goToSlide(activeIndex + 1);
              }
            }}
            style={{ elevation: 5 }}
          />
        </View>
        <ThemedText
          type="text3bold"
          style={{ fontWeight: "bold" }}
        ></ThemedText>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderPagination={renderPagination}
        onSlideChange={(index) => {
          Animated.timing(scrollX, {
            toValue: index,
            useNativeDriver: true,
            duration:200
          }).start();
        }}
        renderItem={({ item, index }) => {
          const opacity = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 1, 0],
          });

          const translateY = scrollX.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [20, 0, 20],
          });
          return (
            <Animated.View
              style={[styles.slide, { opacity, transform: [{ translateY }] }]}
            >
              <Image source={item.image} style={styles.image} />
              <ThemedText type="text2" style={styles.title}>
                {item.title}
              </ThemedText>
              <ThemedText type="text3" style={styles.description}>
                {item.text}
              </ThemedText>
              <ThemedText
                type="text2bold"
                style={{ color: COLORS.accent, textTransform: "lowercase" }}
              >
                {item.footerText}
              </ThemedText>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  slide: {
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
    paddingTop: SIZES.padding * 3,
    width: SCREEN_WIDTH,
    flex: 1,
  },
  image: {
    resizeMode: "contain",
    width: SIZES.width * 0.7,
    height: SIZES.height * 0.35,
    marginBottom: SIZES.padding,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    marginVertical: SIZES.base,
    fontSize: SCREEN_HEIGHT * 0.032,
  },
  description: {
    color: COLORS.inputText,
    marginVertical: SIZES.base * 2,
  },
  paginationContainer: {
    position: "absolute",
    bottom: SIZES.base,
    left: 0,
    right: 0,
    alignItems: "center",
  },

  paginationDots: {
    flexDirection: "row",
    height: SIZES.base,
    marginVertical: SIZES.padding,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: SIZES.base,
    height: SIZES.base,
    borderRadius: SIZES.base / 2,
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.base / 2,
    opacity: 0.7,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: SIZES.navTitle,
    opacity: 1,
  },
  buttonWrapper: {
    width: SCREEN_WIDTH * 0.85,
    marginVertical: SIZES.padding,
  },
  footerCTA: {
    marginTop: SIZES.padding,
  },
  ctaText: {
    textAlign: "center",
    color: COLORS.inputText,
  },
});
