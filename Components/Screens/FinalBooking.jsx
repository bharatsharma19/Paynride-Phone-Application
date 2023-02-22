import { React, useState, useEffect } from "react";
import {
    Text,
    View,
    Image,
    Dimensions,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { postData, ServerURL } from "../Services/FetchNodeServices";
import AppButton from "../UiComponents/Common/Button";
import Input from "../UiComponents/Common/Input";
import RazorpayCheckout from 'react-native-razorpay';
import { getStoreData } from "../Storage/AsyncStorage";

const { width, height } = Dimensions.get('window');

const FinalBooking = ({ navigation }) => {

    var vehicle = useSelector(state => state.vehicle)
    var item = Object.values(vehicle)[0]

    var bookingDetails = useSelector(state => state.booking)

    const [deliveryLoc, setDeliveryLoc] = useState(`PaynRide ${bookingDetails.cityName}`)
    const [baseFare] = useState(item.baseFare)
    const [doorstepDelivery] = useState(400)
    const [total, setTotal] = useState("")

    const calculateTotal = () => {
        setTotal(parseInt(baseFare + parseInt(doorstepDelivery)))
    }
    useEffect(function () {
        calculateTotal()
    }, [])

    var advancePayment = parseInt((3 / 4) * total);
    let remainingAmount = parseInt(total - advancePayment)

    const [userDetails, setUserDetails] = useState({})

    const getDetails = async () => {
        var user = await getStoreData('UserData');
        setUserDetails(user[0])
    }
    useEffect(function () {
        getDetails()
    }, [])

    var options = {
        description: 'Car booking Advance Payment',
        image: 'http://localhost:3001/images/transparent_logo.png',
        currency: 'INR',
        key: "rzp_test_GQ6XaPC6gMPNwH", // Your api key
        amount: advancePayment * 100,
        name: userDetails.fullname,
        prefill: {
            email: userDetails.emailid,
            contact: userDetails.mobileno,
            name: 'PaynRide'
        },
        theme: {
            color: 'blue'
        }
    }

    const handlePayment = () => {
        RazorpayCheckout.open(options).then((data) => {
            // handle success
            handleSubmit(data)
        }).catch((error) => {
            // handle failure
            alert(`Error: ${error.code} | ${error.description}`);
        });
    }

    const handleSubmit = async (data) => {
        var body = {
            vehicleid: item.vehicleid,
            useremailid: userDetails.emailid,
            usermobileno: userDetails.mobileno,
            bookingstarttime: bookingDetails.startDate,
            bookingendtime: bookingDetails.endDate,
            bookingcity: bookingDetails.cityName,
            bookingtotalamount: total,
            advancepayment: advancePayment,
            deliverylocation: deliveryLoc,
            paymentid: data.razorpay_payment_id,
        };

        var response = await postData("booking/bookingdetailssubmitted", body);

        if (response) {
            alert('Success')
            navigation.navigate("Home")
        }
        else {
            alert('Server Error, Please Restart Application')
        }
    };

    return (
        <>
            <ScrollView>
                <View style={styles.mainContainer}>
                    <Text style={styles.mainStyleText}>
                        Booking Summary
                    </Text>
                    <View style={{ marginTop: 10 }}>
                        <Text style={styles.companyText}>
                            {item.companyname} {item.modelname}
                        </Text>
                    </View>
                    <View style={styles.iconContainer}>
                        <View style={styles.firstIcon}>
                            <Image source={require('../Assets/petrol.png')} style={{
                                resizeMode: 'contain',
                                height: 14,
                                width: 14,
                            }} />
                            <Text style={styles.iconText}>
                                {item.fueltype}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5 }}>
                            <Image source={require('../Assets/automatic.png')} style={{
                                resizeMode: 'contain',
                                height: 14,
                                width: 14,
                                marginTop: 3,
                            }} />
                            <Text style={styles.iconText}>
                                {item.transmission}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'baseline' }}>
                            <Image source={require('../Assets/seat.png')} style={{
                                resizeMode: 'contain',
                                height: 14,
                                width: 14,
                                marginTop: 3,
                            }} />
                            <Text style={styles.iconText}>
                                {item.capacity} Seats
                            </Text>
                        </View>
                    </View>
                    <View style={styles.carImage}>
                        <Image source={{ uri: (`${ServerURL}/images/${item.vehicleicon}`) }} style={{
                            resizeMode: 'contain',
                            height: height * (0.18),
                            width: width * (0.9),
                        }} />
                    </View>
                    <View style={styles.subContainer}>
                        <View style={{ width: width * (0.6) }}>
                            <>
                                <View style={{ display: 'flex', justifyContent: 'space-between', }}>
                                    <View style={styles.basicInfoMain}>
                                        <Text style={styles.basicInfoHeading}>
                                            Fuel: {'  '}
                                        </Text>
                                        <Text style={styles.basicInfoText}>
                                            Not Included
                                        </Text>
                                    </View>
                                    <View style={styles.basicInfoMain}>
                                        <Text style={styles.basicInfoHeading}>
                                            Tolls:{'  '}
                                        </Text>
                                        <Text style={styles.basicInfoText}>
                                            To be paid by you
                                        </Text>
                                    </View>
                                    <View style={styles.basicInfoMain}>
                                        <Text style={styles.basicInfoHeading}>
                                            Kms Limit: {'  '}
                                        </Text>
                                        <Text style={styles.basicInfoText}>
                                            Unlimited
                                        </Text>
                                    </View>
                                    <View style={styles.basicInfoMain}>
                                        <Text style={styles.basicInfoHeading}>
                                            Extra kms charge: {'  '}
                                        </Text>
                                        <Text style={styles.basicInfoText}>
                                            &#8377; 0
                                        </Text>
                                    </View>
                                </View>
                            </>
                        </View>
                    </View>
                    <View style={styles.lowerContainer}>
                        <View style={styles.lowerSubContainer}>
                            <View style={styles.textBasicContainer}>
                                <Text style={styles.startDateEndDate}>
                                    {'City : '}
                                </Text>
                                <Text style={styles.startDateEndDateSub}>
                                    {' '}{bookingDetails.cityName}
                                </Text>
                            </View>
                            <View style={styles.textBasicContainer}>
                                <Text style={styles.startDateEndDate}>
                                    {'Duration : '}
                                </Text>
                                <Text style={styles.startDateEndDateSub}>
                                    {' '}{bookingDetails.days} Days {bookingDetails.hours} Hours
                                </Text>
                            </View>
                            <View style={styles.textBasicContainer}>
                                <Text style={styles.startDateEndDate}>
                                    {'Start Date : '}
                                </Text>
                                <Text style={styles.startDateEndDateSub}>
                                    {' '}{bookingDetails.startDate}
                                </Text>
                            </View>
                            <View style={styles.textBasicContainer}>
                                <Text style={styles.startDateEndDate}>
                                    {'End Date : '}
                                </Text>
                                <Text style={styles.startDateEndDateSub}>
                                    {' '}{bookingDetails.endDate}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <Input iconName="location-enter" placeholder="Delivery Location" keyboardType="default" defaultValue={deliveryLoc} onChangeText={(txt) => setDeliveryLoc(txt)} />
                    </View>
                    <View style={styles.anotherLowerContainer}>
                        <View style={styles.priceDetails}>
                            <Text style={styles.priceDetailsText}>
                                Base Fare
                            </Text>
                            <Text style={styles.priceDetailsTextSub}>
                                &#8377; {baseFare}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#a9a9a9',
                            borderStyle: 'dotted',
                            width: width * (0.85),
                            height: 0
                        }} />
                        <View style={styles.priceDetails}>
                            <Text style={styles.priceDetailsText}>
                                Doorstep Delivery & Pickup
                            </Text>
                            <Text style={styles.priceDetailsTextSub}>
                                &#8377; {doorstepDelivery}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#a9a9a9',
                            borderStyle: 'dotted',
                            width: width * (0.85),
                            height: 0
                        }} />
                        <View style={styles.priceDetails}>
                            <Text style={styles.priceDetailsText}>
                                Advance Payment
                            </Text>
                            <Text style={styles.priceDetailsText}>
                                &#8377; {advancePayment}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#a9a9a9',
                            borderStyle: 'dotted',
                            width: width * (0.85),
                            height: 0
                        }} />
                        <View style={styles.priceDetails}>
                            <Text style={styles.priceDetailsText}>
                                Remaining Payment
                            </Text>
                            <Text style={styles.priceDetailsTextSub}>
                                &#8377; {remainingAmount}
                            </Text>
                        </View>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: '#a9a9a9',
                            borderStyle: 'dotted',
                            width: width * (0.85),
                            height: 0
                        }} />
                        <View style={styles.priceDetails}>
                            <Text style={styles.totalPriceText}>
                                Total
                            </Text>
                            <Text style={styles.totalPriceText}>
                                &#8377; {total}
                            </Text>
                        </View>
                        <Text style={{ marginLeft: 5, fontWeight: 900 }}>
                            Inclusive of Taxes and Insurance
                        </Text>
                    </View>
                    <View style={styles.proceedBtn}>
                        <AppButton onPress={() => handlePayment()} btnWidth={0.82} buttonText={'Proceed'} bgColor='#2980b9' borderRadius={24} />
                    </View>
                </View >
            </ScrollView>
        </>
    )
}

