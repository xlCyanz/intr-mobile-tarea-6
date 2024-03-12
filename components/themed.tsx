/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { StyledProps, styled } from 'nativewind';
import { Text as DefaultText, View as DefaultView } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

const StyledDefaultView = styled(DefaultView);
const StyledDefaultText = styled(DefaultText);

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type FamiliesType = "Bold" | "Regular" | "Medium" | "SemiBold";

export function Text(props: StyledProps<TextProps> & { familyType?: FamiliesType; }) {
  const { style, lightColor, darkColor, familyType = "Regular", ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <StyledDefaultText style={[{ color }, style, { fontFamily: `Raleway${familyType}` }]} {...otherProps} />;
}

export function View(props: StyledProps<ViewProps>) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <StyledDefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
