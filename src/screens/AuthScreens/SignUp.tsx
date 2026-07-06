import { loginUser, registerUser } from "@/BackendComm/APIClient";
import { useAuth } from "@/BackendComm/AuthContext";
import { general } from "@/src/constants/General";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import CustomInput from "../../components/CustomInput";
import PrimaryButton from "../../components/PrimaryButton";
import { images } from "../../constants/images";
import { COLORS, SIZES } from "../../constants/THEME";
import { ThemedText } from "../../constants/ThemedText";

const SignUp = () => {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginAuth = useAuth()?.loginAuth;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async () => {
    try {
      if (!Username.trim() || !email.trim() || !password.trim()) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert("Please enter  valid email address");
        return;
      }

      if (password.length < 6) {
        Alert.alert("Error", "Password must be at least 6 characters long");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      setLoading(true);
      const registerResponse = await registerUser({
        userName: Username,
        email,
        password,
      });

      if (registerResponse.status === "error") {
        const errorMsg = registerResponse.message || "Registration failed";
        setError(errorMsg);
        Alert.alert("Error during registration");
        return;
      }
      const loginResponse = await loginUser(email.trim(), password);
      if (loginResponse.status === "error") {
        const errorMsg =
          loginResponse.message || "Login failed after registration";
        setError(errorMsg);
        Alert.alert("Login Failed", errorMsg);
        return;
      }

      if (!loginResponse.token || !loginResponse.userId) {
        setError("Invalid session data received");
        Alert.alert("Error", "Invalid session data received");
        return;
      }
      const sessionData = {
        token: loginResponse.token,
        userId: loginResponse.userId,
        email: email.trim(),
        userName: Username.trim(),
      };

      await loginAuth?.(sessionData);
    } catch (e) {
      console.error("Error during sign up:", e);
      setError(e instanceof Error ? e.message : "Erorr during registration", e);
    } finally {
      setLoading(false);
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
      <KeyboardAvoidingView style={general.form}>
        <ThemedText
          type="text3bold"
          style={{ color: COLORS.primary, margin: SIZES.base / 2 }}
        >
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
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secure={true}
        />
        <CustomInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secure={true}
        />
        <PrimaryButton title="Sign Up" onPress={handleSignUp} />
      </KeyboardAvoidingView>

      <TouchableOpacity style={styles.row}>
        <Image
          source={images.google}
          style={{ height: SIZES.h2, width: SIZES.h2, resizeMode: "contain" }}
        />
        <ThemedText style={{ fontSize: 13 }}>Continue with Google</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.row, { padding: SIZES.base / 2.5 }]}>
        <Image
          source={images.apple}
          style={{
            height: SIZES.h1 * 1.2,
            width: SIZES.h1 * 1.2,
            resizeMode: "contain",
          }}
        />
        <ThemedText style={{ fontSize: 13 }}>Continue with Apple</ThemedText>
      </TouchableOpacity>
      <ThemedText
        style={{
          fontSize: 12,
          textAlign: "center",
          marginVertical: SIZES.padding / 2,
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
  row: {
    flexDirection: "row",
    paddingHorizontal: SIZES.padding,
    alignItems: "center",
    justifyContent: "center",
    marginTop: SIZES.base,
    borderRadius: SIZES.padding,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: SIZES.base,
    gap: 10,
  },
});
