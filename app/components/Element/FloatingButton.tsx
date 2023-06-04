import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { layout, pallets } from 'constant';

interface Props {
  onPress: () => void;
}

export default function FloatingButton({ onPress }: Props): JSX.Element | null {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        onPress?.();
        console.log('PRessed');
      }}>
      <Ionicons name="add" size={18} color={pallets.white} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: pallets.accent,
    borderRadius: 50 / 2,
    bottom: layout.spacing.padding * 4,
    flex: 1,
    height: 50,
    justifyContent: 'center',
    position: 'absolute',
    right: layout.spacing.padding,
    width: 50,
  },
});
