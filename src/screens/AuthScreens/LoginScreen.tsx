import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '../../components/CustomHeader'
import { ThemedText } from '../../constants/ThemedText'
import { COLORS, SCREEN_WIDTH, SIZES } from '../../constants/THEME'
import CustomInput from '../../components/CustomInput'
import PrimaryButton from '../../components/PrimaryButton'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {
  const navigation = useNavigation<any>()
  const [Username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  return (
    <CustomHeader authScreen={true}>
      <ThemedText type="text2bold" style={{ fontWeight: 'bold', textAlign: 'center' }}>
        Welcome To CeduGames
      </ThemedText>
      <ThemedText style={{ textAlign: 'center', fontSize: 14 }}>
        Cephas Educational Games
      </ThemedText>
      <View style={styles.form}>
        <ThemedText style={{ fontSize: 16, textAlign: 'center' }}>
          Let's get smart and have fun
        </ThemedText>
        <CustomInput
          placeholder="Username/Phone Number"
          value={Username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <ThemedText
          style={{
            fontSize: 13,
            textAlign: 'right',
            marginBottom: SIZES.padding,
            color: COLORS.orange,
          }}
          onPress={() => navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </ThemedText>
      </View>
      <PrimaryButton title="Login" onPress={() => navigation.navigate('PreHome1')} />
      <ThemedText style={{ fontSize: 12, textAlign: 'center', marginVertical: SIZES.padding }}>
        Don't have an account?
        <Text style={{ color: COLORS.primary }} onPress={() => navigation.navigate('SignUp')}>
          SignUp
        </Text>
      </ThemedText>
    </CustomHeader>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding * 3,
    backgroundColor: COLORS.formBg,
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
})
