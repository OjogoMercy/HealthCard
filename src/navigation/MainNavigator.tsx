import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import GameScreen from '../screens/Main/GameScreen'
import EditProfile from '../screens/Main/EditProfile'
import HomeScreen from '../screens/BottomScreens/Home/HomeScreen'
import PreviewScreen from '../screens/Main/PreviewScreen'

const Stack = createNativeStackNavigator<MainStackParamList>()

export type MainStackParamList = {
  Level: undefined
  EditProfile: undefined
  Home: undefined
  PreviewScreen: undefined
}
const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Home'>
      <Stack.Screen name="Level" component={GameScreen} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator

const styles = StyleSheet.create({})
