import WrapView from "@/src/components/WrapView";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet } from "react-native";
import { images } from "../../constants/images";
import { SCREEN_WIDTH } from "../../constants/THEME";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    setTimeout(() => {
      navigation.navigate("Main");
    }, 1500);
  });

  return (
    <WrapView>
      <Image
        source={images.logo}
        style={{
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_WIDTH * 0.4,
          resizeMode: "contain",
        }}
      />
    </WrapView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
