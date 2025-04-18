import { React, useState, useEffect } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, Alert, Modal, Pressable, FlatList } from 'react-native'
import Icon from "react-native-vector-icons/Ionicons"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '../Common/Button';
import moment from 'moment';
import { getData } from '../../Services/FetchNodeServices';
import { useDispatch } from 'react-redux';
import DateDiff from 'date-diff';

const { width, height } = Dimensions.get('window')

const Search = ({ navigation }) => {

    var dispatch = useDispatch()

    const [cities, setCities] = useState([])
    const [cityId, setCityId] = useState("")
    const [selectedCity, setSelectedCity] = useState('Select City')
    const [startDate, setStartDate] = useState('Start Date')
    const [endDate, setEndDate] = useState('End Date')
    const [daysTime, setDaysTime] = useState("")
    const [days, setDays] = useState("")
    const [hours, setHours] = useState("")

    var minDate = new Date()

    const fetchAllCities = async () => {
        var response = await getData("reactnative/display_all_cities")
        setCities(response.data)
    }
    useEffect(() => {
        fetchAllCities()
    }, []);

    const handleSelectedCity = (item) => {
        setCityId(item.cityid)
        setSelectedCity(item.cityname)
        setModalVisible(!modalVisible)
        setStartDatePickerVisibility(true)
    }

    const [modalVisible, setModalVisible] = useState(false);

    function cityModal() {
        return (
            <>
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            Alert.alert('City Selected!');
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <FlatList
                                    data={cities}
                                    renderItem={({ item }) => <Text style={styles.item} onPress={() => handleSelectedCity(item)}>{item.cityname}</Text>}
                                />
                                <Pressable
                                    style={[styles.closeBtnText, styles.buttonClose]}
                                    onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.textStyle}>Close</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        )
    }

    const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);

    const showStartDatePicker = () => {
        setStartDatePickerVisibility(true);
    };
    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };
    const hideStartDatePicker = () => {
        setStartDatePickerVisibility(false);
    };
    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const [tempStartDate, setTempStartDate] = useState('')

    const handleStartDateConfirm = (date) => {
        setTempStartDate(date);
        setStartDate(moment(date).format('DD-MM-YYYY hh:mm A'));
        hideStartDatePicker();
        setEndDatePickerVisibility(true);
    };
    const handleEndDateConfirm = (date) => {
        //console.log(date)
        setEndDate(moment(date).format('DD-MM-YYYY hh:mm A'));
        hideEndDatePicker();
        dateDiff(tempStartDate, date);
    };

    const handleSearchBtn = () => {
        if (startDate !== "" && endDate !== "" && selectedCity !== 'Select City' && (hours >= 3 || days >= 1)) {
            return (
                <AppButton onPress={handleCitySearch} btnWidth={0.84} buttonText={'Search'} bgColor='#2980b9' borderRadius={24} />
            )
        }
        else {
            return (
                <AppButton btnWidth={0.84} onPress={handleErrorAlert} opacity={0.5} buttonText={'Search'} bgColor='#2980b9' borderRadius={24} />
            )
        }
    }

    const dateDiff = (sD, eD) => {
        var startDay = new Date(sD)
        var endDay = new Date(eD)

        //console.log(startDay)
        //console.log(endDay)

        if (endDay < startDay) {
            setDaysTime("End Date should be more than Start Date")
        }
        else {
            if (startDay === null || startDate === "") {
                setDaysTime("Select Start Date & Time!")
            }
            else if (endDay === null || endDate === "") {
                setDaysTime("Select End Date & Time!")
            }
            else if (startDay !== null && endDay !== null) {
                var diff = new DateDiff(endDay, startDay)
                var calculated = "Duration : " + parseInt(diff.days()) + " Days " + Math.ceil(diff.hours() % 24) + " Hours"

                setDays(parseInt(diff.days()))
                setHours(Math.ceil(diff.hours() % 24))
                setDaysTime(calculated)
            }
            else {
                setDaysTime("Error")
            }
        }
    }

    const handleErrorAlert = () => {
        Alert.alert("Error", "Duration cannot be less than 3 Hours")
    }

    const handleCitySearch = () => {
        dispatch({ type: "ADD_BOOKING", payload: { cityId: cityId, cityName: selectedCity, startDate: startDate, endDate: endDate, duration: daysTime, days: days, hours: hours } })

        navigation.navigate("Available Vehicles")
    }

    return (
        <View style={{
            backgroundColor: "linear-gradient(270deg, rgba(72,167,158,1) 4%, rgba(0,255,235,1) 100%)",
        }}>
            <View style={styles.mainContainer}>
                <View style={styles.subContainer}>
                    <Text style={{ fontSize: 24, fontWeight: 700, color: "#fff", }}>
                        PaynRide
                    </Text>
                    <View style={{ backgroundColor: "rgba(255,255,255,0.5)", opacity: 0.84, marginTop: 8, width: "96%", height: 42, borderRadius: 12, alignItems: 'center', justifyContent: 'center', }}>
                        <Text style={{ fontSize: 20, fontWeight: 500, color: "#f5f6fa", }}>
                            10 Lac+ Happy Customer
                        </Text>
                    </View>
                    <View style={{ marginTop: -4, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                style={{ width: 164, height: 72, resizeMode: 'contain' }}
                                source={require('../../Assets/Rentals1.png')}
                            />
                            <Text style={{ fontSize: 20, fontWeight: 500, color: "#fff", letterSpacing: 1.2, marginTop: -6, }}>
                                Let's Find a Car for You
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: "32%" }}>
                        <TouchableOpacity onPress={() => setModalVisible(true)}>
                            <View style={{
                                width: width * 0.92, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                            }}>
                                <Icon name="ios-location-outline" style={{ fontSize: 32, color: "#000", marginLeft: 8, }} />
                                <Text
                                    style={{
                                        backgroundColor: "#fff", fontSize: 30, marginLeft: 18, fontWeight: 'bold', color: "#000", marginTop: -1,
                                    }}
                                >{selectedCity}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                            <TouchableOpacity onPress={showStartDatePicker}>
                                <View style={{
                                    width: width * 0.45, height: height * 0.06, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Text
                                        style={{
                                            backgroundColor: "#fff", fontSize: 16, fontWeight: 'bold', marginLeft: 6, color: "#000",
                                        }}
                                    >
                                        {startDate}
                                    </Text>
                                    <DateTimePickerModal
                                        isVisible={isStartDatePickerVisible}
                                        mode="datetime"
                                        onConfirm={handleStartDateConfirm}
                                        onCancel={hideStartDatePicker}
                                        minimumDate={minDate}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showEndDatePicker}>
                                <View style={{
                                    width: width * 0.45, height: height * 0.06, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Text
                                        style={{
                                            backgroundColor: "#fff", fontSize: 16, fontWeight: 'bold', marginLeft: 6, color: "#000",
                                        }}
                                    >
                                        {endDate}
                                    </Text>
                                    <DateTimePickerModal
                                        isVisible={isEndDatePickerVisible}
                                        mode="datetime"
                                        onConfirm={handleEndDateConfirm}
                                        onCancel={hideEndDatePicker}
                                        minimumDate={minDate}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', marginTop: height * 0.064, }}>
                        <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                            {daysTime}
                        </Text>
                    </View>
                    <View style={{ marginTop: 4, alignItems: 'center', }}>
                        {handleSearchBtn()}
                    </View>
                </View>
            </View>
            {cityModal()}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height * 0.5,
        width: width * 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    subContainer: {
        height: "98%",
        width: "98%",
        alignItems: 'center',
        borderRadius: 16,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 54,
        marginBottom: 24,
    },

    modalView: {
        margin: 24,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 36,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    buttonClose: {
        marginLeft: 128,
    },

    textStyle: {
        color: "#000",
        fontSize: 20,
    },

    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },

    item: {
        fontSize: 18,
        height: 42,
        width: 164,
        color: "#000",
    },
});

export default Search
