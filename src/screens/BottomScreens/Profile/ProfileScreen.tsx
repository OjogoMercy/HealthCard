import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AnimatedCustom from '../../../components/AnimatedCustom'
import images from '../../../assets/images'
import { ThemedText } from '../../../constants/ThemedText'
import { COLORS, SIZES } from '../../../constants/THEME'
import { useNavigation } from '@react-navigation/native'
const ProfileScreen = () => {
  const statsData = [
    {
      id: 'level',
      label: 'Level',
      value: 28,
      icon: images.trophyBadge,
      backgroundColor: '#F0EFFF',
    },
    {
      id: 'coins',
      label: 'Coins',
      value: 1400,
      icon: images.coin,
      backgroundColor: '#FFFBEA',
    },
    {
      id: 'badge',
      label: 'Badge',
      value: 4,
      icon: images.badge,
      backgroundColor: '#EAF8FF',
    },
  ]
  const arrayImage = Array.from({ length: 20 }, (_, index) => ({
    id: index,
    image: images.badge,
  }))
  const navigation = useNavigation()
  return (
    <AnimatedCustom screenTitle="Profile" ribbonShown={true}>
      <View style={{ alignItems: 'center', marginTop: -SIZES.padding }}>
        <Image source={images.profilePic} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: SIZES.base,
          }}>
          <ThemedText type="text5bold">Player 145</ThemedText>
          <TouchableOpacity
            onPress={() => navigation.navigate('Game', { screen: 'EditProfile' })}
            style={{
              height: SIZES.h3 * 0.9,
              width: SIZES.h3 * 0.9,
              marginBottom: SIZES.base / 2,
              marginLeft: SIZES.base,
            }}>
            <Image source={images.editIcon} style={{ height: '100%', width: '100%' }} />
          </TouchableOpacity>
        </View>
        <ThemedText type="text5bold">Playerdavid@gmail.com</ThemedText>
      </View>
      <View style={styles.statsContainer}>
        {statsData.map(stat => (
          <TouchableOpacity
            activeOpacity={0.5}
            key={stat.id}
            style={[styles.statCard, { backgroundColor: stat.backgroundColor }]}>
            <View style={styles.iconWrapper}>
              <Image source={stat.icon} style={styles.statIcon} />
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <ThemedText type="text5">{stat.label}</ThemedText>
              <ThemedText type="text4bold">{stat.value}</ThemedText>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <ThemedText type="text4bold" style={{ marginVertical: SIZES.base, fontWeight: 'bold' }}>
        Badge Collection
      </ThemedText>
      <FlatList
        data={arrayImage}
        keyExtractor={item => item.id.toString()}
        numColumns={5}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                backgroundColor: COLORS.accent,
                padding: SIZES.base * 1.7,
                borderRadius: SIZES.padding / 2,
                margin: SIZES.base / 2,
              }}>
              <Image source={item.image} />
            </TouchableOpacity>
          )
        }}
      />
    </AnimatedCustom>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: SIZES.padding,
    alignItems: 'center',
  },
  statCard: {
    height: SIZES.navTitle * 2,
    borderRadius: SIZES.base * 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '32%',
    paddingHorizontal: SIZES.base,
  },
  iconWrapper: {
    width: SIZES.h1 * 1.5,
    height: SIZES.h1 * 1.5,
    borderRadius: SIZES.h1 * 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.base,
    elevation: 1,
  },
  statIcon: {
    width: SIZES.h1,
    height: SIZES.h1,
    resizeMode: 'contain',
  },
  statLabel: {
    fontSize: 14,
    color: '#444',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
})
