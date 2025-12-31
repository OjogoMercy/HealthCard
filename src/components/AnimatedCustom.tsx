import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect } from 'react'
import Animated, {
  useSharedValue,
  Easing,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from 'react-native-reanimated'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from '../constants/THEME'
import images from '../assets/images'
import { ThemedText } from '../constants/ThemedText'
import { useIsFocused, useNavigation } from '@react-navigation/native'
interface Props {
  children: React.ReactElement
  style?: object
  imageStyle?: object
  playerID: string
  level: string
  duration?: number
  animation: boolean
  tabScreen: boolean
  screenTitle: string
  ribbonShown: boolean
  backShown: boolean
}

const AnimatedCustom = ({
  children,
  style,
  imageStyle,
  level,
  playerID,
  animation,
  screenTitle,
  ribbonShown,
  backShown,
}: Props) => {
  const isFocused = useIsFocused()
  const translateX = useSharedValue(0)
  const navigation = useNavigation()
  const imageCount = [1, 2, 3]
  useEffect(() => {
    if (isFocused) {
      translateX.value = withRepeat(
        withTiming(-SCREEN_WIDTH, {
          duration: 8000,
          easing: Easing.linear,
        }),
        -1,
        true,
      )
    } else {
      translateX.value = 0
    }
  }, [isFocused, translateX])
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    }
  })
  return (
    <View style={[styles.outerContainer, style]}>
      <StatusBar backgroundColor={'transparent'} />
      {animation && (
        <Animated.View style={[styles.backgroundContainer, animatedStyle]}>
          <Image source={images.background} style={[styles.backgroundImage, imageStyle]} />
          <Image
            source={images.background2 || images.background}
            style={[styles.backgroundImage, imageStyle]}
          />
        </Animated.View>
      )}

      <View style={[styles.contentLayer, { backgroundColor: animation ? 'transparent' : 'white' }]}>
        <View style={styles.row}>
          {backShown && (
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.arrow}>
              <Image
                source={images.arrow}
                style={{ height: SIZES.h1 / 1.2, width: SIZES.h1 / 1.2, alignSelf: 'flex-start' }}
              />
            </TouchableOpacity>
          )}
          {!backShown && (
            <View style={styles.left}>
              <TouchableOpacity style={styles.profile}>
                <Image source={images.person} style={styles.profileImage} />
              </TouchableOpacity>
              <View style={styles.info}>
                <View style={styles.playerRow}>
                  <ThemedText type="text4white" style={{ color: animation ? 'white' : 'black' }}>
                    Player 654{playerID}
                  </ThemedText>
                  {animation && (
                    <TouchableOpacity style={styles.downButton}>
                      <Image source={images.down} />
                    </TouchableOpacity>
                  )}
                </View>
                <ThemedText
                  type="text4white"
                  style={{
                    color: animation ? 'white' : 'black',
                    marginTop: animation ? 0 : SIZES.base,
                  }}>
                  Level 5{level}
                </ThemedText>
              </View>
            </View>
          )}

          <View style={styles.right}>
            <ImageBackground
              source={animation ? require('../assets/Images/rectangleCon.png') : images.apples}
              style={[styles.rectangle, { paddingLeft: SIZES.base }]}
              imageStyle={{ resizeMode: 'contain' }}>
              {imageCount.map((_, index) => (
                <Image key={index} source={images.heart} style={styles.duplicateImage} />
              ))}
            </ImageBackground>
            <ImageBackground
              source={animation ? require('../assets/Images/rectangleCon.png') : images.apples}
              style={styles.rectangle}
              imageStyle={{ resizeMode: 'contain' }}>
              <Image
                source={images.coin}
                style={[styles.duplicateImage, { resizeMode: 'contain', marginLeft: SIZES.base }]}
              />
              <ThemedText type={animation ? 'text5white' : 'text5'}> 100</ThemedText>
              <TouchableOpacity style={styles.square} onPress={() => navigation.navigate('Shop')}>
                <Text style={styles.plus}>+</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        </View>
        {ribbonShown && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: animation ? 'transparent' : 'white',
              marginTop: SIZES.base,
            }}>
            <Image
              source={images.ribbon}
              style={{
                width: '75%',
                height: SCREEN_HEIGHT * 0.085,
                resizeMode: 'contain',
                marginVertical: SIZES.padding,
              }}
            />
            <ThemedText type="text3white" style={{ position: 'absolute', top: 40 }}>
              {screenTitle}
            </ThemedText>
          </View>
        )}

        <View
          style={{
            padding: SIZES.padding,
            flex: 1,
            backgroundColor: animation ? 'transparent' : 'white',
            marginTop: SIZES.base,
          }}>
          {children}
        </View>
      </View>
    </View>
  )
}

export default AnimatedCustom

const styles = StyleSheet.create({
  outerContainer: {
    overflow: 'hidden',
    flex: 1,
    position: 'relative',
  },
  backgroundContainer: {
    width: SCREEN_WIDTH * 2,
    height: '100%',
    flexDirection: 'row',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  backgroundImage: {
    width: SCREEN_WIDTH,
    height: '100%',
    resizeMode: 'cover',
  },
  contentLayer: {
    flex: 1,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    padding: SIZES.padding * 2,
  },
  profile: {
    height: SIZES.navTitle,
    width: SIZES.navTitle,
    borderRadius: SIZES.h1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.base * 2,
    borderLeftColor: COLORS.primary3,
    borderLeftWidth: 3,
    borderBottomColor: COLORS.primary3,
    borderBottomWidth: 0.5,
  },
  profileImage: {
    height: SIZES.h2,
    width: SIZES.h2,
  },
  row: {
    width: SCREEN_WIDTH * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
    alignSelf: 'center',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
  },
  info: {
    marginLeft: SIZES.base,
  },
  playerRow: {
    flexDirection: 'row',
    marginBottom: -10,
    alignItems: 'center',
  },
  downButton: {
    height: SIZES.h1,
    width: SIZES.h1,
    marginLeft: SIZES.base / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    width: '60%',
  },
  duplicateImage: {
    width: SIZES.h1 * 0.8,
    height: SIZES.h1 * 1,
  },
  rectangle: {
    flex: 1,
    height: SIZES.navTitle * 1.1,
    width: SIZES.navTitle * 3.2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    backgroundColor: COLORS.orange,
    height: SIZES.padding,
    width: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.base,
    position: 'absolute',
    bottom: -5,
    right: 0,
  },
  plus: {
    fontSize: SIZES.h2,
    color: 'white',
  },
  arrow: {
    padding: SIZES.base,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftColor: COLORS.primary3,
    borderLeftWidth: 3,
    borderBottomColor: COLORS.primary3,
    borderBottomWidth: 0.5,
  },
})
