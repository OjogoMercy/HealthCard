import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AnimatedCustom from '../../components/AnimatedCustom'

const PreviewScreen = () => {
  return (
    <AnimatedCustom animation={false} screenTitle='Preview' ribbonShown={false} backShown={false} tabScreen={false}>
      <Text>PreviewScreen</Text>
    </AnimatedCustom>
  )
}

export default PreviewScreen

const styles = StyleSheet.create({})