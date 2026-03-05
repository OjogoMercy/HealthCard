import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, SCREEN_WIDTH, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";

const ResetPassword = () => {
  const navigation = useNavigation<any>();
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
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
          Reset Your Password
        </ThemedText>
        <ThemedText
          type="text4"
          style={{ textAlign: "center", marginVertical: SIZES.base }}
        >
          Create a strong and secure password for your account.
        </ThemedText>
        <CustomInput
          placeholder="New Password"
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        <PrimaryButton
          title="Reset Password"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </CustomHeader>
  );
};

export default ResetPassword;

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
