import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import IntroNavigator from './SliderNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  Intro:undefined
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation:'slide_from_right'}} initialRouteName='Intro'>       
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="Intro" component={IntroNavigator} />
    
      </Stack.Navigator>
    </NavigationContainer>
  );
}