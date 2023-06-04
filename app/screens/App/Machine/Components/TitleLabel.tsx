import { useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import { BottomSheet, Text } from 'components';
import { Handles } from 'components/Screen/BottomSheet';
import { layout, pallets } from 'constant';
import { Attributes, updateMachineTitleField, useDispatch } from 'store';

interface Props {
  machineId: string;
  attributes: Attributes[];
  label: string;
}

export default function TitleLabel({
  machineId,
  label,
  attributes,
}: Props): JSX.Element | null {
  const dispatch = useDispatch();
  const ref = useRef<Handles>(null);

  return (
    <>
      <TouchableOpacity
        disabled={attributes.length === 0}
        style={styles.container}
        onPress={() => ref.current?.handleOpen()}>
        <Text style={{ color: pallets.white }}>
          Title Field{label ? `: ${label}` : ''}
        </Text>
      </TouchableOpacity>
      <BottomSheet {...{ ref }}>
        <FlatList
          data={attributes}
          ItemSeparatorComponent={() => (
            <View
              style={{
                alignSelf: 'center',
                backgroundColor: pallets.darkGrey,
                height: 1,
                width: '95%',
              }}
            />
          )}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  dispatch(
                    updateMachineTitleField({
                      machineId,
                      titleField: item.label,
                    }),
                  );
                  ref.current?.handleClose();
                }}
                style={styles.pickerItem}>
                <Text size={16}>{item.label}</Text>
              </TouchableOpacity>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: pallets.primary,
    borderRadius: layout.input.inputRadius2,
    justifyContent: 'center',
    padding: layout.input.padding,
  },
  pickerItem: {
    alignItems: 'center',
    padding: 12,
    width: '100%',
  },
});
