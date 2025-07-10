import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { COLOR_ALIAS, COLORS, SPACING } from '@/constants/theme'; // Assuming these constants are defined in your project
import Typo from '../Typo';

interface IButtonProps {
  title: string;
  type?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onPress: () => void;
  disabled?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<IButtonProps> = ({
  title,
  type = 'primary',
  size = 'md',
  onPress,
  disabled = false,
  containerStyle,
  textStyle,
}) => {
  const buttonStyles = [
    styles.baseButton,
    styles[type],
    styles[size],
    containerStyle,
    disabled && styles.disabled,
  ];

  const textStyles = [
    styles.baseText,
    styles[`${type}Text`],
    styles[`${size}Text`],
    textStyle,
    disabled && styles.disabledText,
  ];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}>
      <Typo typography="body1" fontWeight="semibold" style={textStyles}>
        {title}
      </Typo>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Base styles for the button
  baseButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: SPACING.S_PLUS,
    paddingHorizontal: SPACING.L,
  },

  // Size variants
  sm: {
    paddingVertical: SPACING.XS,
    paddingHorizontal: SPACING.S,
  },
  md: {
    paddingVertical: SPACING.S,
    paddingHorizontal: SPACING.M,
  },
  lg: {
    paddingVertical: SPACING.M,
    paddingHorizontal: SPACING.L,
  },
  xl: {
    paddingVertical: SPACING.L,
    paddingHorizontal: SPACING.XL,
  },

  // Type variants
  primary: {
    backgroundColor: COLOR_ALIAS.Button.Default,
  },
  secondary: {
    backgroundColor: COLOR_ALIAS.Surface.Lowest,
    borderWidth: 1,
    borderColor: COLOR_ALIAS.Stroke.OnWhite.Brand,
  },
  accent: {
    backgroundColor: COLOR_ALIAS.Text.OnWhite.Brand,
  },

  // Text styles
  baseText: {
    textAlign: 'center',
  },
  primaryText: {
    color: COLOR_ALIAS.Text.OnSpecial.Primary,
  },
  secondaryText: {
    color: COLOR_ALIAS.Text.OnWhite.Brand,
  },

  // Size-specific text styles
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  xlText: {
    fontSize: 20,
  },

  // Disabled styles
  disabled: {
    backgroundColor: COLOR_ALIAS.Button.Disabled,
  },
  disabledText: {
    color: COLOR_ALIAS.Text.OnGray.Disable,
  },
});

export default Button;
