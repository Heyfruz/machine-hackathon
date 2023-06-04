import { useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import BottomSheet, { Handles } from 'components/Screen/BottomSheet';
import { pallets } from 'constant';
import { Text } from 'components';

interface Props {
  items: { value: string; label: string }[];
  onSelect?: (item: { value: string; label: string }) => void;
  selected?: { value: string; label: string };
  height?: number;
  borderWidth?: number;
}

export default function AttributePicker({
  items,
  onSelect,
  height,
  selected,
  borderWidth = 1,
}: Props): JSX.Element {
  const ref = useRef<Handles>(null);

  return (
    <>
      <TouchableOpacity
        style={[styles.container, { borderWidth, height }]}
        onPress={() => ref.current?.handleOpen()}>
        {selected ? (
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text textTransform="capitalize" color={pallets.accent}>
              {selected.label}
            </Text>
            <Ionicons
              name="chevron-down"
              size={10}
              style={{
                color: pallets.accent,
                opacity: 0.4,
              }}
            />
          </View>
        ) : (
          <Text
            textTransform="capitalize"
            size={14}
            style={{ color: pallets.grey2, fontWeight: '700' }}>
            Add Property
          </Text>
        )}
      </TouchableOpacity>
      <BottomSheet {...{ ref }}>
        <FlatList
          data={items}
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
                  onSelect?.(item);
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
    borderColor: pallets.darkGrey,
    borderRadius: 4,
    borderStyle: 'dashed',
    justifyContent: 'center',
    paddingVertical: 8,
    width: '100%',
  },
  pickerItem: {
    alignItems: 'center',
    padding: 12,
    width: '100%',
  },
});
