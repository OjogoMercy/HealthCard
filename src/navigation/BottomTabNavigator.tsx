import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  ClipboardCheck,
  Home,
  ShieldCheck,
  UserCircle,
} from "lucide-react-native";
import React from "react";
import { ColorValue, Platform } from "react-native";
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

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        animation: "fade",
        transitionSpec: {
          animation: "timing",
          config: {
            duration: 200,
          },
        },
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarLabelStyle: {
          paddingBottom: Platform.OS === "android" ? 2 : 4,
          fontSize: 10,
          fontWeight: "500",
        },
        tabBarStyle: {
          height: Platform.OS === "android" ? 65 : 85,
          paddingTop: 8,
          backgroundColor: "white",
          borderTopWidth: 0.5,
          borderTopColor: "#E5E7EB",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
        tabBarIcon: ({ color, size, focused }) => {
          const iconProps = {
            color: color,
            size: size,
            strokeWidth: 2,
            fill: focused ? color : "none",
          };

          switch (route.name) {
            case "Home":
              return <Home {...iconProps} />;
            case "CheckIn":
              return <ClipboardCheck {...iconProps} />;
            case "Immunisation":
              return <ShieldCheck {...iconProps} />;
            case "Profile":
              return <UserCircle {...iconProps} />;
            default:
              return null;
          }
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
