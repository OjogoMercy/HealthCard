import { loginUser, registerUser } from "@/BackendComm/APIClient";
import { useAuth } from "@/BackendComm/AuthContext";
import { getIfOnboarded } from "@/BackendComm/authStorage";
import { general } from "@/src/constants/General";
import { useMomStore } from "@/src/store/useMomStore";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
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
import {
  COLORS,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  SIZES,
} from "../../constants/THEME";
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
  const [stageIndex, setStageIndex] = useState(Number);
  const setMom = useMomStore((s) => s.setMom);
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const SIGNUP_STAGES = [
    "Creating your account",
    "Personalizing your dashboard",
    "Logging you in",
  ];
  const MIN_STAGE_MS = 700;

  const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targetPct = (stageIndex + 1) / SIGNUP_STAGES.length;
    Animated.timing(progressAnim, {
      toValue: targetPct,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [stageIndex]);

  const barWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const handleSignUp = async () => {
    try {
      if (!Username.trim() || !email.trim() || !password.trim()) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }
      if (!validateEmail(email)) {
        Alert.alert("Please enter valid email address");
        return;
      }
      if (password.length < 6) {
        Alert.alert("Error", "Password must be at least 6 characters long");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Passwords do not match");
        return;
      }

      setLoading(true);
      setStageIndex(0);
      const registerResponse = await registerUser({
        userName: Username,
        email,
        password,
      });

      // Check if register was successful
      if (!registerResponse || registerResponse.status >= 400) {
        const errorMsg = registerResponse?.message || "Registration failed";
        setError(errorMsg);
        Alert.alert("Registration Error", errorMsg);
        return;
      }
      setStageIndex(1);

      // LOGIN

      const [loginResponse] = await Promise.all([
        loginUser(email.trim(), password),
        wait(MIN_STAGE_MS),
      ]);

      if (!loginResponse) {
        throw new Error("No response from login server");
      }

      if (loginResponse.status === "error") {
        const errorMsg =
          loginResponse.message || "Login failed after registration";
        setError(errorMsg);
        Alert.alert("Login Failed", errorMsg);
        return;
      }

      // Verify login data
      if (!loginResponse.token || !loginResponse.userId) {
        setError("Invalid session data received");
        Alert.alert("Error", "Invalid session data received");
        return;
      }

      // Save session
      const sessionData = {
        token: loginResponse.token,
        userId: loginResponse.userId,
        email: email.trim(),
        userName: Username.trim(),
      };
      setMom({
        userName: Username.trim(),
        email: email.trim(),
        userId: loginResponse.userId,
      });
      await getIfOnboarded();

      setStageIndex(2);
      await loginAuth?.(sessionData);
      await wait(MIN_STAGE_MS);
    } catch (e) {
      console.error("Error during sign up:", e);

      let errorMessage = "Error during registration";
      if (e instanceof Error) {
        errorMessage = e.message;
        if (e.message.includes("Network") || e.message.includes("fetch")) {
          errorMessage =
            "Network error. Please check your internet connection.";
        }
      }

      setError(errorMessage);
      Alert.alert("Sign Up Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          marginTop: -SIZES.h1 * 6,
        }}
      >
        <Image
          source={images.logo}
          style={{
            height: SIZES.navTitle * 3,
            width: SIZES.navTitle * 3,
            resizeMode: "contain",
          }}
        />
        <Image
          source={images.mascot}
          style={{
            width: SCREEN_WIDTH * 0.7,
            height: SCREEN_HEIGHT * 0.4,
            alignSelf: "center",
            marginVertical: SIZES.h1,
            resizeMode: "contain",
          }}
        />
        <ThemedText type="text3green">
          {SIGNUP_STAGES[stageIndex]}...
        </ThemedText>
        <View
          style={{
            width: "90%",
            height: 6,
            borderRadius: 3,
            backgroundColor: "#E0E0E0",
            overflow: "hidden",
            marginTop: SIZES.padding,
          }}
        >
          <Animated.View
            style={{
              width: barWidth,
              height: "90%",
              borderRadius: 3,
              backgroundColor: "#4CAF50",
            }}
          />
        </View>
        <ThemedText>
          {Math.round(((stageIndex + 1) / SIGNUP_STAGES.length) * 100)}%
        </ThemedText>
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
