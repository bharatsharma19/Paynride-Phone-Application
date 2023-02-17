import {React, useState, useEffect} from 'react';
import Login from '../Screens/Login';
import HomePage from '../Screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Text,
  Image,
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AppHeader from '../UiComponents/Common/AppHeader';
import {getStoreData} from '../Storage/AsyncStorage';
import UserProfile from '../Screens/UserProfile';
import Bookings from '../Screens/Bookings';
import SignUp from '../Screens/SignUp';
import FinalBooking from '../Screens/FinalBooking';

const {width, height} = Dimensions.get('window');

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
          name="PaynRide"
          component={HomePage}
          options={{
            headerShown: false,
            drawerIcon: () => <Icon name={'home'} size={24} color={'#000'} />,
          }}
        />
        <Drawer.Screen
          name="My Profile"
          component={UserProfile}
          options={{
            headerShown: false,
            drawerIcon: () => (
              <Icon name={'account-details-outline'} size={24} color={'#000'} />
            ),
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
              <Text style={{fontSize: 18, color: '#000'}}>
                {' '}
                Hello,{' '}
                <Text style={{fontWeight: 500, fontSize: 18, color: '#000'}}>
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
          <Text style={{fontWeight: 500, color: '#000'}}>
            {userMobile ? userMobile : '+917000192752'}
          </Text>
          <Text style={{fontSize: 12, fontWeight: 500, color: '#000'}}>
            {userEmail ? userEmail : 'paynride1909@gmail.com'}
          </Text>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem
          label="My Bookings"
          icon={() => <Icon name="car-multiple" size={20} color={'#000'} />}
        />
        <DrawerItem
          label="Logout"
          icon={() => <Icon name="logout" size={20} color={'#000'} />}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      {initialScreen ? (
        <Stack.Navigator initialRouteName={initialScreen}>
          <Stack.Screen
            name="Register"
            component={SignUp}
            options={{headerShown: false}}
          />
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
          <Stack.Screen
            name="Profile"
            component={ProjectDrawer}
            options={{
              header: AppHeader,
            }}
          />
          <Stack.Screen
            name="AvailableCars"
            component={Bookings}
            options={{
              header: AppHeader,
            }}
          />
          <Stack.Screen
            name="FinalBooking"
            component={FinalBooking}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator
              size="large"
              style={{transform: [{scaleX: 2}, {scaleY: 2}]}}
              color="#8e44ad"
            />
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
    height: height,
    width: width * 1,
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default RootNavigator;
