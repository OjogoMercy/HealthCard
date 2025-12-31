import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import AnimatedCustom from '../../components/AnimatedCustom'
import { ThemedText } from '../../constants/ThemedText'
import { SCREEN_HEIGHT, SCREEN_WIDTH, SIZES } from '../../constants/THEME'
import images from '../../assets/images'
import CustomModal from '../../components/CustomModal'
import { useNavigation } from '@react-navigation/native'

const GameScreen = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  const Questions = [
    {
      id: 1,
      questionText: 'What color do you get when you mix yellow and blue?',
      imageOptions: [images.apple, images.apple2, images.apple3, images.apple5],
      correctAnswerText: 'Green',
      correctImageIndex: 2,
    },
    {
      id: 2,
      questionText: 'If you have 5 apples and give 2 away, how many do you have left?',
      imageOptions: [images.apple3, images.apple5, images.apple, images.apple2],
      correctAnswerText: '3',
      correctImageIndex: 1,
    },
    {
      id: 3,
      questionText: 'Which animal says "Moo"?',
      imageOptions: [images.apple, images.apple2, images.apple3, images.apple5],
      correctAnswerText: 'Cow',
      correctImageIndex: 2,
    },
    {
      id: 4,
      questionText: 'Which shape has three sides?',
      imageOptions: [images.apple, images.apple2, images.apple3, images.apple5],
      correctAnswerText: 'Triangle',
      correctImageIndex: 2,
    },
    {
      id: 5,
      questionText: 'What keeps a bird safe and warm?',
      imageOptions: [images.apple, images.apple2, images.apple3, images.apple5],
      correctAnswerText: 'A nest',
      correctImageIndex: 1,
    },
  ]

  const currentQuestion = Questions[currentQuestionIndex]
const navigation = useNavigation()
  const handleOptionPress = (selectedIndex: number) => {
    const correct = selectedIndex === currentQuestion.correctImageIndex
    setIsAnswerCorrect(correct)
    setModalVisible(true)

    setTimeout(() => {
      setModalVisible(false)
      if (currentQuestionIndex < Questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      } else {
        // @Mercy,, handle the navigation to the preview screen here
        navigation.navigate('PreviewScreen' as never)
        setCurrentQuestionIndex(0)
      }
    }, 1000) // 1 second preview
  }

  return (
    <AnimatedCustom animation={true}>
      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* Question Section */}
        <View style={styles.question}>
          <Image
            source={images.girl}
            style={{
              height: '90%',
              width: '40%',
              marginTop: SIZES.base * 2.5,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: SIZES.base,
            }}>
            <ThemedText type="text4bold">{currentQuestion.questionText}</ThemedText>
          </View>
        </View>

        {/* Select Option Text */}
        <ThemedText
          type="text4bold"
          style={{ fontWeight: 'bold', marginVertical: SIZES.navTitle / 1.3 }}>
          Select Option
        </ThemedText>

        {/* Options */}
        <View style={styles.contain}>
          <FlatList
            data={currentQuestion.imageOptions}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.box}
                onPress={() => handleOptionPress(index)}
                activeOpacity={0.6}>
                <Image
                  source={item}
                  style={{ height: '40%', width: '40%', resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <CustomModal
          correctModalVisible={modalVisible}
          setCorrectModalVisible={setModalVisible}
          isCorrect={isAnswerCorrect}
          Num={0}
        />
      </View>
    </AnimatedCustom>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  question: {
    height: SCREEN_HEIGHT * 0.2,
    width: SCREEN_WIDTH * 0.85,
    borderRadius: SIZES.padding,
    backgroundColor: 'white',
    flexDirection: 'row',
    marginTop: SIZES.navTitle * 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
  },
  contain: {
    width: SCREEN_WIDTH * 0.85,
    height: SCREEN_HEIGHT * 0.4,
    marginTop: SIZES.base,
  },

  box: {
    height: SCREEN_HEIGHT * 0.185,
    width: SCREEN_HEIGHT * 0.185,
    borderRadius: SIZES.base,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    margin: SIZES.base,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
})
