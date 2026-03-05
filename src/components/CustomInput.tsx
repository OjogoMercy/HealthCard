import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  KeyboardTypeOptions, // Import for better type safety
} from "react-native";
import { COLORS, FONTS, SIZES } from "../constants/THEME";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";

type Props = {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputStyle?: TextStyle;
  containerStyle?: ViewStyle;
  error?: string;
  secure?: boolean;
  keyboardType?: KeyboardTypeOptions; 
};

const CustomInput = ({
  value,
  onChangeText,
  placeholder,
  secure,
  containerStyle,
  keyboardType,
}: Props) => {
  const [show, setShow] = React.useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={COLORS.inputText || "#999"}
        value={value}
        onChangeText={onChangeText}
        style={styles.customInput}
        keyboardType={keyboardType}
        underlineColorAndroid={"transparent"}
        secureTextEntry={secure ? !show : false} 
      />
      {secure && (
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => setShow(!show)}
          style={styles.iconContainer}
        >
          <Ionicons
            name={show ? "eye" : "eye-off"} 
            color={COLORS.black || "black"}
            size={20}
          />  
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH * 0.85,
    flexDirection: "row",
    backgroundColor:  "white", 
        alignItems: 'center',
    borderRadius: SIZES.padding / 2,
    marginVertical: SIZES.base,
    paddingHorizontal: SIZES.base, 
  },
  customInput: {
    flex: 1, 
    paddingVertical: SIZES.base * 1.5,
    paddingHorizontal: SIZES.base,
    ...FONTS.h4,
    color: 'black',
  },
  iconContainer: {
    padding: SIZES.base,
  }
});