import { createDrawerNavigator } from '@react-navigation/drawer';

import { DrawerRoutes } from 'navigation/types';
import { Dashboard, Drawer, Machine, MachineDetails } from 'screens';

const { Navigator, Screen } = createDrawerNavigator<DrawerRoutes>();

export default function DrawerNavigator() {
  return (
    <Navigator
      drawerContent={props => <Drawer {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Dashboard" component={Dashboard} />
      <Screen name="Machine" component={Machine} />
      <Screen name="MachineDetails" component={MachineDetails} />
    </Navigator>
  );
}
