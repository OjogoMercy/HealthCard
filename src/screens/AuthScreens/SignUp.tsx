import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, KeyboardAvoidingView, StyleSheet, View } from "react-native";
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
          placeholder="Date of Birth"
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
          keyboardType="numeric"
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
      </KeyboardAvoidingView>
      <View style={{ width: SCREEN_WIDTH * 0.9 }}>
        <PrimaryButton
          title="Sign Up"
          onPress={() => navigation.navigate("Login")}
        />
      </View>

      <View style={styles.row}>
        <Image
          source={images.google}
          style={{ height: SIZES.h1, width: SIZES.h1, resizeMode: "contain" }}
        />
        <ThemedText style={{ fontSize: 15, fontWeight: "bold" }}>
          Continue with Google
        </ThemedText>
      </View>
      <ThemedText
        style={{
          fontSize: 12,
          textAlign: "center",
          marginBottom: SIZES.padding,
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
    gap: SIZES.base,
    marginTop: SIZES.base,
  },
});
