import CustomHeader from "@/src/components/CustomHeader";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, SCREEN_WIDTH, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = React.useState("");
  const navigation = useNavigation<any>();
  return (
    <CustomHeader>
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
          style={{ color: COLORS.primary, marginBottom: SIZES.base }}
        >
          Forgot Password?
        </ThemedText>
        <ThemedText
          type="text4"
          style={{ textAlign: "center", marginBottom: SIZES.padding }}
        >
          Enter the email address linked to your account. We’ll send you a
          verification code to reset your password.
        </ThemedText>
        <CustomInput
          placeholder="Email Address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
        />
        <PrimaryButton
          title="Send Verification Code"
          onPress={() => navigation.navigate("VerifyOTP")}
        />
        <ThemedText style={{ fontSize: 12, textAlign: "center" }}>
          Already have an account?
          <Text
            style={{ color: COLORS.primary }}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </ThemedText>
      </View>
    </CustomHeader>
  );
};

export default ForgotPassword;

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
