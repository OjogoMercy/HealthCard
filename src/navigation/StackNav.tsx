import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MomProfile from "../screens/BottomScreens/Home/MomProfile";
import EditProfile from "../screens/BottomScreens/Profile/EditProfile";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";

const Stack = createNativeStackNavigator<StackParamList>();
export type StackParamList = {
  MomProfile: undefined;
  EditProfile: undefined;
  Home:undefined;
};

export default function StackNav() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home">
      <Stack.Screen name="MomProfile" component={MomProfile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Home" component={HomeScreen}/>
    </Stack.Navigator>
  );
}
