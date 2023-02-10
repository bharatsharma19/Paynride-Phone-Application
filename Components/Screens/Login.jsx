import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    TouchableOpacity,
    Text
} from 'react-native';
import { postData } from '../Services/FetchNodeServices';
import Input from '../UiComponents/Common/Input';
import AppButton from '../UiComponents/Common/Button';
import { storeData } from '../Storage/AsyncStorage';

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
                storeData('UserData', result.data)
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

    const handleRegisterBtn = () => {
        navigation.navigate("Register")
    }

    return (
        <>
            <View style={styles.container}>
                <Text style={{
                    marginTop: 16,
                    paddingVertical: 8,
                    color: '#20232a',
                    textAlign: 'center',
                    fontSize: 22,
                    fontWeight: 'bold',
                    fontFamily: 'Poppins',
                    marginBottom: 4,
                }}>
                    Login
                </Text>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Input iconName="phone" placeholder="Mobile Number" keyboardType="numeric" error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />

                    <AppButton onPress={handleLoginClick} btnWidth={0.78} buttonText={'Sign In'} bgColor='#2980b9' borderRadius={24} />
                </View>
                <TouchableOpacity onPress={handleRegisterBtn}>
                    <View style={{ marginTop: height * 0.008, marginLeft: "auto", marginRight: "auto", }}>
                        <Text style={{ color: "#000", fontSize: 20, fontWeight: 500, }}>
                            Don't Have an Account? Sign Up
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
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