export default FinalBooking

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'column',
        backgroundColor: '#ecf0f1',
        alignItems: 'center',
    },

    companyText: {
        fontFamily: "Poppins",
        fontSize: 24,
        fontWeight: "bold",
        color: '#000',
        justifyContent: 'center',
    },

    iconContainer: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    firstIcon: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'baseline',
    },

    iconText: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        alignItems: 'flex-start',
        color: '#000',
    },

    carImage: {
        width: width * (0.9),
        height: height * (0.18),
        marginTop: 8,
        marginBottom: 0,
    },

    subContainer: {
        flexDirection: 'row',
        width: '90%',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        marginTop: 5,
        elevation: 10,
        backgroundColor: '#fff',
    },

    lowerContainer: {
        flexDirection: 'column',
        width: '90%',
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 10,
        elevation: 10,
        alignItems: 'center',
    },

    lowerSubContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    locationContainer: {
        flexDirection: 'column',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        margin: 10,
        elevation: 10,
    },

    anotherLowerContainer: {
        flexDirection: 'column',
        width: '90%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        elevation: 10,
    },

    priceDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 5,
    },

    priceDetailsText: {
        fontFamily: 'Poppins',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },

    priceDetailsTextSub: {
        fontFamily: 'Poppins',
        fontSize: 18,
        color: '#000',
    },

    totalPriceText: {
        fontFamily: 'Poppins',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },

    basicInfoMain: {
        display: 'flex',
        flexDirection: 'row',
    },

    basicInfoHeading: {
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#008b8b',
    },

    basicInfoText: {
        fontFamily: 'Poppins',
        fontWeight: 'normal',
        color: '#008b8b',
    },

    proceedBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.01,
        marginBottom: height * 0.06,
    },

    mainStyleText: {
        fontSize: 20,
        color: '#000',
        fontWeight: 700,
        marginTop: 8,
    },

    startDateEndDate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginRight: -4,
    },

    startDateEndDateSub: {
        fontSize: 16,
        color: '#000',
        marginRight: -4,
    },

    textBasicContainer: {
        display: 'flex',
        flexDirection: 'row',
    }
})
