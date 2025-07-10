import React from 'react';
import {
  Animated,
  Platform,
  type StyleProp,
  type TextProps,
  type TextStyle,
} from 'react-native';

import {ColorBrand, GlobalColor} from '@/constants/theme';

export type TTypographyType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'title1'
  | 'title2'
  | 'title3'
  | 'title4'
  | 'footnote1'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4';

export type TFontWeightType =
  | 'black'
  | 'bold'
  | 'semibold'
  | 'medium'
  | 'regular'
  | 'light'
  | 'thin';

export type TFontFamilyType = 'Default';

export type TColorAliasCategory =
  | 'textOnWhite'
  | 'textOnGray'
  | 'textOnSpecial'
  | 'textOnSemanticsRed'
  | 'textOnSemanticsOrange'
  | 'textOnSemanticsYellow'
  | 'textOnSemanticsGreen'
  | 'textOnSemanticsBlue';

export type TColorAliasType =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'disable'
  | 'brand'
  | 'hyperlink';

export interface ITypoProps
  extends Animated.AnimatedProps<TextStyle>,
    TextProps {
  typography: TTypographyType;
  fontWeight?: TFontWeightType;
  fontFamily?: TFontFamilyType;
  colorCategory?: TColorAliasCategory;
  colorAlias?: TColorAliasType;
  style?: TextStyle | object | StyleProp<TextStyle>;
  children?: React.ReactNode;
}
export const typographyStyles: Record<TTypographyType, TextStyle> = {
  h1: {
    fontSize: 32,
    lineHeight: Platform.select({ios: 40, android: 44}),
    letterSpacing: 0,
  },
  h2: {
    fontSize: 28,
    lineHeight: Platform.select({ios: 36, android: 40}),
    letterSpacing: 0,
  },
  h3: {
    fontSize: 24,
    lineHeight: Platform.select({ios: 32, android: 36}),
    letterSpacing: 0,
  },
  h4: {
    fontSize: 20,
    lineHeight: Platform.select({ios: 28, android: 32}),
    letterSpacing: 0,
  },
  title1: {
    fontSize: 20,
    lineHeight: Platform.select({ios: 28, android: 32}),
    letterSpacing: 0,
  },
  title2: {
    fontSize: 18,
    lineHeight: Platform.select({ios: 24, android: 28}),
    letterSpacing: 0,
  },
  title3: {
    fontSize: 16,
    lineHeight: Platform.select({ios: 24, android: 28}),
    letterSpacing: 0,
  },
  title4: {
    fontSize: 12,
    lineHeight: Platform.select({ios: 18, android: 20}),
    letterSpacing: 0,
  },
  footnote1: {
    fontSize: 10,
    lineHeight: Platform.select({ios: 14, android: 16}),
    letterSpacing: 0,
  },
  body1: {
    fontSize: 16,
    lineHeight: Platform.select({ios: 24, android: 28}),
    letterSpacing: 0,
  },
  body2: {
    fontSize: 14,
    lineHeight: Platform.select({ios: 20, android: 24}),
    letterSpacing: 0,
  },
  body3: {
    fontSize: 12,
    lineHeight: Platform.select({ios: 16, android: 20}),
    letterSpacing: 0,
  },
  body4: {
    fontSize: 11,
    lineHeight: Platform.select({ios: 16, android: 18}),
    letterSpacing: 0,
  },
};

// const fontWeights: Record<TFontWeightType, TextStyle['fontWeight']> = {
//   black: '900',
//   bold: '700',
//   semibold: '600',
//   medium: '500',
//   regular: '400',
//   light: '300',
//   thin: '200',
// };

export const fontFamilies: Record<TFontFamilyType, string> = {
  Default:
    Platform.select({
      ios: 'SFProText',
      android: 'SF-Pro-Text',
    }) || 'SF-Pro-Text',
};

