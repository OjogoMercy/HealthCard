import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SplashScreen from "../screens/IntroSlider/SplashScreen";

import FirstScreen from "../screens/IntroSlider/FirstScreen";
export type StackParamList = {
  SplashScreen: undefined;
  InfoScreen1: undefined;
  InfoScreen2: undefined;
  FirstScreen: undefined;
  SecondScreen: undefined;
  ThirdScreen: undefined;
  VaccineScreen: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

export default function IntroNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />

      <Stack.Screen name="FirstScreen" component={FirstScreen} />

    </Stack.Navigator>
  );
}
