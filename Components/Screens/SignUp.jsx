import { StyleSheet, Text, Dimensions, View, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { React, useState } from 'react'
import Input from '../UiComponents/Common/Input'
import AppButton from '../UiComponents/Common/Button'
import { postData } from '../Services/FetchNodeServices'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import moment from 'moment'

const { width, height } = Dimensions.get('window')

const SignUp = ({ navigation }) => {
    const [isDobPickerVisible, setDobPickerVisibility] = useState(false);

    const [inputs, setInputs] = useState({ mobile: '', email: '', name: '', aadhar: '', license: '' })
    const [dob, setDob] = useState("Date of Birth")

    const [error, setError] = useState({})

    const validate = () => {
        var isValid = true

        if (!inputs.mobile) {
            handleErrors("Pls Enter your Mobile Number", "mobile")
            isValid = false
        }
        if (!inputs.email) {
            handleErrors("Pls Enter your Email Address", "email")
            isValid = false
        }
        if (!inputs.name) {
            handleErrors("Pls Enter your Name", "name")
            isValid = false
        }
        if (!inputs.aadhar) {
            handleErrors("Pls Enter your Aadhar No.", "aadhar")
            isValid = false
        }
        if (!inputs.license) {
            handleErrors("Pls Enter your License No.", "license")
            isValid = false
        }

        return isValid
    }

    const handleRegisterClick = async () => {
        if (validate()) {
            var body = { mobileno: inputs.mobile, emailid: inputs.email, fullname: inputs.name, dob: dob, aadharno: inputs.aadhar, licenseno: inputs.license }

            var response = await postData("user/userdetailssubmitted", body);

            if (response.status) {
                Alert.alert('Success', 'Registered Successfully...', [
                    { text: 'Continue', onPress: (navigation.navigate("Login")) },
                ]);
            }
            else {
                alert("Error")
            }
        }
        else {
            alert("Please Enter your Details to Continue...")
        }
    }

    const handleValues = (txt, attr) => {
        setInputs(prevStates => ({ ...prevStates, [attr]: txt }))
    }
    const handleErrors = (txt, attr) => {
        setError(prevStates => ({ ...prevStates, [attr]: txt }))
    }

    const currentYear = new Date().getFullYear()
    const maxYear = currentYear - 21
    const minYear = currentYear - 63

    const minDob = new Date(`${maxYear}-12-31T00:00:00.000Z`);
    const maxDob = new Date(`${minYear}-12-31T00:00:00.000Z`);

    const showDobPicker = () => {
        setDobPickerVisibility(true);
    };
    const hideDobPicker = () => {
        setDobPickerVisibility(false);
    };

    const handleDobConfirm = (date) => {
        setDob(moment(date).format('YYYY-MM-DD'))
        hideDobPicker();
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <View>
                        <Text style={{ color: "#000", textDecorationLine: 'underline', fontSize: 24, fontWeight: 600 }}>
                            Enter your Details
                        </Text>
                    </View>
                    <View>
                        <Input iconName="phone" placeholder="Mobile Number" defaultValue={inputs.mobile} keyboardType="numeric" error={error.mobile} onFocus={() => handleErrors(null, "mobile")} onChangeText={(txt) => handleValues(txt, 'mobile')} />

                        <Input iconName="email" placeholder="Email" defaultValue={inputs.email} keyboardType="email-address" error={error.email} onFocus={() => handleErrors(null, "email")} onChangeText={(txt) => handleValues(txt, 'email')} />

                        <Input iconName="account" placeholder="Name" defaultValue={inputs.name} keyboardType="default" error={error.name} onFocus={() => handleErrors(null, "name")} onChangeText={(txt) => handleValues(txt, 'name')} />

                        <TouchableOpacity onPress={showDobPicker}>
                            <View style={{
                                width: width * 0.82,
                                backgroundColor: '#fff',
                                borderRadius: 5,
                                borderWidth: 0.5,
                                borderColor: '#3498db',
                                padding: 10,
                                marginTop: 12,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginBottom: 6,
                                height: height * 0.092,
                                marginLeft: 2,
                            }}>
                                <Icon name="calendar-text-outline" style={{ fontSize: 22, color: "#000", marginRight: 4, }} />
                                <Text
                                    style={{
                                        backgroundColor: "#fff", fontSize: 16, color: "#000",
                                    }}
                                >
                                    {dob}
                                </Text>
                                <DateTimePickerModal
                                    isVisible={isDobPickerVisible}
                                    mode="date"
                                    onConfirm={handleDobConfirm}
                                    onCancel={hideDobPicker}
                                    maximumDate={minDob}
                                    minimumDate={maxDob}
                                />
                            </View>
                        </TouchableOpacity>

                        <Input iconName="card-account-details-outline" placeholder="Aadhar Number" defaultValue={inputs.aadhar} keyboardType="numeric" error={error.aadhar} onFocus={() => handleErrors(null, "aadhar")} onChangeText={(txt) => handleValues(txt, 'aadhar')} />

                        <Input iconName="car-convertible" placeholder="License Number" defaultValue={inputs.license} keyboardType="default" error={error.license} onFocus={() => handleErrors(null, "license")} onChangeText={(txt) => handleValues(txt, 'license')} />
                    </View>
                    <View style={{ marginBottom: height * 0.096 }}>
                        <AppButton onPress={handleRegisterClick} btnWidth={0.88} borderRadius={24} buttonText={'Register'} bgColor='#2980b9' />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignContent: 'center',
        width: width * 0.96,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: height * 0.024,
    },
})

export default SignUp
