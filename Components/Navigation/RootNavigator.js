import {React, useState, useEffect} from 'react';
import Login from '../Screens/Login';
import Home from '../Screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {Text, Image, View, ActivityIndicator, StyleSheet} from 'react-native';
import AppHeader from '../UiComponents/Common/AppHeader';
import {getStoreData} from '../../Storage/AsyncStorage';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const RootNavigator = () => {
  const [initialScreen, setInitialScreen] = useState(null);
  const [userMobile, setUserMobile] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');

  const checkAuth = async () => {
    var user = await getStoreData('UserData');

    if (!user) {
      setInitialScreen('Login');
    } else {
      setInitialScreen('Home');
      setUserMobile(user[0].mobileno);
      setUserEmail(user[0].emailid);
      setUserFullName(user[0].fullname);
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);

  const ProjectDrawer = () => {
    return (
      <Drawer.Navigator
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="HomePage"
          component={Home}
          options={{
            headerShown: false,
            drawerIcon: () => <Icon name={'home'} size={24} />,
          }}
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
          {<Text> {userFullName} </Text> ? (
            <View style={{marginBottom: 8}}>
              <Text style={{fontSize: 18}}>
                {' '}
                Hello,{' '}
                <Text style={{fontWeight: 500, fontSize: 18}}>
                  {' '}
                  {userFullName}{' '}
                </Text>
              </Text>
            </View>
          ) : (
            <>
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
            </>
          )}
          <Text style={{fontWeight: 500}}>
            {userMobile ? userMobile : '+917000192752'}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 500}}>
            {userEmail ? userEmail : 'paynride1909@gmail.com'}
          </Text>
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
    <NavigationContainer>
      {initialScreen ? (
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={ProjectDrawer}
            options={{
              header: AppHeader,
            }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size="large" color="#8e44ad" />
          </View>
        </>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default RootNavigator;
