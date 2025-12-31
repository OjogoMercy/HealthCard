import { Dimensions, useColorScheme } from 'react-native'
const { width, height } = Dimensions.get('window')

const screenWidth = Math.round(Dimensions.get('window').width)
const screenHeight = Math.round(Dimensions.get('window').height)

export const SCREEN_HEIGHT = Dimensions.get('window').height
export const SCREEN_WIDTH = Dimensions.get('window').width

export const FontStyles = {
  ABCItalic: 'ABeeZee-Italic',
  ABCRegular: 'ABeeZee-Regular',
  ComicSans: 'Comic Sans MS',
}

export const COLORS = {
  primary: '#2E7D32',
  secondary: '#81C784',
  lightGreen: 'rgba(247, 253, 250, 1)',
  lightGreen2: 'rgba(229, 249, 227, 1)',
  alert:"#D32F2F",
  black: 'rgba(0, 0, 0, 1)',
  white: 'rgba(255, 255, 255, 1)',
  gray: '#747674',
  gray2: '#ccc',
  gray3: '#323F4B',
  gray4: 'rgba(33, 33, 33, 0.08)',
  pink: 'rgba(235, 87, 87, 1)',
  red2: ' rgba(255, 210, 210, 1)',
  inputContainer: '#EBDFFA',
  formBg: '#EBDFFA33',
  inputText: '#2E14219E',
  orange: '#FFAF42',
  accent: '#FFA726', //Nutrition alerts, meal logging, calls to action.
  veryLightGray: '#cccccc1a',
  lightPurple: '#F0EFFF',
  overlay: '#cccccc1a',
  opacity: 'rgba(0, 0, 0, 0.2)',
  promptInput: '#FFE8B2',
  promptBackground: '#FFF6E0',
  background:"#F9FAFB",
  mutedText:"#6B7280"
}

export const SIZES = {
  //global sizes
  base: screenHeight * 0.01,
  font: screenHeight * 0.0175,
  radius: 5,
  padding: screenHeight * 0.03,

  // font sizes
  navTitle: screenHeight * 0.04375,
  h1: screenHeight * 0.0375,
  h2: screenHeight * 0.0275,
  h3: screenHeight * 0.0225,
  h4: screenHeight * 0.0175,
  h5: screenHeight * 0.015,
  h6: screenHeight * 0.0115,
  body1: screenHeight * 0.0375,
  body2: screenHeight * 0.025,
  body3: screenHeight * 0.0225,
  body4: screenHeight * 0.0175,
  body5: screenHeight * 0.015,
  intro: screenHeight * 0.04,

  // app dimensions
  width,
  height,
}

export const FONTS = {
  navTitle: { fontFamily: 'AeonikTRIAL-Bold', fontSize: SIZES.navTitle },
  largeTitleBold: {
    fontFamily: 'AeonikTRIAL-Bold',
    fontSize: SIZES.h1 * 1.5,
    lineHeight: screenHeight * 0.05,
  },
  h1: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.h1,
    lineHeight: screenHeight * 0.05,
  },
  h1bold: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h1,
    lineHeight: screenHeight * 0.05,
  },
  h2: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h2,
    lineHeight: screenHeight * 0.038,
  },
  h2bold: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h2,
    lineHeight: screenHeight * 0.038,
  },
  h3: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h3,
    lineHeight: screenHeight * 0.03,
  },
  h3bold: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h3,
    lineHeight: screenHeight * 0.025,
  },
  h4: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h4,
    lineHeight: screenHeight * 0.025,
    fontWeight:'200'
  },
  h4bold: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h4,
    lineHeight: screenHeight * 0.025,
  },
  h5: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h5,
    lineHeight: screenHeight * 0.02,
  },
  h5bold: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.h5,
    lineHeight: screenHeight * 0.025,
  },
  h6: {
    fontFamily: 'Poppins-Medium',
    fontSize: SIZES.h6,
    lineHeight: screenHeight * 0.025,
  },
  h6bold: {
    fontFamily: 'Poppins-Bold',
    fontSize: SIZES.h6,
    lineHeight: screenHeight * 0.025,
  },
  body1: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: FontStyles.ComicSans,
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body2a: {
    fontFamily: 'AeonikTRIAL-Bold',
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: 'Raleway-VariableFont_wght',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body3a: {
    fontFamily: 'AeonikTRIAL-Bold',
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: 'Raleway-VariableFont_wght',
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: 'Raleway-VariableFont_wght',
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
}

const appTheme = { COLORS, SIZES, FONTS, SCREEN_HEIGHT, SCREEN_WIDTH }

export default appTheme
