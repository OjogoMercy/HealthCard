import React from "react";
import { StyleSheet, TextInput, TextStyle, TouchableOpacity, ViewStyle } from "react-native";

import { COLORS, FONTS, SIZES } from "../constants/THEME";
import Ionicons from "@expo/vector-icons/Ionicons";
type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  error?: string;
  iconName?: string;
  secure?: boolean;
  keyboardType?: string;
};

const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secure,
  secureTextEntry = false,
  inputStyle,
  // containerStyle,
  error,
  // iconName,
  keyboardType,
}: Props) => {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputText}
        value={value}
        onChangeText={onChangeText}
        style={styles.customInput}
        keyboardType={keyboardType}
        secureTextEntry={secure && !show}
        underlineColorAndroid={"transparent"}
      />
      {secure && (
        <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(!show)}>
          <Ionicons
            name={show ? "eye-sharp" : "eye-off"}
            color={COLORS.black}
            size={SIZES.base * 1.5}
          />
        </TouchableOpacity>
      )}
    </>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  customInput: {
    borderRadius: SIZES.padding / 1.5,
    padding: SIZES.base,
    height: SIZES.base * 6.5,
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base,
    ...FONTS.h4,
    backgroundColor: COLORS.white,
    borderColor: "transparent",
  },
});
