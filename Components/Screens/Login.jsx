import { React, useState, useRef } from 'react';
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

    const valueOneRef = useRef(null)
    const valueTwoRef = useRef(null)
    const valueThreeRef = useRef(null)
    const valueFourRef = useRef(null)
    const valueFiveRef = useRef(null)
    const valueSixRef = useRef(null)

    const [generatedOtp, setGeneratedOtp] = useState("")
    const [enteredOtp, setEnteredOtp] = useState("")

    const handleEnteredOtp = (txt) => {
        setValueSix(txt)

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
                alert("Mobile Number at least contain 10 Digits")
            }
        }
        else {
            alert("Please Enter your Mobile Number to Continue...")
        }
    }

    const handleLoginClick = async () => {
        let tempOtp = await parseInt(enteredOtp)

        console.log("Generated : " + generatedOtp + " AND Entered : " + enteredOtp)

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
                            <View style={{ height: height * 0.06, }}>
                                <Text style={{ fontSize: 24, fontWeight: 700, color: "#000", }}>
                                    Verification
                                </Text>
                                <Text style={{ fontSize: 16, fontWeight: 500, color: "#353b48", }}>
                                    A 6-Digit Otp has been sent to your mobile number. Enter it below to Continue...
                                </Text>
                            </View>
                            <View style={styles.innerContainer}>
                                <View style={styles.otpMainContainer}>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            autoFocus={true}
                                            ref={valueOneRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={
                                                (txt) => {
                                                    setValueOne(txt);
                                                    if (valueOne !== null) {
                                                        valueTwoRef.current.focus()
                                                    }
                                                }
                                            }
                                            value={valueOne}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            ref={valueTwoRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={
                                                (txt) => {
                                                    setValueTwo(txt);
                                                    if (valueTwo !== null) {
                                                        valueThreeRef.current.focus()
                                                    }
                                                }
                                            }
                                            value={valueTwo}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            ref={valueThreeRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={
                                                (txt) => {
                                                    setValueThree(txt);
                                                    if (valueThree !== null) {
                                                        valueFourRef.current.focus()
                                                    }
                                                }
                                            }
                                            value={valueThree}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            ref={valueFourRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={
                                                (txt) => {
                                                    setValueFour(txt);
                                                    if (valueFour !== null) {
                                                        valueFiveRef.current.focus()
                                                    }
                                                }
                                            }
                                            value={valueFour}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            ref={valueFiveRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={
                                                (txt) => {
                                                    setValueFive(txt);
                                                    if (valueFive !== null) {
                                                        valueSixRef.current.focus()
                                                    }
                                                }
                                            }
                                            value={valueFive}
                                        />
                                    </View>
                                    <View style={styles.otpContainer}>
                                        <TextInput
                                            ref={valueSixRef}
                                            textAlign='center'
                                            style={styles.otpTextInput}
                                            keyboardType={'number-pad'}
                                            maxLength={1}
                                            onChangeText={(txt) => handleEnteredOtp(txt)}
                                            value={valueSix}
                                        />
                                    </View>
                                </View>
                                <View style={{ marginTop: height * 0.01, }}>
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
                        <View style={{ alignItems: 'center', height: height * 0.12 }}>
                            <Image
                                style={{ width: 164, height: 72, resizeMode: 'contain' }}
                                source={require('../Assets/Rentals1.png')}
                            />
                        </View>
                        <View style={{ height: height * 0.12, }}>
                            <Text style={styles.loginTxt}>
                                Welcome,
                            </Text>
                            <Text style={styles.loginSubTxt}>
                                Enter your Mobile Number to Continue...
                            </Text>
                        </View>
                        <View style={styles.subContainer}>
                            <View>
                                <Input iconName="phone" placeholder="Mobile Number" keyboardType="numeric" defaultValue={inputs.mobileEmail} error={error.mobileEmail} onFocus={() => handleErrors(null, "mobileEmail")} onChangeText={(txt) => handleValues(txt, 'mobileEmail')} />

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
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: height * 0.28,
    },

    upperContainer: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 16,
        elevation: 2,
        height: height * 0.64,
        width: width * 0.92,
        justifyContent: 'space-evenly',
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
        color: '#000',
        fontSize: 32,
        fontWeight: 900,
        fontFamily: 'Poppins',
        marginLeft: 4,
    },

    loginSubTxt: {
        color: '#353b48',
        fontSize: 16,
        fontFamily: 'Poppins',
        marginLeft: 4,
        marginTop: 2,
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
        height: height * 0.36,
        width: width * 0.92,
    },

    innerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.036,
        height: height * 0.16,
    },

    otpMainContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginTop: height * 0.072,
        backgroundColor: '#fff',
    },

    otpContainer: {
        width: 54,
        borderWidth: 0.8,
        borderColor: '#000',
        display: 'flex',
        flexDirection: 'row',
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 3,
        backgroundColor: '#fff',
    },

    otpTextInput: {
        fontSize: 24,
        color: "#000",
        fontWeight: 'bold',
    },
});

export default Login;
