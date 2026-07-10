import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FirstScreen from "../screens/IntroSlider/FirstScreen";
import SplashScreen from "../screens/IntroSlider/SplashScreen";
import AuthNavigator from "./AuthNavigator";
import BottomTabNavigator from "./BottomTabNavigator";
import StackNav from "./StackNav";

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Intro: undefined;
  First: undefined;
  StackNav: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator({
  isAuthenticated,
  hasOnboarded,
}: {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
}) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
        initialRouteName={
          isAuthenticated ? "Main" : hasOnboarded ? "Auth" : "Splash"
        }
      >
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="StackNav" component={StackNav} />
          </>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="First" component={FirstScreen} />
            <Stack.Screen name="Auth" component={AuthNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
