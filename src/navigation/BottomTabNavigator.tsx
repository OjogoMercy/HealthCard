import React from 'react'
import { Platform, ColorValue, Image } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import images from '../assets/images'
import ProfileScreen from '../screens/BottomScreens/Profile/ProfileScreen'
import Notifications from '../screens/BottomScreens/NotificationScreens/Notifications'
import LeaderBoard from '../screens/BottomScreens/NotificationScreens/Notifications'
import Shop from '../screens/BottomScreens/VaccineScreens/VaccineScreen'
import { COLORS, SIZES } from '../constants/THEME'
import MainNavigator from './MainNavigator'

type RootTabParamList = {
  Home: undefined
  Shop: undefined
  Profile: undefined
  Notifications: undefined
  Leaderboard: undefined
  Main: undefined
}

const Tab = createBottomTabNavigator<RootTabParamList>()
export default function BottomTabNavigator() {
  const activeTintColor: ColorValue = COLORS.primary
  const inactiveTintColor: ColorValue = '#8e8e93'

  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={({ route }) => ({
        animation: 'fade',
        transitionSpec: {
          animation: 'timing',
          config: {
            duration: 250,
          },
        },
        headerShown: false,
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        tabBarLabelStyle: { paddingBottom: Platform.OS === 'android' ? 2 : 4, fontSize: 10 },
        tabBarStyle: {
          height: Platform.OS === 'android' ? 58 : 80,
          paddingTop: 6,
        },

        tabBarIcon: ({ color }) => {
          let iconSource

          if (route.name === 'Main') {
            iconSource = images.Home
          } else if (route.name === 'Profile') {
            iconSource = images.Profile
          } else if (route.name === 'Notifications') {
            iconSource = images.bell
          } else if (route.name === 'Leaderboard') {
            iconSource = images.trophy
          } else if (route.name === 'Shop') {
            iconSource = images.Cart
          }
          return (
            <Image
              source={iconSource}
              style={{ width: SIZES.h2, height: SIZES.h2, tintColor: color }}
            />
          )
        },
      })}>
      <Tab.Screen name="Main" component={MainNavigator} options={{ title: 'Main' }} />
      <Tab.Screen name="Leaderboard" component={LeaderBoard} options={{ title: 'Leaderboard' }} />

      <Tab.Screen name="Shop" component={Shop} options={{ title: 'Shop' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{ title: 'Notifications' }}
      />
    </Tab.Navigator>
  )
}
