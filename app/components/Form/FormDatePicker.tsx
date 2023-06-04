import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { useState } from 'react';

import { Text } from '../General';

import { layout, pallets } from 'constant';

interface Props {
  label: string;
  marginBottom?: number;
  defaultValue?: Date;
  onDateSelect: (date: Date) => void;
}

export default function FormDatePicker({
  label,
  marginBottom,
  defaultValue,
  onDateSelect,
}: Props): JSX.Element | null {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(defaultValue || new Date());

  const handleDateChange = (_event: DateTimePickerEvent, selected?: Date) => {
    setShowDatePicker(false);
    if (selected) {
      setSelectedDate(selected);
      onDateSelect(selected);
    }
  };

  const handlePress = () => {
    setShowDatePicker(true);
  };

  console.log(label, defaultValue);

  return (
    <View style={[{ marginBottom }]}>
      <TouchableOpacity onPress={handlePress} style={styles.datePickerButton}>
        <Text size={layout.fonts.subhead}>
          {(selectedDate && selectedDate.toDateString()) || 'Select Date'}
        </Text>
        <Text
          style={[
            {
              color: selectedDate ? pallets.primary : pallets.darkGrey,
              fontSize: layout.fonts.subhead,
            },
          ]}>
          {label}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  datePickerButton: {
    alignItems: 'center',
    backgroundColor: pallets.grey,
    borderColor: pallets.inactive,
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
});
