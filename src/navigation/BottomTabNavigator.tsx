import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ClipboardCheck,
  Home,
  ShieldCheck,
  UserCircle,
} from "lucide-react-native";
import React from "react";
import type { ColorValue } from "react-native";
import { Platform } from "react-native";
import { AnimatedIconWrapper } from "../components/AnimatedIconWrapper";
import { COLORS } from "../constants/THEME";
import CheckIn from "../screens/BottomScreens/CareScreens/CheckIn";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";
import ProfileScreen from "../screens/BottomScreens/Profile/ProfileScreen";
import Immunisation from "../screens/BottomScreens/VaccineScreens/Immunisation";
type RootTabParamList = {
  Home: undefined;
  Immunisation: undefined;
  Profile: undefined;
  CheckIn: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function BottomTabNavigator() {
  const activeTintColor: ColorValue = COLORS.primary;
  const inactiveTintColor: ColorValue = "#8e8e93";
  const glowColor = COLORS.secondary + "45";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          marginTop: 4,
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 70 : 90,
          paddingTop: 10,
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconProps = {
            color: color,
            size: 22,
            strokeWidth: focused ? 2.5 : 2,
          };

          return (
            <AnimatedIconWrapper focused={focused} glowColor="#a0f0a4ff">
              {route.name === "Home" && <Home {...iconProps} />}
              {route.name === "CheckIn" && <ClipboardCheck {...iconProps} />}
              {route.name === "Immunisation" && <ShieldCheck {...iconProps} />}
              {route.name === "Profile" && <UserCircle {...iconProps} />}
            </AnimatedIconWrapper>
          );
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
      <Tab.Screen
        name="CheckIn"
        component={CheckIn}
        options={{ title: "Check-In" }}
      />
      <Tab.Screen
        name="Immunisation"
        component={Immunisation}
        options={{ title: "Vaccines" }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
