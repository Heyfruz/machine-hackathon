import { NavigationContainer, Theme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

import { AppNavigator } from 'navigation';
import { pallets } from 'constant';

/**
 * All app loading logics, including splashScreenHide, required API calls, rehydration, navigation states, asset loading, theming etc. are meant to be here
 */

export default function LoadApp(): JSX.Element {
  const theme: Theme = {
    colors: {
      background: pallets.background,
      border: pallets.border,
      card: pallets.card,
      notification: pallets.notification,
      primary: pallets.primary,
      text: pallets.text,
    },
    dark: false,
  };

  return (
    <>
      <NavigationContainer {...{ theme }}>
        <SafeAreaProvider>
          <AppNavigator />
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
        </SafeAreaProvider>
      </NavigationContainer>
    </>
  );
}
