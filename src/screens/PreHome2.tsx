import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import WrapView from '../components/WrapView'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES, FontStyles } from '../constants/THEME'
import images from '../assets/images'
import { ThemedText } from '../constants/ThemedText'
import { useNavigation } from '@react-navigation/native'

const PreHome2 = () => {
  const navigation = useNavigation()
  return (
    <WrapView headerStyle={{ backgroundColor: 'rgba(235, 223, 250, 0.1)' }}>
      <ImageBackground
        style={{ height: SCREEN_HEIGHT * 0.2, width: SCREEN_WIDTH * 1, padding: SIZES.base * 2 }}
        imageStyle={{
          transform: [{ scale: -1 }],
          tintColor: COLORS.accent,
        }}
        source={images.rectangle3}>
        <ThemedText type="text3bold" style={{ marginVertical: SIZES.base }}>
          Pick a Subject and Let’s Play to Learn!
        </ThemedText>
        <ThemedText type="text4" style={{ fontFamily: FontStyles.ABCRegular }}>
          Ready to make learning fun? 🌟
        </ThemedText>
        <ThemedText type="text4" style={{ fontFamily: FontStyles.ABCRegular }}>
          Choose a subject and dive into exciting games that help you learn new things while having
          a great time!
        </ThemedText>
      </ImageBackground>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Main')}>
          <Image source={images.abacus} style={styles.img} />
          <View style={{ width: '60%' }}>
            <ThemedText type="text4bold" style={{ fontWeight: 'bold' }}>
              Math Adventures
            </ThemedText>
            <ThemedText type="text4" style={{ fontFamily: FontStyles.ABCRegular }}>
              Solve puzzles, count treasures, and become a number wizard!
            </ThemedText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Main')}>
          <Image source={images.B} style={styles.img} />
          <View style={{ width: '60%' }}>
            <ThemedText type="text4bold" style={{ fontWeight: 'bold' }}>
              English Adventures
            </ThemedText>
            <ThemedText type="text4" style={{ fontFamily: FontStyles.ABCRegular }}>
              Solve puzzles, count treasures, and become a number wizard!
            </ThemedText>
          </View>
        </TouchableOpacity>
      </View>
    </WrapView>
  )
}

export default PreHome2

const styles = StyleSheet.create({
  row: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding,
    padding: SIZES.base,
    elevation: 2,
    height: SCREEN_HEIGHT * 0.15,
    backgroundColor: 'white',
    borderRadius: SIZES.padding,
  },
  img: {
    height: '90%',
    width: '40%',
    resizeMode: 'contain',
  },
})
