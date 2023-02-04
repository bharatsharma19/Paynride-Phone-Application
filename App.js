import {NavigationContainer} from '@react-navigation/native';
import {React} from 'react';
import {View, Dimensions} from 'react-native';
import RootNavigator from './Components/Navigation/RootNavigator';

import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

const {width, height} = Dimensions.get('window');

const App = () => {
  return (
    <View style={{backgroundColor: '#fff', width: width * 1, height: height}}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
};

export default App;
