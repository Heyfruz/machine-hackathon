import { forwardRef } from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import { Text } from '../General';

import { layout, pallets } from 'constant';

type IconName = Pick<React.ComponentProps<typeof Icon>, 'name'>['name'];

const { height, inputRadius, borderWidth: bw } = layout.input;
const { subhead } = layout.fonts;

interface Props extends TextInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  errorMessage?: string;
  marginBottom?: number;
  placeholderColor?: string;
  disabled?: boolean;
  valid?: boolean;
  note?: string;
  noteVisible?: boolean;
  placeholder?: string;
  hideRightLabel?: boolean;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  borderWidth?: number;
}

const FormInput = forwardRef<TextInput, Props>(function (
  {
    value,
    onChangeText,
    error,
    placeholderColor,
    marginBottom = 15,
    errorMessage,
    borderWidth = bw,
    disabled,
    rightLabel,
    onRightLabelPress,
    rightIcon,
    hideRightLabel,
    onRightIconPress,
    noteVisible,
    placeholder,
    ...props
  }: Props,
  ref,
): JSX.Element | null {
  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: pallets.grey,
            borderColor: disabled
              ? pallets.inactive
              : error
              ? pallets.red
              : pallets.border,
            borderWidth,
          },
        ]}>
        <TextInput
          editable={!disabled}
          placeholder={placeholder}
          placeholderTextColor={placeholderColor || pallets.darkGrey}
          style={[
            styles.input,
            {
              color: pallets.text,
              // fontFamily: 'Inter-Regular',
            },
          ]}
          {...{ onChangeText, ref, value, ...props }}
        />
        {Boolean(rightLabel) && !rightIcon && (
          <TouchableOpacity
            style={styles.rightBox}
            onPress={onRightLabelPress}
            activeOpacity={0.5}>
            <Text color={pallets.primary} size={subhead} variant="medium">
              {rightLabel}
            </Text>
          </TouchableOpacity>
        )}
        {Boolean(rightIcon) && !rightLabel && (
          <TouchableOpacity
            style={styles.rightBox}
            onPress={onRightIconPress}
            activeOpacity={0.5}>
            <Icon name={rightIcon} color={pallets.primary} size={20} />
          </TouchableOpacity>
        )}
        {!rightIcon && !rightLabel && value && !hideRightLabel && (
          <TouchableOpacity
            style={styles.rightBox}
            onPress={onRightIconPress}
            activeOpacity={0.5}>
            <Text color={pallets.primary} size={subhead} variant="medium">
              {placeholder}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          marginBottom,
          marginTop: noteVisible || error ? 5 : 0,
        }}>
        {error && (
          <View
            style={{
              alignItems: 'flex-end',
              flex: 1,
            }}>
            <Text variant="light" size={subhead} color={pallets.red}>
              {errorMessage}
            </Text>
          </View>
        )}
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    borderRadius: inputRadius,
    flexDirection: 'row',
    height,
    overflow: 'hidden',
  },
  input: {
    flex: 1,
    fontSize: subhead,
    paddingLeft: 12,
  },
  note: {
    alignItems: 'flex-end',
    flex: 1,
  },
  rightBox: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingRight: 12,
  },
});

export default FormInput;
