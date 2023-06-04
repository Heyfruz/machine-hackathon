import { TextProps, TextStyle } from 'react-native';

export type TextStyleType = TextStyle | TextStyle[];

type Variants = 'title' | 'semiBold' | 'bold' | 'light' | 'medium';

type font = 'Roboto' | 'American Typewriter';

type weight =
  | 'normal'
  | 'bold'
  | '100'
  | '200'
  | '300'
  | '400'
  | '500'
  | '600'
  | '700'
  | '800'
  | '900';

export interface Props extends TextProps {
  children: React.ReactNode;
  style?: TextStyleType;
  variant?: Variants;
  color?: string;
  size?: number;
  lineHeight?: number;
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
}

export interface TextStyleProps {
  fontFamily?: font;
  fontSize?: number;
  fontWeight?: weight;
}
