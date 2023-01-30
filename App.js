import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {React} from 'react';
import {View, Dimensions} from 'react-native';
import Home from './Components/Screens/Home';
import Login from './Components/Screens/Login';

const {width, height} = Dimensions.get('window');
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View
      style={{backgroundColor: '#fff', width: width * 1, height: height * 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;
