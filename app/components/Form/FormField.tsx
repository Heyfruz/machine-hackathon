import { forwardRef } from 'react';
import { useFormikContext } from 'formik';
import { TextInput, TextInputProps } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';

import FormInput from './FormInput';

export interface FieldKeys {
  email: string;
  name: string;
  password: string;
  id: string;
}

type IconName = Pick<React.ComponentProps<typeof Icon>, 'name'>['name'];

interface FormFieldProps extends TextInputProps {
  name: keyof FieldKeys | Omit<string, keyof FieldKeys>;
  placeholder: string;
  placeholderColor?: string;
  onTextChange?: (text: string) => void;
  disabled?: boolean;
  marginBottom?: number;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  borderWidth?: number;
}

const FormField = forwardRef<TextInput, FormFieldProps>(
  (
    {
      name,
      placeholder,
      placeholderColor,
      onTextChange,
      disabled,
      marginBottom,
      onRightLabelPress,
      rightIcon,
      onRightIconPress,
      rightLabel,
      borderWidth,
      ...props
    }: FormFieldProps,
    ref,
  ): JSX.Element | null => {
    const {
      setFieldTouched,
      setFieldValue,
      errors,
      touched,
      handleSubmit,
      values,
    } = useFormikContext<FieldKeys>();

    const _name = name as unknown as keyof FieldKeys;

    const error = !!(errors[_name] && touched[_name]);
    // const error = Boolean(errors[name]);

    return (
      <>
        <FormInput
          onChangeText={text => {
            setFieldValue(_name, text);
            onTextChange?.(text);
          }}
          onBlur={() => {
            setFieldTouched(_name);
          }}
          onSubmitEditing={() => handleSubmit()}
          errorMessage={errors[_name]}
          value={values[_name]}
          {...{
            borderWidth,
            disabled,
            error,
            marginBottom,
            onRightIconPress,
            onRightLabelPress,
            placeholder,
            placeholderColor,
            ref,
            rightIcon,
            rightLabel,
          }}
          {...props}
        />
      </>
    );
  },
);

export default FormField;
