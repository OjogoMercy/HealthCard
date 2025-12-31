import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignUp from '../screens/AuthScreens/SignUp';
import ForgotPassword from '../screens/AuthScreens/ForgotPassword';
import VerifyOTP from '../screens/AuthScreens/VerifyOTP';
import ResetPassword from '../screens/AuthScreens/ResetPassword';

export type AuthStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  VerifyOTP: { email?: string } | undefined;
  ResetPassword: { token?: string } | undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator initialRouteName="SignUp" screenOptions={{ headerShown: false,animation:"slide_from_right" }} >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}