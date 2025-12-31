import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import SplashScreen from '../screens/SplashScreen';
import PreHome1 from '../screens/PreHome1';
import PreHome2 from '../screens/PreHome2';
import MainNavigator from './MainNavigator';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Main: undefined;
  PreHome1: undefined;
  PreHome2: undefined;
  Game: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


export default function RootNavigator() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, animation:'slide_from_right'}} initialRouteName='Splash'>       
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Main" component={BottomTabNavigator} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="PreHome1" component={PreHome1} />
        <Stack.Screen name="PreHome2" component={PreHome2} />
        <Stack.Screen name='Game' component={MainNavigator}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}