import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AgeCalc from "../constants/AgeCalc";
import HomeScreen from "../screens/BottomScreens/Home/HomeScreen";
import MomProfile from "../screens/BottomScreens/Home/MomProfile";
import EditProfile from "../screens/BottomScreens/Profile/EditProfile";
import VaccineDetails from "../screens/BottomScreens/VaccineScreens/VaccineDetails";
import BabyForm from "../screens/BottomScreens/Home/BabyForm";
import EditMomProfile from "../screens/BottomScreens/Profile/EditMomProfile";
import VaccineHistory from "../screens/BottomScreens/VaccineScreens/VaccineHistory";
import CatchUpFlow from "../screens/BottomScreens/Home/CatchUpFlow";

const Stack = createNativeStackNavigator<StackParamList>();
export type StackParamList = {
  MomProfile: undefined;
  EditProfile: undefined;
  Default: undefined;
  VaccineDetails: undefined;
  VaccineHistory: undefined;
  AgeCalc: undefined;
  BabyForm: undefined;
  EditMomProfile: undefined;
  CatchUpFlow: undefined
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
      <Stack.Screen name="VaccineDetails" component={VaccineDetails} />
      <Stack.Screen name="AgeCalc" component={AgeCalc} />
      <Stack.Screen name="BabyForm" component={BabyForm} />
      <Stack.Screen name="EditMomProfile" component={EditMomProfile} />
      <Stack.Screen name="VaccineHistory" component={VaccineHistory} />
      <Stack.Screen name="CatchUpFlow" component={CatchUpFlow}/>
    </Stack.Navigator>
  );
}
