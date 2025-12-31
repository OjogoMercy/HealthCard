import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AnimatedCustom from '../../components/AnimatedCustom'
import images from '../../assets/images'
import { ThemedText } from '../../constants/ThemedText'
import { SIZES, COLORS, SCREEN_HEIGHT } from '../../constants/THEME'
import { useNavigation } from '@react-navigation/native'
import ProfileModal from '../../components/ProfileModal'

const EditProfile = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const [promptVisible, setPromptVisible] = useState(false)
  const [selectedField, setSelectedField] = useState(null)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [DOB, setDOB] = useState('')
  const [phoneNo, setPhoneNo] = useState('')
  const [username, setUsername] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigation = useNavigation()
  const userProfileFields = [
    { id: 'email', label: 'Email', value: 'danieldavid@gmail.com' },
    { id: 'username', label: 'Username', value: 'Player 123' },
    { id: 'phone_number', label: 'Phone Number', value: '(555) 123-4567' },
    { id: 'password', label: 'Password', value: '********' },
    { id: 'date_of_birth', label: 'Date of Birth', value: '01/15/1990' },
  ]
  const getFieldValue = fieldId => {
    switch (fieldId) {
      case 'email':
        return email
      case 'username':
        return username
      case 'phone_number':
        return phoneNo
      case 'password':
        return password
      case 'date_of_birth':
        return DOB
      default:
        return ''
    }
  }
  const getFieldSetter = fieldId => {
    switch (fieldId) {
      case 'email':
        return setEmail
      case 'username':
        return setUsername
      case 'phone_number':
        return setPhoneNo
      case 'password':
        return setPassword
      case 'date_of_birth':
        return setDOB
      default:
        return () => {}
    }
  }
  const handleEditPress = item => {
    setSelectedField(item)
    setPromptVisible(true)
  }

  return (
    <AnimatedCustom ribbonShown={true} screenTitle="Edit Profile" backShown={true}>
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
            onPress={() => setModalVisible(true)}
            style={{
              height: SIZES.h3 * 0.9,
              width: SIZES.h3 * 0.9,
              marginBottom: SIZES.base / 2,
              marginLeft: SIZES.base,
            }}>
            <Image source={images.editIcon} style={{ height: '100%', width: '100%' }} />
          </TouchableOpacity>
        </View>
        <ProfileModal
          isVisible={modalVisible}
          onClose={setModalVisible}
          selectIcon={true}
          onSubmit={undefined}
        />
        <ThemedText type="text5bold">Playerdavid@gmail.com</ThemedText>
      </View>
      <FlatList
        data={userProfileFields}
        renderItem={({ item }) => {
          return (
            <View style={styles.listItem}>
              <View>
                <ThemedText type="text4bold" style={{ fontWeight: 'bold' }}>
                  {item.label}
                </ThemedText>
                <ThemedText type={'text5'} style={{ color: COLORS.gray2 }}>
                  {item.value}
                </ThemedText>
              </View>
              <TouchableOpacity style={styles.user} onPress={() => handleEditPress(item)}>
                <Image source={images.editIcon} style={{ tintColor: 'white' }} />
              </TouchableOpacity>
            </View>
          )
        }}
      />
      <ProfileModal
        title={'Edit ' + (selectedField?.label || '')}
        isVisible={promptVisible}
        onClose={() => setPromptVisible(false)}
        value={selectedField ? getFieldValue(selectedField?.id) : ''}
        onChangeText={selectedField ? getFieldSetter(selectedField.id) : () => {}}
        placeholder={selectedField?.label}
        isPasswordField={selectedField?.id === 'password'}
        confirmPasswordValue={confirmPassword}
        onConfirmPasswordChange={setConfirmPassword}
      />
    </AnimatedCustom>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: SIZES.base * 2,
    borderWidth: 0.3,
    borderColor: COLORS.primary,
    height: SCREEN_HEIGHT * 0.085,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding,
    backgroundColor: '#cccccc1a',
  },
  user: {
    backgroundColor: COLORS.primary,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.padding,
    borderLeftColor: COLORS.primary3,
    borderLeftWidth: 0.5,
    borderBottomColor: COLORS.primary3,
    borderBottomWidth: 2.5,
    borderRightColor: COLORS.primary3,
    borderRightWidth: 2,
    marginLeft: SIZES.base * 2,
  },
})
