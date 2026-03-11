import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";
import MomProfile from "../screens/BottomScreens/Home/MomProfile";
import EditProfile from "../screens/BottomScreens/Profile/EditProfile";
import setProfile from "../screens/BottomScreens/Profile/setProfile";

const Stack = createNativeStackNavigator<StackParamList>();
export type StackParamList = {
  MomProfile: undefined;
  EditProfile: undefined;
  Default: undefined;
  setProfile: undefined;
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
      <Stack.Screen name="setProfile" component={setProfile} />
    </Stack.Navigator>
  );
}
