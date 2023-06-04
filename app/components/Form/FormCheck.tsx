import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { useState } from 'react';

import { Text } from '../General';

import { layout, pallets } from 'constant';

const { subhead } = layout.fonts;

interface Props {
  label: string;
  marginBottom?: number;
  value?: boolean;
  onChange?: (value: boolean) => void;
}

export default function FormCheck({
  label,
  marginBottom,
  onChange,
  value,
}: Props): JSX.Element | null {
  const [state, setState] = useState(value);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.container, { marginBottom }]}
      onPress={() =>
        setState(prev => {
          onChange?.(!prev);
          return !prev;
        })
      }>
      <Text
        textTransform="capitalize"
        size={subhead}
        color={pallets.text}
        style={{ flex: 1 }}>
        {label}
      </Text>
      <Icon
        size={20}
        name={state ? 'checkbox-outline' : 'square-outline'}
        style={{ marginRight: 8 }}
        color={state ? pallets.primary : pallets.black}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: pallets.grey,
    borderColor: pallets.inactive,
    borderRadius: layout.input.inputRadius,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 12,
    paddingVertical: 12,
  },
});
