import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, SCREEN_WIDTH, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      <View style={general.form}>
        <ThemedText
          type="text3bold"
          style={{ color: COLORS.primary, margin: SIZES.base / 2 }}
        >
          Login To Your Account
        </ThemedText>
        <CustomInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure={true}
        />
        <ThemedText
          style={{
            fontSize: 13,
            textAlign: "right",
            marginVertical: SIZES.base/3,
          }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password?
        </ThemedText>
        <PrimaryButton
          title="Login"
          onPress={() => navigation.navigate("Main")}
        />
      </View>

      <ThemedText
        style={{
          fontSize: 12,
          textAlign: "center",
          marginVertical: SIZES.padding,
        }}
      >
        Don't have an account?
          <ThemedText
                  type="text4bold"
                  style={{ color: COLORS.primary }}
                  onPress={() => navigation.navigate("SignUp")}
                >
                  SignUp
                </ThemedText>
      </ThemedText>
    </CustomHeader>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  form: {
    marginTop: SIZES.padding * 3,
    backgroundColor: COLORS.formBg,
    borderRadius: SIZES.padding,
    padding: SIZES.padding,
    width: SCREEN_WIDTH * 0.9,
    paddingHorizontal: SIZES.base,
  },
});
