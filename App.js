import {React} from 'react';
import {View, Dimensions} from 'react-native';
import Login from './Components/Screens/Login';

const {width, height} = Dimensions.get('window');

const App = () => {
  return (
    <View
      style={{backgroundColor: '#fff', width: width * 1, height: height * 1}}>
      <Login />
    </View>
  );
};

export default App;
