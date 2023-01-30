import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import { postData } from '../../Services/FetchNodeServices';
import Input from '../UiComponents/Input';
import AppButton from '../UiComponents/Button';

const { width, height } = Dimensions.get('window')

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({ mobileEmail: '',/* password: ''*/ })
    const [error, setError] = useState({})
    const validate = () => {
        var isValid = true
        if (!inputs.mobileEmail) {
            handleErrors("Pls Enter your Mobile Number", "mobileEmail")
            isValid = false
        }
        /*
        if (!inputs.password) {
            handleErrors("Pls input password..", "password")
            isValid = false
        }
        */
        return isValid
    }

    const handleLoginClick = async () => {
        if (validate()) {
            var result = await postData('user/checkuser', { mobileno: inputs.mobileEmail })

            if (result.status) {
                navigation.navigate("Home")
            }
            else {
                alert("Please Sign Up to Continue...")
            }
        }
        else {
            alert("Please Enter your Mobile Number to Continue...")
        }
    }
    const handleValues = (txt, attr) => {
        setInputs(prevStates => ({ ...prevStates, [attr]: txt }))
    }

    const handleErrors = (txt, attr) => {
        setError(prevStates => ({ ...prevStates, [attr]: txt }))
    }

    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Input labelTxt="Login" iconName="phone" placeholder="Mobile Number" keyboardType="numeric" error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />
                <AppButton onPress={handleLoginClick} btnWidth={0.75} buttonText={'Sign In'} bgColor='#e67e22' />
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
        width: width * 0.84,
        borderRadius: 16,
        marginTop: '32%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default Login;
