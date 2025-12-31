import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import AnimatedCustom from '../../../components/AnimatedCustom'
import images from '../../../assets/images'
import { ThemedText } from '../../../constants/ThemedText'
import { SIZES, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/THEME'
import PrimaryButton from '../../../components/PrimaryButton'

interface props {}
const LeaderBoard = () => {
  const statsData = Array(10).fill({
    id: 4,
    Level: 13,
    value: 28,
    amount: '500,000',
  })
  return (
    <AnimatedCustom animation={false}>
      <View style={styles.dashboard}>
        <View style={styles.container}>
          <Image source={images.profilePic} style={styles.profile} />
          <View style={styles.con}>
            <Image
              source={images.secondPlace}
              style={[styles.place, { marginTop: -SIZES.base / 2, marginBottom: -SIZES.base / 2 }]}
            />
            <View style={styles.content}>
              <Image source={images.secondTrophy} style={{ marginBottom: -SIZES.base }} />
              <ThemedText type="text5bold" style={{ fontSize: 10 }}>
                Player 123
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 9 }}>
                Level 3
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 8 }}>
                357,000
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Image source={images.crown} />
          <Image source={images.girlProfile} style={styles.profile} />
          <View style={styles.con}>
            <Image
              source={images.firstPlace}
              style={[styles.place, { marginBottom: -SIZES.base }]}
            />

            <View style={styles.content}>
              <Image source={images.firstTrophy} style={{ marginLeft: SIZES.base }} />
              <ThemedText type="text5bold" style={{ marginLeft: SIZES.base * 2 }}>
                Player 123
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 10, marginLeft: SIZES.base * 2 }}>
                Level 3
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 10, marginLeft: SIZES.base * 2 }}>
                357,000
              </ThemedText>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <Image source={images.profilePic} style={styles.profile} />
          <View style={styles.con}>
            <Image source={images.thirdPlace} style={styles.place} />
            <View style={styles.content}>
              <Image
                source={images.thirdTrophy}
                style={{ height: SIZES.h1, width: SIZES.h1, resizeMode: 'contain' }}
              />
              <ThemedText type="text5bold" style={{ fontSize: 8, marginBottom: -SIZES.base }}>
                Player 123
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 8, marginBottom: -SIZES.base }}>
                Level 3
              </ThemedText>
              <ThemedText type="text5bold" style={{ fontSize: 8, marginBottom: -SIZES.base }}>
                357,000
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
      <FlatList
        data={statsData}
        contentContainerStyle={{ paddingVertical: SIZES.padding }}
        renderItem={({ item }) => {
          return (
            <View style={styles.leaderBoard}>
              <ThemedText>#{item.id}</ThemedText>
              <View style={styles.user}>
                <Image source={images.userFill} />
              </View>
              <View style={{ marginLeft: SIZES.padding }}>
                <ThemedText type="text4bold">Player 36</ThemedText>
                <View style={styles.profileText}>
                  <ThemedText type="text5">Level {item.Level}</ThemedText>
                </View>
              </View>
              <ThemedText type="text4" style={{ marginLeft: 'auto' }}>
                {item.amount}
              </ThemedText>
            </View>
          )
        }}
      />
    </AnimatedCustom>
  )
}
export default LeaderBoard
const styles = StyleSheet.create({
  dashboard: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    elevation: 4,
    borderRadius: SIZES.padding,
    backgroundColor: 'white',
    alignItems: 'flex-end',
    height: SCREEN_HEIGHT * 0.25,
  },
  profile: {
    height: SIZES.navTitle * 1.5,
    width: SIZES.navTitle * 1.5,
    marginBottom: -SIZES.padding / 1.2,
    zIndex: 2,
  },
  container: {
    alignItems: 'center',
    width: '33%',
    justifyContent: 'flex-end',
  },
  content: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
  },
  place: {
    width: '100%',
    resizeMode: 'contain',
  },
  con: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: -SIZES.base / 2,
  },
  leaderBoard: {
    flexDirection: 'row',
    width: '100%',
    height: SCREEN_HEIGHT * 0.085,
    borderRadius: SIZES.padding,
    alignItems: 'center',
    padding: SIZES.base * 2,
    marginTop: SIZES.base,
    backgroundColor: '#cccccc1a',
    borderWidth: 0.3,
    borderColor: COLORS.primary,
  },
  user: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.padding,
    borderLeftColor: COLORS.primary3,
    borderLeftWidth: 3,
    borderBottomColor: COLORS.primary3,
    borderBottomWidth: 0.5,
    marginLeft: SIZES.base * 2,
  },
  profileText: {
    backgroundColor: COLORS.primary2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.base,
  },
})
