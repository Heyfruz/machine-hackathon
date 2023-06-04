import { Ionicons } from '@expo/vector-icons';

type IconName = Pick<React.ComponentProps<typeof Ionicons>, 'name'>['name'];

interface FormDataBase {
  name: string;
  isEditable: boolean;
  onChangeText?: (e: string) => void;
  id: string;
}

interface FormFieldProps extends FormDataBase {
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
  keyBoardType?:
    | 'default'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
}

interface FormInputData extends FormFieldProps {
  type: 'text';
  marginBottom?: number;
}

interface FormNumberInputData extends FormFieldProps {
  type: 'number';
  marginBottom?: number;
  keyBoardType?:
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'numbers-and-punctuation'
    | 'name-phone-pad';
}

interface FormDateData extends FormDataBase {
  type: 'date';
  label: string;
  marginBottom?: number;
}

interface FormCheckData extends FormDataBase {
  type: 'checkbox';
  name: string;
  label: string;
  marginBottom?: number;
}

export type FormListData =
  | FormInputData
  | FormDateData
  | FormCheckData
  | FormNumberInputData;
