import { StyleSheet, View, Image, Touchable, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import images from '../assets/images'
import { SIZES, SCREEN_HEIGHT, SCREEN_WIDTH, COLORS } from '../constants/THEME'
import { StatusBar } from 'react-native'
import { ThemedText } from '../constants/ThemedText'
import { useNavigation } from '@react-navigation/native'

interface WrapViewProps {
  children: React.ReactNode
  title: string
  authScreen: boolean
  headerStyle?: object
}
const WrapView = ({ title, children, headerStyle }: WrapViewProps) => {
  const navigation = useNavigation<any>()

  return (
    <View style={[styles.container]}>
      <StatusBar barStyle="dark-content" translucent backgroundColor={'transparent'} />
      <View style={[styles.header, headerStyle]}>
        <Image
          source={images.cedu}
          style={{ height: SIZES.navTitle * 3, width: SCREEN_WIDTH * 0.3, resizeMode: 'contain' }}
        />
        <TouchableOpacity style={styles.profile}>
          <Image
            source={images.person}
            style={{ height: SIZES.h2, width: SIZES.h2, resizeMode: 'contain', tintColor: 'white' }}
          />
        </TouchableOpacity>
      </View>

      <View style={{}}>{children}</View>
    </View>
  )
}

export default WrapView

const styles = StyleSheet.create({
  profile: {
    height: SIZES.navTitle,
    width: SIZES.navTitle,
    borderRadius: SIZES.h1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
  },
  container: { flex: 1, alignItems: 'center', backgroundColor: 'white' },
  header: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.h3,
    justifyContent: 'space-between',
    width: SCREEN_WIDTH * 1,
    alignItems: 'center',
  },
})
