import React from 'react';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="HomePage" component={Home} />
      </Drawer.Navigator>
    );
  };

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="My Profile"
          icon={() => <Icon name="account-details-outline" size={20} />}
        />
        <DrawerItem
          label="Settings"
          icon={() => <Icon name="account-settings" size={20} />}
        />
        <DrawerItem
          label="Logout"
          icon={() => <Icon name="logout" size={20} />}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Home" component={ProjectDrawer} />
    </Stack.Navigator>
  );
}
