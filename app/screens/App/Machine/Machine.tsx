import { FlatList, StyleSheet, View } from 'react-native';
import * as Crypto from 'expo-crypto';

import { MachineForm } from './Components';

import { FloatingButton, Header } from 'components';
import { addMachine, useDispatch, useSelector } from 'store';
import { layout } from 'constant';

export default function Machine(): JSX.Element {
  const { machines } = useSelector(state => state.machines);
  const dispatch = useDispatch();

  return (
    <>
      <Header drawer title="Machine" />
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={machines}
          renderItem={({ item }) => {
            return <MachineForm machine={item} />;
          }}
        />
        <View style={{ padding: layout.spacing.padding }}>
          <FloatingButton
            onPress={() => {
              dispatch(
                addMachine({
                  attributes: [],
                  id: Crypto.randomUUID(),
                  name: '',
                }),
              );
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
