import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  Animated,
  TouchableWithoutFeedbackComponent,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
import { ThemedText } from '../constants/ThemedText'
import { COLORS, SIZES, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/THEME'
import { StatusBar } from 'react-native'
import images from '../assets/images'
import { useSharedValue } from 'react-native-reanimated'
interface ModalProps {
  correctModalVisible: boolean
  setCorrectModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  Num: number
  isCorrect: boolean
}

const CustomModal = ({
  correctModalVisible,
  setCorrectModalVisible,
  Num,
  isCorrect,
}: ModalProps) => {
  const translateY = useSharedValue(300)
  useEffect(() => {
    if (correctModalVisible) {
      const timer = setTimeout(() => {
        setCorrectModalVisible(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [correctModalVisible, setCorrectModalVisible])

  // const fadeAnim = useRef(new Animated.Value(0)).current
  //  useEffect(() => {
  //   if (correctModalVisible) {
  //     Animated.timing(fadeAnim, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     Animated.timing(fadeAnim, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  //  }, [correctModalVisible, fadeAnim]);
  // if (!correctModalVisible) {
  //   return null
  // }

  return (
    <Modal
      visible={correctModalVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => setCorrectModalVisible(false)}>
      <TouchableWithoutFeedback onPress={() => setCorrectModalVisible(false)}>
        <View style={styles.modalBackdrop}>
          <StatusBar backgroundColor={'rgba(255, 255, 255, 0.5)'} />
          <View style={[styles.modalContent, { backgroundColor: 'white' }]}>
            <Image
              source={images.ribbon}
              style={{ height: SIZES.padding * 2.5, width: '120%', marginTop: -SIZES.base }}
            />
            <ThemedText type="text2bold" style={{ color: 'white', position: 'absolute', top: 10 }}>
              Question {Num}
            </ThemedText>
            <Image
              source={images.ModalBg}
              style={{ height: SCREEN_HEIGHT * 0.23, width: SCREEN_WIDTH * 0.7 }}
            />
            <ThemedText
              type="text1bold"
              style={{ fontWeight: 'bold', position: 'absolute', bottom: 80 }}>
              Correct!
            </ThemedText>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                position: 'absolute',
                bottom: 50,
              }}>
              <View style={styles.line} />
              <Text style={{ marginTop: -SIZES.base }}>🔷</Text>
              <View style={styles.line} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default CustomModal

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: '#ffffff80',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: SCREEN_WIDTH * 0.7,
    borderRadius: SIZES.padding,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    borderColor: COLORS.primary,
    borderWidth: 5,
    height: SCREEN_HEIGHT * 0.28,
  },
  line: {
    height: 1,
    backgroundColor: 'black',
    width: '40%',
  },
})
