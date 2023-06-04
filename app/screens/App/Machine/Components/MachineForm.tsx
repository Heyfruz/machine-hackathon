import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Crypto from 'expo-crypto';

import AttributePicker from './AttributePicker';
import TitleLabel from './TitleLabel';

import { Divider, Text } from 'components';
import { layout, pallets } from 'constant';
import {
  Attributes,
  Machine,
  addMachineAttribute,
  deleteMachine,
  deleteMachineAttribute,
  updateMachineAttribute,
  updateMachineName,
  useDispatch,
} from 'store';
import FormInput from 'components/Form/FormInput';

const attributes: {
  label: string;
  value: Attributes['type'];
}[] = [
  { label: 'Text', value: 'text' },
  { label: 'Date', value: 'date' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Number', value: 'number' },
];

interface Props {
  machine: Machine;
}

const MachineTypeForm = ({ machine }: Props) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <FormInput
        hideRightLabel
        value={machine.name}
        placeholder="Machine Type Name"
        onChangeText={text => {
          dispatch(
            updateMachineName({
              id: machine.id,
              name: text,
            }),
          );
        }}
        onEndEditing={text => {
          dispatch(
            updateMachineName({
              id: machine.id,
              name: text.nativeEvent.text,
            }),
          );
        }}
      />
      {machine.attributes.map((item, index) => {
        return (
          <View
            style={[styles.row, styles.attrInput, { marginBottom: 20 }]}
            key={index}>
            <View style={{ flex: 0.55 }}>
              <FormInput
                hideRightLabel
                editable={machine.name.length > 0}
                borderWidth={0}
                value={item.label}
                placeholder="Field"
                marginBottom={0}
                onChangeText={text => {
                  dispatch(
                    updateMachineAttribute({
                      attribute: {
                        id: item.id,
                        label: text,
                        type: item.type,
                      },
                      attributeId: item.id,
                      machineId: machine.id,
                    }),
                  );
                }}
              />
            </View>
            <View style={styles.box}>
              <AttributePicker
                borderWidth={0}
                height={layout.input.height}
                items={attributes}
                onSelect={i => {
                  dispatch(
                    updateMachineAttribute({
                      attribute: {
                        id: item.id,
                        label: item.label,
                        type: i.value as Attributes['type'],
                      },
                      attributeId: item.id,
                      machineId: machine.id,
                    }),
                  );
                }}
                selected={{ label: item.type, value: item.type }}
              />
            </View>
            <TouchableOpacity
              style={styles.trash}
              onPress={() => {
                dispatch(
                  deleteMachineAttribute({
                    attributeId: item.id,
                    machineId: machine.id,
                  }),
                );
              }}>
              <Ionicons name="trash" size={18} color={pallets.red} />
            </TouchableOpacity>
          </View>
        );
      })}
      <TitleLabel
        attributes={machine.attributes}
        machineId={machine.id}
        label={machine.titleField || ''}
      />
      <Divider space="s" />
      <View style={[styles.row]}>
        <View style={{ flex: 0.73 }}>
          <AttributePicker
            items={attributes}
            onSelect={item => {
              dispatch(
                addMachineAttribute({
                  attribute: {
                    id: Crypto.randomUUID(),
                    label: '',
                    type: item.value as Attributes['type'],
                  },
                  machineId: machine.id,
                }),
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => {
            dispatch(deleteMachine(machine.id));
          }}>
          <Text color={pallets.white} style={{ marginRight: 2 }}>
            Remove
          </Text>
          <Ionicons name="trash-outline" color={pallets.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  attrInput: {
    backgroundColor: pallets.grey,
    borderRadius: layout.input.inputRadius,
  },
  box: {
    flex: 0.3,
    height: layout.input.height,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  removeButton: {
    alignItems: 'center',
    backgroundColor: pallets.red,
    borderRadius: 4,
    flex: 0.25,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trash: {
    alignItems: 'center',
    flex: 0.1,
    height: layout.input.height,
    justifyContent: 'center',
  },
});

export default MachineTypeForm;
