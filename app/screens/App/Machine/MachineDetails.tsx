import { StyleSheet } from 'react-native';
import { DrawerScreenProps } from '@react-navigation/drawer';

import { updateMachineAttributeValue, useDispatch, useSelector } from 'store';
import { Container, FormCheck, Header, VirtualScroll } from 'components';
import { DrawerRoutes } from 'navigation';
import FormInput from 'components/Form/FormInput';
import FormDatePicker from 'components/Form/FormDatePicker';

const marginBottom = 20;

export default function MachineDetail({
  route,
}: DrawerScreenProps<DrawerRoutes, 'MachineDetails'>) {
  const { id } = route.params;
  const machine = useSelector(state =>
    state.machines.machines.find(mac => mac.id === id),
  );

  const dispatch = useDispatch();

  return (
    <>
      <Header title={machine?.name || ''} drawer />
      <VirtualScroll>
        <Container style={styles.container}>
          {machine?.attributes.map((item, index) => {
            switch (item.type) {
              case 'number':
                return (
                  <FormInput
                    key={index}
                    placeholder={item.label}
                    keyboardType="number-pad"
                    value={
                      typeof item.value === 'string' ? item.value : undefined
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
                      typeof item.value === 'string' ? item.value : undefined
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
        </Container>
      </VirtualScroll>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
