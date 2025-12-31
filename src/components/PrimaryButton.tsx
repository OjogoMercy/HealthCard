import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants/THEME'
import { ThemedText } from '../constants/ThemedText'

interface PrimaryButtonProps {
  onPress: () => void
  title: string
  style?: object
  textStyle?: object
}

export default function PrimaryButton({ onPress, title, style, textStyle }: PrimaryButtonProps) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} activeOpacity={0.7} style={[styles.button, style]}>
        <ThemedText type="text4white" style={[textStyle]}>
          {title}
        </ThemedText>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.padding,
    padding: SIZES.base * 1.5,
    alignItems: 'center',
    marginVertical: SIZES.base * 2,
 
  },
})
