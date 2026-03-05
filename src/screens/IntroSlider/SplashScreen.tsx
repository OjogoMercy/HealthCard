import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, View } from "react-native";
import { images } from "../../constants/images";
import { SCREEN_WIDTH } from "../../constants/THEME";

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    StatusBar.setBarStyle("dark-content");
    setTimeout(() => {
      navigation.navigate("First");
    }, 1500);
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={images.logo}
        style={{
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_WIDTH * 0.4,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
