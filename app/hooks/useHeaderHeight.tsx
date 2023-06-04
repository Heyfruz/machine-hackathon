import { getDefaultHeaderHeight } from '@react-navigation/elements';
import {
  EdgeInsets,
  useSafeAreaFrame,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

interface Props {
  headerHeight: number;
  insets: EdgeInsets;
}

export default function useHeaderHeight(): Props {
  const frame = useSafeAreaFrame();
  const insets = useSafeAreaInsets();

  const headerHeight = getDefaultHeaderHeight(frame, false, insets.top);

  return { headerHeight, insets };
}
