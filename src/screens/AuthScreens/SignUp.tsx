import { Image, KeyboardAvoidingView,  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS,  SCREEN_WIDTH,  SIZES } from '../../constants/THEME'
import CustomInput from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import {images} from '../../constants/images'
import { useNavigation } from '@react-navigation/native'

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  return (
    <CustomHeader authScreen={true} >
      <ThemedText type="text2bold" style={{fontWeight:'bold', textAlign:'center'}}>Welcome To CeduGames</ThemedText>
      <ThemedText  style={{textAlign:'center', fontSize:14}}>Cephas Educational Games</ThemedText>
      <KeyboardAvoidingView style={styles.form}>
        <ThemedText style={{fontSize:16}}>Create an account to get started</ThemedText>
        <CustomInput placeholder='Email' value={email} onChangeText={setEmail} />
        <CustomInput placeholder='Username' value={Username} onChangeText={setUsername} />
      <CustomInput placeholder='Phone Number' value={phoneNumber} onChangeText={setPhoneNumber} keyboardType='phone-pad'/>
      <CustomInput placeholder='Date of Birth' value={dateOfBirth} onChangeText={setDateOfBirth} keyboardType='numeric'/>
        <CustomInput placeholder='Password' value={password} onChangeText={setPassword} secureTextEntry={true} />
        <CustomInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
      </KeyboardAvoidingView>
      <PrimaryButton title='Sign Up'  onPress={()=> navigation.navigate('Login')}/>
      <View
        style={styles.row}>
        <Image source={images.icon} style={{ height: SIZES.h1, width: SIZES.h1, resizeMode: 'contain' }} />
        <ThemedText style={{ fontSize: 15, fontWeight: 'bold' }}>Continue with Google</ThemedText>
      </View>
      <ThemedText style={{fontSize:12, textAlign:'center',marginBottom:SIZES.padding}}>Already have an account?<Text style={{color:COLORS.primary}} onPress={()=> navigation.navigate('Login')}>Login</Text></ThemedText>
    </CustomHeader>
  )
}

export default SignUp

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding,
    backgroundColor:COLORS.formBg,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SIZES.base,
    marginTop: SIZES.base
  }
})