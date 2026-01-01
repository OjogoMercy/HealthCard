import React from 'react';
import {
  TextInput,
  StyleSheet,
  View,
  Text,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';

import {COLORS, SIZES, FONTS} from '../constants/THEME';
type Props = {
  label?: string;
  value: string;
  onChangeText:(text: string) => void;
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
  // secure,
  // secureTextEntry = false,
  inputStyle,
  // containerStyle,
  // error,
  // iconName,
  keyboardType,
}: Props) => {
  const [show, setShow] = React.useState(false);
  return (
    // <View style={[styles.container, containerStyle]}>
    //   {label && <Text style={general.label}>{label}</Text>}
    //   <View style={general.inputWrapper}>
    //     {iconName && (
    //       <MaterialIcons
    //         name={iconName as any}
    //         size={SCREEN_WIDTH * 0.06}
    //         color={Colors.black}
    //         style={general.icon}
    //       />
    //     )}
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.inputText}
      value={value}
      onChangeText={onChangeText}
      style={styles.customInput}
      keyboardType={keyboardType}
      underlineColorAndroid={'transparent'}
    />
    //     {secure && (
    //       <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(!show)}>
    //         <Ionicons
    //           name={show ? "eye-sharp" : "eye-off"}
    //           color={Colors.black}
    //           size={Sizes.body2}
    //         />
    //       </TouchableOpacity>
    //     )}
    //   </View>
    //   {error && <Text style={general.error}>{error}</Text>}
    // </View>
  );
};

export default CustomInput;
const styles = StyleSheet.create({
  customInput: {
    borderRadius: SIZES.padding/1.5,
    padding: SIZES.base,
    height: SIZES.base * 6.5,
    marginBottom: SIZES.base * 2,
    marginTop: SIZES.base,
    ...FONTS.h4,
    backgroundColor: COLORS.inputContainer,
    borderWidth: 0,
    borderBottomWidth: 0, 
    borderColor: 'transparent',
  },
});
