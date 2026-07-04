import { loginUser } from "@/BackendComm/APIClient";
import { useAuth } from "@/BackendComm/AuthContext";
import { general } from "@/src/constants/General";
import { images } from "@/src/constants/images";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  View,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { COLORS, SCREEN_WIDTH, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";
const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const loginAuth = useAuth()?.loginAuth;
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await loginUser(email, password);

      console.log("[LoginScreen] Response received:", response);
      if (response.status === "error") {
        console.log("[LoginScreen] Backend error:", response.message);
        Alert.alert("Login Failed", response.message);
        setError(response.message);
        setIsLoading(false);
        return;
      }
      if (!response.token || !response.userId) {
        console.error("[LoginScreen] Missing token or user ID ");
        Alert.alert("Error", "Invalid response from server");
        return;
      }
      console.log("[LoginScreen] Storing session...");
      await loginAuth({
        token: response.token,
        userId: response.userId,
        email: email,
      });

      console.log("[LoginScreen] Login successful for user:", response.userId);

      navigation.reset({
        index: 0,
        routes: [{ name: "Main" }],
      });
    } catch (error) {
      console.error("[LoginScreen] Login error:", error);

      setError(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
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
            marginVertical: SIZES.base / 3,
          }}
          onPress={() => navigation.navigate("ForgotPassword")}
        >
          Forgot Password?
        </ThemedText>
        <PrimaryButton title="Login" onPress={handleLogin} />
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
