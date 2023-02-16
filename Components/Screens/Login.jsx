import { React, useState } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text,
    Modal,
    TextInput,
    Alert,
    Image
} from 'react-native';
import { postData } from '../Services/FetchNodeServices';
import Input from '../UiComponents/Common/Input';
import AppButton from '../UiComponents/Common/Button';
import { storeData } from '../Storage/AsyncStorage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const { width, height } = Dimensions.get('window')

const Login = ({ navigation }) => {
    const [inputs, setInputs] = useState({ mobileEmail: '', enteredOtp: '' })
    const [error, setError] = useState({})
    const validate = () => {
        var isValid = true

        if (!inputs.mobileEmail) {
            handleErrors("Pls Enter your Mobile Number", "mobileEmail")
            isValid = false
        }
        return isValid
    }

    const [userDetails, setUserDetails] = useState([])

    var [valueOne, setValueOne] = useState("")
    var [valueTwo, setValueTwo] = useState("")
    var [valueThree, setValueThree] = useState("")
    var [valueFour, setValueFour] = useState("")
    var [valueFive, setValueFive] = useState("")
    var [valueSix, setValueSix] = useState("")

    const [generatedOtp, setGeneratedOtp] = useState("")
    const [enteredOtp, setEnteredOtp] = useState("")

    const handleEnteredOtp = (txt) => {
        setEnteredOtp(parseInt(valueOne + valueTwo + valueThree + valueFour + valueFive + txt))
    }

    const checkUser = async (mobileNumber) => {
        var response = await postData("user/checkuser", { mobileno: mobileNumber });
        setUserDetails(response)
    }

    const handleOtpClick = async () => {
        if (validate()) {
            if (inputs.mobileEmail.length === 10) {
                checkUser(inputs.mobileEmail)

                let otp = parseInt(Math.random() * 899999) + 100000
                setGeneratedOtp(otp)
                console.warn(otp)
                setModalVisible(true)
            }
            else {
                alert("Mobile Number shouls be of 10 Digits")
            }
        }
        else {
            alert("Please Enter your Mobile Number to Continue...")
        }
    }

    const handleLoginClick = async () => {
        let tempOtp = await parseInt(enteredOtp)

        console.log(enteredOtp)
        console.log(tempOtp)

        if (generatedOtp === tempOtp) {
            setModalVisible(false)

            if (userDetails.status) {
                var result = await postData('user/checkuser', { mobileno: inputs.mobileEmail })

                if (result.status) {
                    storeData('UserData', result.data)
                    navigation.navigate("Home")

                    Alert.alert('Success', 'Logged In Successfully...');
                }
                else {
                    alert("Error")
                }
            }
            else {
                alert("You are not registered, Sign Up to Continue...")
                navigation.navigate("Register")
            }
        }
        else {
            alert("Invalid Otp!")
        }
    }
    const handleValues = (txt, attr) => {
        setInputs(prevStates => ({ ...prevStates, [attr]: txt }))
    }
    const handleErrors = (txt, attr) => {
        setError(prevStates => ({ ...prevStates, [attr]: txt }))
    }

    const [modalVisible, setModalVisible] = useState(false);

    function otpModal() {
        return (
            <>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('City Selected!');
                        setModalVisible(!modalVisible);
                    }} >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>

                            <Text style={{ fontSize: 24, fontWeight: 700, color: "#000", }}>
                                Verification
                            </Text>
                            <Text style={{ fontSize: 16, fontWeight: 500, color: "#353b48", }}>
                                A 6-Digit Otp has been sent to your mobile number. Enter it below to Continue...
                            </Text>
                            <View style={styles.innerContainer}>

                                <View style={styles.otpMainContainer}>

                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            cursorColor='#000'
                                            keyboardType={'number-pad'}
                                            maxLength={1} onChangeText={(txt) => setValueOne(txt)}
                                            value={valueOne}
                                            color='#000'
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            keyboardType={'number-pad'}
                                            maxLength={1} onChangeText={(txt) => setValueTwo(txt)}
                                            value={valueTwo}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            keyboardType={'number-pad'}
                                            maxLength={1} onChangeText={(txt) => setValueThree(txt)}
                                            value={valueThree}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            keyboardType={'number-pad'}
                                            maxLength={1} onChangeText={(txt) => setValueFour(txt)}
                                            value={valueFour}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            keyboardType={'number-pad'}
                                            maxLength={1} onChangeText={(txt) => setValueFive(txt)}
                                            value={valueFive}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            style={{ fontSize: 24, color: "#000" }}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={(txt) => handleEnteredOtp(txt)}
                                            value={valueSix}
                                        />
                                    </View>

                                </View>

                                <View style={{ marginTop: 24, }}>
                                    <AppButton onPress={handleLoginClick} btnWidth={0.72} buttonText={'Continue'} bgColor='#2980b9' borderRadius={24} />
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        )
    }

    return (
        <>
            <View style={styles.mainContainer}>
                <View style={{ opacity: modalVisible ? 0 : 1, }}>
                    <View style={styles.upperContainer}>
                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                style={{ width: 164, height: 72, resizeMode: 'contain' }}
                                source={require('../Assets/Rentals1.png')}
                            />
                        </View>
                        <View>
                            <Text style={styles.loginTxt}>
                                Welcome,
                            </Text>
                            <Text style={styles.loginSubTxt}>
                                Generate Otp
                            </Text>
                        </View>
                        <View style={styles.subContainer}>
                            <View>
                                <Input iconName="phone" placeholder="Mobile Number" keyboardType="numeric" error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />

                                <AppButton onPress={handleOtpClick} btnWidth={0.78} buttonText={'Get Otp'} bgColor='#2980b9' borderRadius={24} />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 12, }}>
                        <Text style={{ color: '#000', fontSize: 24, textAlign: 'center', }}>
                            OR
                        </Text>
                    </View>
                    <View style={styles.lowerContainer}>
                        <View style={styles.lowerSubContainer}>
                            <Icon name='facebook' style={{ fontSize: 32, color: '#000', marginLeft: 8, }} />
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Text style={{ color: '#000', fontSize: 22, }}>
                                    Continue with Facebook
                                </Text>
                            </View>
                        </View>
                        <View style={styles.lowerSubContainer}>
                            <Icon name='google' style={{ fontSize: 30, color: '#000', marginLeft: 8, }} />
                            <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                <Text style={{ color: '#000', fontSize: 22, }}>
                                    Continue with Google
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {otpModal()}
        </>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        height: height * 1,
        width: width * 1,
        borderRadius: 16,
        marginTop: height * 0.01,
        backgroundColor: '#f2f2f2',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    },

    subContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },

    upperContainer: {
        backgroundColor: "#fff",
        padding: 8,
        borderRadius: 16,
        elevation: 2,
        height: height * 0.64,
        width: width * 0.92,
    },

    lowerContainer: {
        height: height * 0.32,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: height * 0.016,
    },

    lowerSubContainer: {
        width: width * 0.86,
        height: height * 0.08,
        borderColor: '#000',
        borderWidth: 0.5,
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    loginTxt: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#000',
        fontSize: 32,
        fontWeight: 900,
        fontFamily: 'Poppins',
        marginLeft: 4,
    },

    loginSubTxt: {
        paddingVertical: 8,
        color: '#353b48',
        fontSize: 20,
        fontWeight: 500,
        fontFamily: 'Poppins',
        marginLeft: 4,
        marginTop: -8,
    },

    centeredView: {
        flex: 1,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },

    modalView: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 18,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: height * 0.42,
        width: width * 0.84,
    },

    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 12,
        alignItems: 'center',
    },

    otpMainContainer: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },

    otpContainer: {
        width: width * 0.1,
        borderWidth: 0.8,
        borderColor: '#000',
        padding: 10,
        marginTop: 24,
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 6,
        marginLeft: 12,
        height: height * 0.07,
        backgroundColor: '#fff',
    },
});

export default Login;
