import { StyleSheet, View, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import images from '../assets/images';
import { SIZES, SCREEN_WIDTH, COLORS } from '../constants/THEME';
import { ThemedText } from '../constants/ThemedText';

interface WrapScrollViewProps {
  children: React.ReactNode;
  title?: string;
  authScreen?: boolean;
}

const WrapScrollView = ({ children, title }: WrapScrollViewProps) => {
  const navigation = useNavigation<any>();

  return (
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.contentContainer}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      
      <View style={styles.headerContainer}>
        <Image 
          source={images.cedu} 
          style={styles.logo} 
        />
        
        <TouchableOpacity 
          style={styles.profile}
        >
          <Image 
            source={images.person} 
            style={styles.profileIcon} 
          />
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentWrapper}>
        {children}
      </View>
    </ScrollView>
  );
};

export default WrapScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, 
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: SIZES.padding * 2,
  },
  headerContainer: {
    width: '90%', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  logo: {
    height: SIZES.navTitle * 3, 
    width: SCREEN_WIDTH * 0.3, 
    resizeMode: 'contain',
  },
  profile: {
    height: SIZES.navTitle,
    width: SIZES.navTitle,
    borderRadius: SIZES.h1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    padding: SIZES.base,
  },
  profileIcon: {
    height: SIZES.h2, 
    width: SIZES.h2, 
    resizeMode: 'contain', 
    tintColor: 'white',
  },
  contentWrapper: {
    width: SCREEN_WIDTH * 0.9, 
    alignItems: 'flex-start',
  },
});