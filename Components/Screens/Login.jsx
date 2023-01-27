import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Button,
    Dimensions,
} from 'react-native';
import { postData } from '../../Services/FetchNodeServices';
import Input from '../UiComponents/Input';
import AppButton from '../UiComponents/Button';

const { width, height } = Dimensions.get('window')

const Login = () => {
    const [inputs, setInputs] = useState({ mobileEmail: '',/* password: ''*/ })
    const [error, setError] = useState({})
    const validate = () => {
        var isValid = true
        if (!inputs.mobileEmail) {
            handleErrors("Pls Enter your Emailid/Mobile", "mobileEmail")
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
            alert(result.status)
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
                <Input labelTxt="Enter your Mobile Number" iconName="phone" placeholder="Mobile Number" error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />
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
        /*backgroundColor: '#fff',*/
        width: width * 0.84,
        borderRadius: 16,
        marginTop: '32%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default Login;
