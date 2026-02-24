import { StyleSheet, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { images } from '../constants/images'
import { SIZES, SCREEN_HEIGHT, SCREEN_WIDTH, COLORS } from '../constants/THEME'
import { StatusBar } from 'react-native'
import { ThemedText } from '../constants/ThemedText'
import { useNavigation } from '@react-navigation/native'
interface CustomHeaderProps {
  children: React.ReactNode
  title: string
  authScreen: boolean
  tabScreen: boolean
  screenTitle: string
}

const CustomHeader = ({
  children,
  title,
  authScreen,
  tabScreen,
  screenTitle,
}: CustomHeaderProps) => {
  const navigation = useNavigation<any>()
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <View style={{flex: 1, width: SCREEN_WIDTH,padding:SIZES.padding*1.2,alignItems:'center'}}>{children}</View>
    </ScrollView>
  )
}

export default CustomHeader

const styles = StyleSheet.create({
  arrow: {
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
