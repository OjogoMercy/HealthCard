import WrapView from "@/src/components/WrapView";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { images } from "../../constants/images";
import { SCREEN_WIDTH } from "../../constants/THEME";

const SplashScreen = () => {
  return (
    <WrapView>
      <Image
        source={images.logo}
        style={{ width: SCREEN_WIDTH * 0.4, height: SCREEN_WIDTH * 0.35, resizeMode:'contain' }}
      />
    </WrapView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
