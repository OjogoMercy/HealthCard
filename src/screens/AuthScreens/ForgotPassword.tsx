import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS,  SCREEN_WIDTH,  SIZES } from '../../constants/THEME'
import CustomInput from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native';

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = React.useState('');
  const navigation = useNavigation<any>();
  return (
    <CustomHeader title='Forgot Password'>
      <View style={styles.form}>
        <ThemedText type="text4" style={{textAlign:'center', marginBottom:SIZES.padding}}>Enter the email address linked to your account. We’ll send you a verification code to reset your password.</ThemedText>
    <CustomInput placeholder='Email Address' value={emailAddress} onChangeText={setEmailAddress} keyboardType='email-address' />
      <PrimaryButton title='Send Verification Code' onPress={()=>navigation.navigate('VerifyOTP')}/>
            <ThemedText style={{fontSize:12, textAlign:'center'}}>Already have an account?<Text style={{color:COLORS.primary}} onPress={()=> navigation.navigate('Login')}>Login</Text></ThemedText>
      
      </View>
    </CustomHeader>
  )
}

export default ForgotPassword

const styles = StyleSheet.create({
   form: {
    marginTop: SIZES.padding*3,
    backgroundColor:COLORS.formBg,
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
    
  }
})