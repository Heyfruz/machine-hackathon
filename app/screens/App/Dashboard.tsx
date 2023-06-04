import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { Container, Divider, FormCheck, Header, Text } from 'components';
import { updateMachineAttributeValue, useDispatch, useSelector } from 'store';
import { DrawerRoutes } from 'navigation';
import { pallets } from 'constant';
import FormInput from 'components/Form/FormInput';
import FormDatePicker from 'components/Form/FormDatePicker';

const marginBottom = 20;

export default function Dashboard({
  navigation,
}: DrawerScreenProps<DrawerRoutes, 'Dashboard'>): JSX.Element {
  const { machines } = useSelector(state => state.machines);
  const dispatch = useDispatch();

  return (
    <>
      <Header title="Dashboard" drawer />
      <Container>
        <FlatList
          data={machines}
          ListEmptyComponent={() => {
            return (
              <View style={styles.emptyContainer}>
                <Text>You have no machine available</Text>
                <Divider space="s" />
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    navigation.navigate('Machine');
                  }}>
                  <Text color={pallets.white}>Add new Machine</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          renderItem={({ item: { attributes, id, name } }) => {
            return (
              <>
                <View style={{ marginBottom: 12 }}>
                  <Text variant="bold" size={24}>
                    {name}
                  </Text>
                </View>
                {attributes.map((item, index) => {
                  switch (item.type) {
                    case 'number':
                      return (
                        <FormInput
                          key={index}
                          placeholder={item.label}
                          keyboardType="number-pad"
                          value={
                            typeof item.value === 'string'
                              ? item.value
                              : undefined
                          }
                          onChangeText={text => {
                            dispatch(
                              updateMachineAttributeValue({
                                attributeId: item.id,
                                machineId: id,
                                value: text,
                              }),
                            );
                          }}
                          marginBottom={marginBottom}
                        />
                      );
                    case 'text':
                      return (
                        <FormInput
                          key={index}
                          placeholder={item.label}
                          marginBottom={marginBottom}
                          value={
                            typeof item.value === 'string'
                              ? item.value
                              : undefined
                          }
                          onChangeText={text => {
                            dispatch(
                              updateMachineAttributeValue({
                                attributeId: item.id,
                                machineId: id,
                                value: text,
                              }),
                            );
                          }}
                        />
                      );
                    case 'checkbox':
                      return (
                        <FormCheck
                          onChange={val => {
                            dispatch(
                              updateMachineAttributeValue({
                                attributeId: item.id,
                                machineId: id,
                                value: val,
                              }),
                            );
                          }}
                          marginBottom={marginBottom}
                          value={Boolean(item.value)}
                          key={index}
                          label={item.label}
                        />
                      );
                    case 'date':
                      return (
                        <FormDatePicker
                          key={index}
                          label={item.label}
                          marginBottom={marginBottom}
                          onDateSelect={date => {
                            dispatch(
                              updateMachineAttributeValue({
                                attributeId: item.id,
                                machineId: id,
                                value: date.toISOString(),
                              }),
                            );
                          }}
                          defaultValue={
                            typeof item.value === 'object'
                              ? item.value
                              : (undefined as unknown as Date)
                          }
                        />
                      );
                    default:
                      return null;
                  }
                })}
                <Divider />
              </>
            );
          }}
        />
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: pallets.primary,
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
