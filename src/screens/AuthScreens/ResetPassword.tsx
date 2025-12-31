import {  StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS,  SCREEN_WIDTH,  SIZES } from '../../constants/THEME'
import CustomInput from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  return (
    <CustomHeader title='Reset Password'>
      <View style={styles.form}>
        <ThemedText type="text4" style={{ textAlign: 'center', }}>Create a strong and secure password for your account.</ThemedText>
        <CustomInput placeholder='New Password' value={newPassword} onChangeText={setNewPassword}  />
        <CustomInput placeholder='Confirm Password' value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true} />
      <PrimaryButton title='Reset Password' onPress={()=>navigation.navigate('Login')}/>
      </View>
    </CustomHeader>
  )
}

export default ResetPassword

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