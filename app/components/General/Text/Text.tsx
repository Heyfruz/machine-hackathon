import { Platform, Text as RNText } from 'react-native';

import { Props, TextStyleProps, TextStyleType } from './types';

import { layout, pallets } from 'constant';

const { fonts } = layout;

export default function Text({
  children,
  style,
  color,
  variant,
  size,
  lineHeight,
  textTransform,
  textAlign,
  ...props
}: Props): JSX.Element {
  let textStyle: TextStyleProps = {};

  //Returns San Francisco for iOS
  const fontFamily = Platform.OS === 'ios' ? undefined : 'Roboto';

  const defaultStyle: TextStyleType = {
    color: color ? color : pallets.text,
    lineHeight: lineHeight ? lineHeight : undefined,
  };

  switch (variant) {
    case 'title':
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.largeTitle,
        fontWeight: '900',
      };
      break;
    case 'semiBold':
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.body,
        fontWeight: '600',
      };
      break;
    case 'bold':
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.body,
        fontWeight: '800',
      };
      break;
    case 'medium':
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.body,
        fontWeight: '500',
      };
      break;
    case 'light':
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.body,
        fontWeight: '200',
      };
      break;
    default:
      textStyle = {
        ...defaultStyle,
        fontFamily,
        fontSize: size ? size : fonts.body,
        fontWeight: 'normal',
      };
  }

  return (
    <RNText style={[textStyle, { textAlign, textTransform }, style]} {...props}>
      {children}
    </RNText>
  );
}
