import { StyleSheet, Text, View, Image, StatusBar, ImageBackground } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '../assets/images';
import { SIZES ,SCREEN_HEIGHT,SCREEN_WIDTH, COLORS} from '../constants/THEME';
import Animated, { 
    useSharedValue, 
    useAnimatedStyle, 
    withSpring 
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);

const SplashScreen = () => {
  const navigation = useNavigation();
  
  const scale = useSharedValue(0); 

  useEffect(() => {
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 170,
      mass: 0.5,
      duration: 1500,
    });

    const t = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);
    return () => clearTimeout(t);
  }, [navigation, scale]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <ImageBackground style={{flex:1}} source={images.splash}>
 <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent/>
      
      <AnimatedImage
        source={images.logo}
        style={[
          { height: SCREEN_HEIGHT * 0.5, width: SCREEN_WIDTH * 0.7, resizeMode:'contain' },
          animatedStyle
        ]} 
      />
    </View>
    </ImageBackground>
   
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});