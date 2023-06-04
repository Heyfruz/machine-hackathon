import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from 'components';
import { Machine, useSelector } from 'store';
import { pallets } from 'constant';

type DrawerContentProps = DrawerContentComponentProps;

interface DrawerItemProps {
  label: string;
  onPress: () => void;
  focused: boolean;
}

const DrawerItem: React.FC<DrawerItemProps> = ({ label, onPress, focused }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text
        color={focused ? pallets.primary : pallets.text}
        style={styles.itemText}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default function DrawerContent({
  navigation,
  state,
}: DrawerContentProps): JSX.Element | null {
  const { machines } = useSelector(s => s.machines);

  const handleMachinePress = (machineId: string) => {
    navigation.navigate('MachineDetails', { id: machineId });
  };

  const isRouteFocused = (routeName: string) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return state.routes?.[state.index].name === routeName;
  };

  const renderMachineItem = ({ item }: { item: Machine }) => {
    const focused =
      isRouteFocused('MachineDetails') &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      item.id === state.routes[state.index].params?.id;

    return (
      <DrawerItem
        label={item.name}
        onPress={() => handleMachinePress(item.id)}
        focused={focused}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={machines}
        renderItem={renderMachineItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <>
            <DrawerItem
              label="Dashboard"
              onPress={() => navigation.navigate('Dashboard')}
              focused={isRouteFocused('Dashboard')}
            />
            <DrawerItem
              label="Machine"
              onPress={() => navigation.navigate('Machine')}
              focused={isRouteFocused('Machine')}
            />
          </>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: pallets.card,
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
