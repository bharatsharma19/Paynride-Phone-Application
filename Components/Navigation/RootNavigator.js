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
import {Text, Image, View} from 'react-native';
import AppHeader from '../UiComponents/Common/AppHeader';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function RootNavigator() {
  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="HomePage"
          component={Home}
          options={{headerShown: false}}
        />
      </Drawer.Navigator>
    );
  };

  const CustomDrawerContent = props => {
    return (
      <DrawerContentScrollView {...props}>
        <View
          style={{
            display: 'flex',
            padding: 20,
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <Image
            style={{
              marginBottom: 5,
              borderRadius: 50,
              resizeMode: 'contain',
              width: 100,
              height: 100,
            }}
            source={require('../Assets/transparent_logo.png')}
          />
          <Text>+910000000000</Text>
          <Text style={{fontSize: 12}}>paynride1909@gmail.com</Text>
        </View>
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
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="Home"
        component={ProjectDrawer}
        options={{
          header: AppHeader,
        }}
      />
    </Stack.Navigator>
  );
}
