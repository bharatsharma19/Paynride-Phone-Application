import { React, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
    Button,
    Alert,
} from 'react-native';
import { postData } from '../../Services/FetchNodeServices';

const Login = () => {
    const [mobile, setMobile] = useState('');

    const handleLoginClick = async () => {
        var result = await postData("user/checkuser", { mobileno: mobile })

        Alert.alert(result.status)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View>
                <SafeAreaView>
                    <TextInput
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={setMobile}
                        value={mobile}
                        placeholder="Enter your Mobile Number"
                    />
                </SafeAreaView>
            </View>
            <View style={styles.loginBtnView}>
                <Button
                    style={styles.loginBtn}
                    title="Login"
                    onPress={handleLoginClick}
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
        marginTop: '32%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    title: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        marginBottom: 12,
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

export default Login;
