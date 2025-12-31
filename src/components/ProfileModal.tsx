import React, { useState } from 'react'
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  KeyboardTypeOptions,
  StatusBar,
  FlatList,
} from 'react-native'
import images from '../assets/images'
import { COLORS, FontStyles, SCREEN_HEIGHT, SIZES, FONTS } from '../constants/THEME'
import { ThemedText } from '../constants/ThemedText'
import PrimaryButton from './PrimaryButton'

interface ProfileModalProps {
  isVisible: boolean
  onClose: () => void
  onSubmit: (value: string) => void
  initialValue?: string
  title: string
  keyboardType?: KeyboardTypeOptions
  selectIcon: boolean
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  secureTextEntry?: boolean
  confirmPassword?: boolean
  isPasswordField?: boolean
  confirmPasswordValue: string
  onConfirmPasswordChange: (text: string) => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  isVisible,
  onClose,
  onSubmit,
  initialValue = '',
  title,
  keyboardType = 'default',
  selectIcon,
  value,
  onChangeText,
  placeholder,
  confirmPassword,
  isPasswordField = false,
  confirmPasswordValue = '',
  onConfirmPasswordChange = () => {},
}) => {
  const [inputValue, setInputValue] = useState(initialValue)

  const handleConfirm = () => {
    onSubmit(inputValue)
    setInputValue('')
    onClose()
  }

  const handleCancel = () => {
    setInputValue('')
    onClose()
  }
  const arrayImage = Array.from({ length: 12 }, (_, index) => ({
    id: index,
    image: images.girlProfile,
  }))

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={onClose}>
      <StatusBar backgroundColor={COLORS.opacity} />
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {selectIcon && (
              <View
                style={{
                  backgroundColor: '#FFF6E0',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: COLORS.primary,
                    width: '100%',
                    alignItems: 'center',
                    height: '20%',
                    justifyContent: 'center',
                  }}>
                  <ThemedText type="text3boldwhite">Choose Avatar</ThemedText>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: SIZES.base,
                      width: '70%',
                    }}>
                    <View style={styles.line} />
                    <Text style={{ marginTop: -SIZES.base, fontSize: 10 }}>🔷</Text>
                    <View style={styles.line} />
                  </View>
                </View>
                <FlatList
                  data={arrayImage}
                  keyExtractor={item => item.id.toString()}
                  numColumns={4}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    alignItems: 'center',
                    backgroundColor: '#FFF6E0',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginTop: SIZES.base,
                  }}
                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                          margin: SIZES.base,
                        }}>
                        <Image
                          source={item.image}
                          style={{ height: SIZES.h1 * 1.4, width: SIZES.h1 * 1.4 }}
                        />
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
            )}
            {!selectIcon && (
              <View style={[styles.centeredView, { backgroundColor: COLORS.promptBackground }]}>
                <StatusBar backgroundColor={COLORS.opacity} />
                <ThemedText type="text3" style={{ marginVertical: SIZES.padding / 2 }}>
                  {title}
                </ThemedText>

                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor={COLORS.inputText}
                  value={value}
                  onChangeText={onChangeText}
                  style={styles.customInput}
                  keyboardType={keyboardType}
                  underlineColorAndroid={'transparent'}
                />
                {isPasswordField && (
                  <TextInput
                    placeholder="Confirm New Password"
                    placeholderTextColor={COLORS.inputText}
                    value={confirmPasswordValue}
                    onChangeText={onConfirmPasswordChange}
                    style={styles.customInput}
                    secureTextEntry
                    underlineColorAndroid={'transparent'}
                  />
                )}
                <PrimaryButton
                  onPress={onClose}
                  title="Save"
                  style={{ elevation: 5, paddingHorizontal: SIZES.padding * 2 }}
                />
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.opacity,
    width: '100%',
    borderRadius: SIZES.base,
    height: '100%',
  },
  modalView: {
    width: '70%',
    backgroundColor: COLORS.promptBackground,
    borderRadius: SIZES.radius * 2,
    alignItems: 'center',
    borderWidth: 6,
    borderColor: COLORS.primary,
    height: SCREEN_HEIGHT * 0.35,
    paddingVertical: SIZES.navTitle,
  },
  modalImage: {
    width: SIZES.h1,
    height: SIZES.h1,
    marginBottom: SIZES.base,
  },
  line: {
    height: 1,
    backgroundColor: 'white',
    width: '45%',
  },
  customInput: {
    borderRadius: SIZES.padding / 1.5,
    padding: SIZES.base,
    height: SIZES.base * 6.5,
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base,
    ...FONTS.h4,
    backgroundColor: COLORS.promptInput,
    borderWidth: 0,
    borderBottomWidth: 0,
    borderColor: 'transparent',
    width: '90%',
  },
})

export default ProfileModal
