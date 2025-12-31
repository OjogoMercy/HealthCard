import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

import { ThemedText } from '../constants/ThemedText'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from '../constants/THEME'
import images from '../assets/images'
import WrapScrollView from '../components/WrapScrollView'

const PreHome1 = () => {
  const navigation = useNavigation<any>()
  return (
    <WrapScrollView>
      <View style={styles.contain}>
        <Image style={styles.img} source={images.girl} />
        <View style={styles.textWelcomeContainer}>
          <ThemedText type="text4">
            Welcome to CeduGames, Pick your age group to unlock games made just for you. Each level
            is packed with fun challenges that help you learn, think, and play smarter!
          </ThemedText>
        </View>
      </View>
      <ThemedText type="text3bold" style={styles.header}>
        Select your age group
      </ThemedText>
      <TouchableOpacity onPress={() => navigation.navigate('PreHome2')}>
        <ImageBackground
          imageStyle={styles.imageBackgroundStyle}
          source={images.rectangle3}
          style={styles.rectangle}>
          <View style={styles.cardRow}>
            <Image source={images.kids1} style={styles.kids} />
            <View style={styles.cardTextContainer}>
              <ThemedText type="text5bold" style={styles.cardTitle}>
                Age 3-5: Little Explorers
              </ThemedText>
              <ThemedText type="text5">
                Learn through fun and play! Discover colors, shapes, animals, and numbers with
                simple games that make learning exciting and easy to understand.
              </ThemedText>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PreHome2')}>
        <ImageBackground
          imageStyle={styles.imageBackgroundStyle}
          source={images.rectangle2}
          style={styles.rectangle}>
          <View style={styles.cardRow}>
            <Image source={images.kids2} style={styles.kids} />
            <View style={styles.cardTextContainer}>
              <ThemedText type="text5bold" style={styles.cardTitle}>
                Age 6-8: Young Thinkers
              </ThemedText>
              <ThemedText type="text5">
                Solve, build, and explore! Play games that boost your creativity, problem-solving,
                and memory. Learn new words, math tricks, and fun science facts!
              </ThemedText>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('PreHome2')}>
        <ImageBackground
          imageStyle={styles.imageBackgroundStyle}
          source={images.rectangle1}
          style={styles.rectangle}>
          <View style={styles.cardRow}>
            <Image source={images.kids1} style={styles.kids} />
            <View style={styles.cardTextContainer}>
              <ThemedText type="text5bold" style={styles.cardTitle}>
                Age 9-11: Smart Adventurers
              </ThemedText>
              <ThemedText type="text5">
                Challenge your mind! Dive into brain games, quizzes, and creative missions that test
                your logic, teamwork, and curiosity about the world.
              </ThemedText>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </WrapScrollView>
  )
}

export default PreHome1
const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    marginTop: SIZES.padding,
  },
  contain: {
    height: SCREEN_HEIGHT * 0.21,
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.accent,
  },
  textWelcomeContainer: {
    flex: 1,
    padding: SIZES.base,
  },
  img: {
    height: '90%',
    width: '40%',
    marginTop: SIZES.base * 3,
    resizeMode: 'contain',
  },
  rectangle: {
    height: SCREEN_HEIGHT * 0.25,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    marginTop: SIZES.padding,
    justifyContent: 'center',
  },
  imageBackgroundStyle: {
    resizeMode: 'contain',
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  kids: {
    height: '90%',
    width: '40%',
    resizeMode: 'contain',
    marginTop: SIZES.padding,
  },
  cardTextContainer: {
    height: '80%',
    marginLeft: SIZES.padding,
    paddingTop: SIZES.padding,
    paddingRight: SIZES.base,
    width: '62%',
  },
  cardTitle: {
    fontSize: 12,
  },
})
