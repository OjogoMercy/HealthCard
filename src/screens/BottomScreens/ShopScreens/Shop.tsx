import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedCustom from '../../../components/AnimatedCustom'
import images from '../../../assets/images'
import { ThemedText } from '../../../constants/ThemedText'
import { SIZES, COLORS, SCREEN_HEIGHT, SCREEN_WIDTH } from '../../../constants/THEME'
import PrimaryButton from '../../../components/PrimaryButton'

// interface Props {
//   id: number
//   quantity: number
//   amount: number
// }
const Shop = () => {
  const month = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
  const [active, setActive] = useState('List')
  const data = Array(15).fill({
    id: Math.random(),
    quantity: 10000,
    amount: 1000,
    time: new Date().toLocaleTimeString('en-US', { hour12: true }),
    date: new Date().toLocaleDateString(),
  })
  const numValue = active === 'List' ? 2 : 1
  return (
    <AnimatedCustom screenTitle="Coin Shop" ribbonShown={true}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: SIZES.padding,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity onPress={() => setActive('List')}>
            <ThemedText
              type="text3bold"
              style={active === 'List' ? styles.active : styles.inactive}>
              Coin List
            </ThemedText>
            {active === 'List' && <View style={styles.line} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActive('history')}>
            <ThemedText
              type="text3bold"
              style={active === 'history' ? styles.active : styles.inactive}>
              Coin History
            </ThemedText>
            {active === 'history' && <View style={styles.line} />}
          </TouchableOpacity>
        </View>
        {active === 'history' && (
          <ThemedText style={{ marginTop: SIZES.padding }}>{month}</ThemedText>
        )}
        <FlatList
          data={data}
          keyExtractor={(id, item) => item.toString()}
          key={active}
          numColumns={numValue}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1, alignItems: 'center' }}>
                {active === 'List' && (
                  <View style={styles.listItem}>
                    <ThemedText style={{ marginTop: SIZES.base * 2 }}>
                      {item.quantity} coins
                    </ThemedText>
                    <Image source={images.coin} style={styles.listImage} />
                    <View style={{ width: '80%' }}>
                      <PrimaryButton
                        title={'N ' + item.amount}
                        style={{
                          height: SIZES.navTitle,
                          width: '100%',
                          padding: SIZES.base,
                          elevation: 5,
                        }}
                      />
                    </View>
                  </View>
                )}
                {active === 'history' && (
                  <View style={styles.historyItem}>
                    <Image source={images.coin} style={styles.coin} />
                    <View>
                      <ThemedText>{item.amount}</ThemedText>
                      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <ThemedText type="text5" style={{ color: COLORS.gray2 }}>
                          {item.time}
                        </ThemedText>
                        <ThemedText type="text5" style={{ color: COLORS.gray2 }}>
                          {item.date}
                        </ThemedText>
                      </View>
                    </View>
                    <View style={{ width: '30%' }}>
                      <PrimaryButton
                        style={{
                          height: SIZES.navTitle,
                          width: '100%',
                          padding: SIZES.base,
                          elevation: 5,
                        }}
                        title={'N' + item.amount}
                      />
                    </View>
                  </View>
                )}
              </View>
            )
          }}
        />
      </View>
    </AnimatedCustom>
  )
}

export default Shop

const styles = StyleSheet.create({
  active: {
    color: 'black',
  },
  inactive: {
    color: COLORS.gray,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.primary,
  },
  listItem: {
    width: '95%',
    borderRadius: SIZES.base,
    borderWidth: 0.3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SIZES.padding,
    height: SCREEN_HEIGHT * 0.23,
  },
  listImage: {
    height: '50%',
    width: '80%',
    resizeMode: 'contain',
  },
  historyItem: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: SIZES.base * 2,
    borderWidth: 0.3,
    borderColor: COLORS.primary,
    height: SCREEN_HEIGHT * 0.085,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    marginTop: SIZES.padding,
    backgroundColor: '#cccccc1a',
  },
  coin: {
    height: SIZES.navTitle,
    width: SIZES.navTitle,
  },
})
