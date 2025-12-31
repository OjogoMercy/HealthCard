import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import AnimatedCustom from '../../../components/AnimatedCustom'
import { ThemedText } from '../../../constants/ThemedText'
import { COLORS, SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from '../../../constants/THEME'

interface Props {
  id: number
  text: string
  date: string
}
const Notifications = (Props: any) => {
  const Notitication = Array(5).fill({
    id: Math.random(),
    text: 'Lorem ipsum dolor sit amet consectetur. Ullamcorper potenti facilisis mauris at magna enim urna consectetur dui. Scelerisque facilisis',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  })
  return (
    <AnimatedCustom screenTitle="Notifications" playerID="142" level="2" ribbonShown={true}>
      <ThemedText type="text3bold">October 2025</ThemedText>
      <FlatList
        data={Notitication}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity style={styles.container} activeOpacity={0.4}>
              <ThemedText type="text4">{item.text}</ThemedText>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemedText type="text6" style={{ color: COLORS.gray }}>
                  {item.time}
                </ThemedText>
                <ThemedText type="text6" style={{ color: COLORS.gray }}>
                  {item.date}
                </ThemedText>
              </View>
            </TouchableOpacity>
          )
        }}
      />
    </AnimatedCustom>
  )
}

export default Notifications

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: SIZES.base,
    borderWidth: 0.3,
    borderColor: COLORS.primary,
    padding: SIZES.padding / 3,
    marginTop: SIZES.base,
    backgroundColor: 'rgba(116, 118, 116, 0.05)',
  },
})
