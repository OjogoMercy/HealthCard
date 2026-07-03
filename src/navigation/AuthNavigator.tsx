import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ForgotPassword from "../screens/AuthScreens/ForgotPassword";
import LoginScreen from "../screens/AuthScreens/LoginScreen";
import ResetPassword from "../screens/AuthScreens/ResetPassword";
import SignUp from "../screens/AuthScreens/SignUp";
import VerifyOTP from "../screens/AuthScreens/VerifyOTP";
import BottomTabNavigator from "./BottomTabNavigator";

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email?: string } | undefined;
  ResetPassword: { token?: string } | undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
