import {React} from 'react';
import {View, Dimensions} from 'react-native';
import RootNavigator from './Components/Navigation/RootNavigator';
import RootReducer from './Components/Storage/RootReducer';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

const {width, height} = Dimensions.get('window');

var store = createStore(RootReducer);

const App = () => {
  return (
    <View style={{backgroundColor: '#fff', width: width * 1, height: height}}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </View>
  );
};

export default App;
