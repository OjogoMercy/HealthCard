import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { images } from "../../constants/images";
import { COLORS, SCREEN_WIDTH, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  return (
    <CustomHeader authScreen={true}>
      <Image
        source={images.logo}
        style={{
          height: SIZES.navTitle * 3,
          width: SIZES.navTitle * 3,
          resizeMode: "contain",
        }}
      />
      <KeyboardAvoidingView style={styles.form}>
        <ThemedText style={{ fontSize: 16 }}>
          Create an account to get started
        </ThemedText>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Username"
          value={Username}
          onChangeText={setUsername}
        />
        <CustomInput
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          secure={true}
        />
     
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <PrimaryButton
          title="Sign Up"
          onPress={() => navigation.navigate("Login")}
        />
      </KeyboardAvoidingView>
      

      <TouchableOpacity style={styles.row}>
        <Image
          source={images.google}
          style={{ height: SIZES.h2, width: SIZES.h2, resizeMode: "contain" }}
        />
        <ThemedText style={{ fontSize: 13,}}>
          Continue with Google
        </ThemedText>
      </TouchableOpacity>
       <TouchableOpacity style={[styles.row,{padding:SIZES.base/2.5}]}>
        <Image
          source={images.apple}
          style={{ height: SIZES.h1*1.2, width: SIZES.h1*1.2, resizeMode: "contain" }}
        />
        <ThemedText style={{ fontSize: 13,}}>
          Continue with Apple
        </ThemedText>
      </TouchableOpacity>
      <ThemedText
        style={{
          fontSize: 12,
          textAlign: "center",
          marginVertical: SIZES.padding/2,
        }}
      >
        Already have an account?
        <ThemedText
          type="text4bold"
          style={{ color: COLORS.primary }}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </ThemedText>
      </ThemedText>
    </CustomHeader>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding,
    backgroundColor: COLORS.primary + "20",
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
  row: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.base,
   borderRadius:SIZES.padding,
   borderWidth:1,
   borderColor:COLORS.primary,
   padding:SIZES.base,
   gap:10
  },
});
