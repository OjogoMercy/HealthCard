import React, { useEffect } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { COLORS, SCREEN_WIDTH, SIZES } from "../constants/THEME";

import { useNavigation } from "@react-navigation/native";
import { Colors } from "@/constants/theme";

interface WrapViewProps {
  children: React.ReactNode;
  title: string;
  authScreen: boolean;
  headerStyle?: object;
}
const WrapView = ({ title, children, headerStyle }: WrapViewProps) => {
  const navigation = useNavigation<any>();
  
useEffect(()=> {
  StatusBar.setBarStyle('dark-content');
  setTimeout(() => {
navigation.navigate('FirstScreen')
  }, 3000);
})


  return (
    <View style={[styles.container]}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor={"transparent"}
      />

      <View style={{}}>{children}</View>
    </View>
  );
};

export default WrapView;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor:COLORS.background,justifyContent:'center'},
 
});
