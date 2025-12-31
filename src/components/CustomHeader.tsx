import { StyleSheet, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import images from '../assets/images'
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
      style={{ flex: 1, backgroundColor: 'white' }}
      contentContainerStyle={{ alignItems: 'center' }}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Image
        source={images.header}
        style={{
          height: SCREEN_HEIGHT * 0.15,
          width: SCREEN_WIDTH * 1,
          position: 'relative',
          top: 0,
          resizeMode: 'contain',
        }}
      />
      {!authScreen && (
        <View style={{ flexDirection: 'row', width: SCREEN_WIDTH * 0.9, padding: SIZES.base }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
            <Image
              source={images.arrow}
              style={{ height: SIZES.h1 / 1.2, width: SIZES.h1 / 1.2, alignSelf: 'flex-start' }}
            />
          </TouchableOpacity>

          <ThemedText
            type="text2bold"
            style={{
              alignSelf: 'center',
              position: 'absolute',
              left: 0,
              right: 0,
              textAlign: 'center',
            }}>
            {title}
          </ThemedText>
        </View>
      )}
      {tabScreen && (
        <View>
          <Image
            source={images.ribbon}
            style={{ width: SCREEN_WIDTH * 0.5, height: SCREEN_HEIGHT * 0.1 }}
          />
          <ThemedText type="text3" style={{ position: 'absolute', top: 20 }}>
            {screenTitle}
          </ThemedText>
        </View>
      )}

      <View style={{}}>{children}</View>
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
