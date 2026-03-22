import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";
import MomProfile from "../screens/BottomScreens/Home/MomProfile";
import EditProfile from "../screens/BottomScreens/Profile/EditProfile";
import SetProfile from "../screens/BottomScreens/Profile/SetProfile";
const Stack = createNativeStackNavigator<StackParamList>();
export type StackParamList = {
  MomProfile: undefined;
  EditProfile: undefined;
  Default: undefined;
  SetProfile: undefined;
};

export default function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Default"
    >
      <Stack.Screen name="MomProfile" component={MomProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Default" component={HomeScreen} />
      <Stack.Screen name="SetProfile" component={SetProfile} />
    </Stack.Navigator>
  );
}
