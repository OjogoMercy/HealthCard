import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/IntroSlider/SplashScreen';
import InfoScreen1 from '../screens/IntroSlider/InfoScreen1';
import InfoScreen2 from '../screens/IntroSlider/InfoScreen2';
import FirstScreen from '../screens/IntroSlider/FirstScreen';
import SecondScreen from '../screens/IntroSlider/SecondScreen';
import ThirdScreen from '../screens/IntroSlider/ThirdScreen';
import VaccineScreen from '../screens/IntroSlider/VaccineScreen';

export type StackParamList = {
    SplashScreen: undefined;
    InfoScreen1: undefined;
    InfoScreen2: undefined;
    FirstScreen: undefined;
    SecondScreen: undefined;
    ThirdScreen: undefined;
    VaccineScreen: undefined;
}


const Stack = createNativeStackNavigator<StackParamList>();

export default function IntroNavigator() {
    return(
        <Stack.Navigator initialRouteName='SplashScreen' screenOptions={{headerShown:false}}>
            <Stack.Screen name='SplashScreen' component={SplashScreen}/>
            <Stack.Screen name='InfoScreen1' component={InfoScreen1}/>
            <Stack.Screen name='InfoScreen2' component={InfoScreen2}/>
            <Stack.Screen name='FirstScreen' component={FirstScreen}/>
            <Stack.Screen name='SecondScreen' component={SecondScreen}/>
            <Stack.Screen name='ThirdScreen' component={ThirdScreen}/>
            <Stack.Screen name='VaccineScreen' component={VaccineScreen}/>
        </Stack.Navigator>
    )
}