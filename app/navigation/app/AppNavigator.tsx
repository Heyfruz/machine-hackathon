import { createStackNavigator } from '@react-navigation/stack';

import { AppRoutes } from '../types';

import Drawer from './Drawer';

const { Navigator, Screen } = createStackNavigator<AppRoutes>();

export default function AppNavigator() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="DrawerStack" component={Drawer} />
    </Navigator>
  );
}
