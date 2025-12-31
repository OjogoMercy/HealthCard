import React, { useEffect, useRef } from 'react'
import { StyleSheet, View, FlatList, TouchableOpacity, Dimensions, Animated } from 'react-native'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import Svg, { Path as SvgPath } from 'react-native-svg'
import AnimatedCustom from '../../../components/AnimatedCustom'
import PrimaryButton from '../../../components/PrimaryButton'
import { ThemedText } from '../../../constants/ThemedText'
import { SIZES, COLORS } from '../../../constants/THEME'
import images from '../../../assets/images'

const { width } = Dimensions.get('window')

type LevelItem = {
  id: number
  label: string
  locked: boolean
  offsetX: number
}

const ITEM_HEIGHT = SIZES.navTitle * 3
const PATH_HEIGHT = ITEM_HEIGHT * 1.1
const PATH_WIDTH = width * 0.6

const LEVELS: LevelItem[] = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  label: `Level ${i + 1}`,
  locked: i > 3,
  offsetX: i % 2 === 0 ? -width * 0.18 : width * 0.18,
}))

const BezierPath = ({ left }: { left: boolean }) => {
  const startX = PATH_WIDTH / 2
  const endX = PATH_WIDTH / 2
  const controlX = left ? 0 : PATH_WIDTH

  return (
    <Svg width={PATH_WIDTH} height={PATH_HEIGHT} style={styles.svgPath}>
      <SvgPath
        d={`
          M ${startX} 0
          C ${controlX} ${PATH_HEIGHT / 3},
            ${controlX} ${(PATH_HEIGHT * 2) / 3},
            ${endX} ${PATH_HEIGHT}
        `}
        stroke={COLORS.primary}
        strokeWidth={3}
        fill="none"
        strokeDasharray="6 8"
        strokeLinecap="round"
        opacity={0.5}
      />
    </Svg>
  )
}

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>()
  const currentLevel = 2

  const listRef = useRef<FlatList>(null)
  const bounceAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    setTimeout(() => {
      listRef.current?.scrollToOffset({
        offset: (currentLevel - 1) * ITEM_HEIGHT,
        animated: true,
      })
    }, 400)
  }, [])

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -20,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    ).start()
  }, [])

  const renderItem = ({ item }: { item: LevelItem }) => {
    const isCurrent = item.id === currentLevel
    const isLeft = item.id % 2 === 0

    return (
      <View style={styles.itemContainer}>
        {item.id !== LEVELS.length && <BezierPath left={isLeft} />}

        <View
          style={[
            styles.levelWrapper,
            {
              transform: [{ translateX: item.offsetX }],
              borderColor: isCurrent ? COLORS.primary4 : COLORS.white,
            },
          ]}>
          <TouchableOpacity
            activeOpacity={0.8}
            disabled={item.locked}
            onPress={() => navigation.navigate('Game')}
            style={[
              styles.levelCircle,
              item.locked && styles.lockedLevel,
              isCurrent && styles.currentLevel,
            ]}>
            {isCurrent && (
              <Animated.Image
                source={images.boy}
                style={[styles.character, { transform: [{ translateY: bounceAnim }] }]}
              />
            )}

            <ThemedText type="text5">{item.locked ? '🔒' : item.label}</ThemedText>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <AnimatedCustom playerID="" level="4" animation>
      <View style={styles.container}>
        <FlatList
          ref={listRef}
          data={LEVELS}
          inverted
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />

        <PrimaryButton
          title="Start Game"
          onPress={() => navigation.navigate('Level')}
          style={styles.startButton}
          textStyle={{ fontSize: 12 }}
        />
      </View>
    </AnimatedCustom>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  listContent: {
    paddingBottom: SIZES.navTitle * 2,
    paddingTop: SIZES.navTitle * 6,
    alignItems: 'center',
  },

  itemContainer: {
    alignItems: 'center',
  },

  levelWrapper: {
    marginVertical: SIZES.navTitle * 0.75,
    borderWidth: 3,
    borderColor: COLORS.white,
    borderRadius: SIZES.navTitle * 3,
  },

  levelCircle: {
    width: SIZES.navTitle * 1.8,
    height: SIZES.navTitle * 1.8,
    borderRadius: SIZES.navTitle,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
  },

  lockedLevel: {
    opacity: 0.45,
  },

  currentLevel: {
    borderWidth: 3,
    borderColor: COLORS.primary,
  },

  character: {
    position: 'absolute',
    top: -40,
    height: 55,
    width: 45,
    resizeMode: 'contain',
  },

  svgPath: {
    position: 'absolute',
    top: -PATH_HEIGHT * 0.85,
  },

  startButton: {
    position: 'absolute',
    bottom: SIZES.navTitle,
    alignSelf: 'center',
    width: '35%',
    // height: SIZES.navTitle,
    elevation: 6,
  },
})