export const fontWeightMapping = (font: TFontFamilyType) => {
  switch (font) {
    case 'Default':
      return {
        black: '-Black',
        bold: '-Bold',
        semibold: '-Semibold',
        medium: '-Medium',
        regular: '-Regular',
        light: '-Light',
        thin: '-Thin',
      };

    default:
      return {
        black: '-Black',
        bold: '-Bold',
        semibold: '-SemiBold',
        medium: '-Medium',
        regular: '-Regular',
        light: '-Light',
        thin: '-Thin',
      };
  }
};

export const colorAliases: Record<
  TColorAliasCategory,
  Record<TColorAliasType, string>
> = {
  textOnWhite: {
    primary: GlobalColor.neutral.black,
    secondary: GlobalColor.neutral.gray6,
    tertiary: GlobalColor.neutral.gray5,
    disable: GlobalColor.neutral.gray5,
    brand: ColorBrand,
    hyperlink: GlobalColor.blue.blue7,
  },
  textOnGray: {
    primary: GlobalColor.neutral.black,
    secondary: GlobalColor.neutral.gray6,
    tertiary: GlobalColor.neutral.gray5,
    disable: GlobalColor.neutral.gray6,
    brand: ColorBrand,
    hyperlink: GlobalColor.blue.blue7,
  },
  textOnSpecial: {
    primary: GlobalColor.whiteOpacity.white100,
    secondary: GlobalColor.whiteOpacity.white70,
    tertiary: GlobalColor.whiteOpacity.white45,
    disable: GlobalColor.whiteOpacity.white45,
    brand: ColorBrand,
    hyperlink: GlobalColor.blue.blue7,
  },
  textOnSemanticsRed: {
    primary: GlobalColor.red.red7,
    secondary: GlobalColor.red.red5,
    disable: GlobalColor.red.red4,
    hyperlink: GlobalColor.red.red7,
    tertiary: GlobalColor.red.red4,
    brand: ColorBrand,
  },
  textOnSemanticsYellow: {
    primary: GlobalColor.yellow.yellow7,
    secondary: GlobalColor.yellow.yellow6,
    disable: GlobalColor.yellow.yellow4,
    hyperlink: GlobalColor.yellow.yellow7,
    tertiary: GlobalColor.yellow.yellow4,
    brand: ColorBrand,
  },
  textOnSemanticsGreen: {
    primary: GlobalColor.green.green7,
    secondary: GlobalColor.green.green6,
    disable: GlobalColor.green.green4,
    hyperlink: GlobalColor.green.green7,
    tertiary: GlobalColor.green.green4,
    brand: ColorBrand,
  },
  textOnSemanticsOrange: {
    primary: GlobalColor.orange.orange7,
    secondary: GlobalColor.orange.orange6,
    disable: GlobalColor.orange.orange4,
    hyperlink: GlobalColor.orange.orange7,
    tertiary: GlobalColor.orange.orange4,
    brand: ColorBrand,
  },
  textOnSemanticsBlue: {
    primary: GlobalColor.blue.blue7,
    secondary: GlobalColor.blue.blue5,
    disable: GlobalColor.blue.blue4,
    hyperlink: GlobalColor.blue.blue7,
    tertiary: GlobalColor.blue.blue4,
    brand: ColorBrand,
  },
};

const Typo: React.FC<ITypoProps> = ({
  typography,
  fontWeight = 'regular',
  fontFamily = 'Default',
  colorCategory,
  colorAlias,
  style,
  children,
  ...restProps
}) => {
  const typographyStyle =
    typographyStyles[typography] || typographyStyles.body1;
  // const fontWeightStyle = {
  //   fontWeight: fontWeights[fontWeight] || fontWeights.regular,
  // };
  const fontFamilyStyle = {
    fontFamily: `${fontFamilies[fontFamily] || fontFamilies.Default}${
      fontWeightMapping(fontFamily)[fontWeight]
    }`,
  };
  const colorStyle =
    colorCategory && colorAlias
      ? {color: colorAliases[colorCategory][colorAlias]}
      : {};

  return (
    <Animated.Text
      style={[
        typographyStyle,
        // fontWeightStyle,
        fontFamilyStyle,
        colorStyle,
        style,
      ]}
      {...restProps}>
      {children}
    </Animated.Text>
  );
};

export default Typo;
