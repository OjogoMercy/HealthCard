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
        style={{ width: SCREEN_WIDTH, height: SCREEN_WIDTH }}
      />
    </WrapView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
