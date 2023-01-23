import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
} from 'react-native';
import { postData } from '../../Services/FetchNodeServices';
import Input from '../UiComponents/Input';

const { width, height } = Dimensions.get('window')

const Login = () => {
    const [mobile, setMobile] = useState('');

    const handleLoginClick = async () => {
        var result = await postData("user/checkuser", { mobileno: mobile })

        alert(result.status)
    }

    return (
        <View style={styles.container}>
            <View>
                <Input labelTxt="Enter your Mobile Number" placeholder="Mobile Number" setValue={setMobile} />
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
        height: height * 0.32,
        /*backgroundColor: '#fff',*/
        width: width * 0.84,
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
        marginBottom: 24,
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
