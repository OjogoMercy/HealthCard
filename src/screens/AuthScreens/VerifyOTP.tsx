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
const VerifyOTP = () => {
  const navigation = useNavigation<any>();
  const [OTP, setOTP] = React.useState("");
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
          style={{ color: COLORS.primary, marginLeft: SIZES.base }}
        >
          Verify OTP
        </ThemedText>
        <ThemedText
          type="text4"
          style={{ textAlign: "center", marginVertical: SIZES.base }}
        >
          Enter the 6-digit code sent to your email to continue.
        </ThemedText>
        <ThemedText
          type="text4"
          style={{
            textAlign: "center",
            color: COLORS.primary,
            marginBottom: SIZES.padding,
          }}
        >
          Use a different email?
        </ThemedText>
        <CustomInput
          placeholder="Enter OTP"
          value={OTP}
          onChangeText={setOTP}
          keyboardType="email-address"
        />
        <PrimaryButton
          title="Verify Code"
          onPress={() => navigation.navigate("ResetPassword")}
        />
        <ThemedText style={{ fontSize: 12, textAlign: "center" }}>
          <Text
            style={{ color: COLORS.primary }}
            onPress={() => navigation.navigate("")}
          >
            Resend Code?
          </Text>
          (active after 30s)
        </ThemedText>
      </View>
    </CustomHeader>
  );
};

export default VerifyOTP;

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
