import {React, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Alert,
} from 'react-native';

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View>
        <SafeAreaView>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter your Email"
          />
        </SafeAreaView>
      </View>
      <View>
        <SafeAreaView>
          <TextInput
            keyboardType="default"
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter your Password"
            secureTextEntry
          />
        </SafeAreaView>
      </View>
      <View style={styles.loginBtnView}>
        <Button
          style={styles.loginBtn}
          title="Login"
          onPress={() => Alert.alert('Login Button Presses')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 24,
    height: 'auto',
    backgroundColor: '#f5f5f5',
    width: '84%',
    borderRadius: 16,
  },

  title: {
    marginTop: 16,
    paddingVertical: 8,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },

  loginBtnView: {
    width: '93%',
    margin: 12,
    padding: 10,
  },

  loginBtn: {
    elevation: 4,
  },
});

export default App;
