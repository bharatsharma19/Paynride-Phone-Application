import { React, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppButton from '../Common/Button';

const { width, height } = Dimensions.get('window')

export default function Search() {

    const [selectedCity, setSelectedCity] = useState('Select City')
    const [startDate, setStartDate] = useState('Start Date')
    const [endDate, setEndDate] = useState('End Date')

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

    const handleStartDateConfirm = (datetime) => {
        console.warn("Start date has been picked: ", datetime);
        setStartDate(datetime)
        hideStartDatePicker();
    };
    const handleEndDateConfirm = (date) => {
        console.warn("End date has been picked: ", date);
        setEndDate(date)
        hideEndDatePicker();
    };

    const handleCitySearch = () => {
        alert("Search Button Clicked!")
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
                    <View style={{ marginTop: 4, }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                            <Image
                                style={{ width: 164, height: 72, resizeMode: 'contain' }}
                                source={require('../../Assets/Rentals1.png')}
                            />
                            <Text style={{ fontSize: 20, fontWeight: 500, color: "#fff", letterSpacing: 1.2, marginTop: 4, }}>
                                Let's Find a Car for You
                            </Text>
                        </View>
                    </View>
                    <View style={{ height: "32%" }}>
                        <TouchableOpacity>
                            <View style={{
                                width: width * 0.92, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                            }}>
                                <Icon name="location-enter" style={{ fontSize: 36, color: "#000", }} />
                                <Text
                                    style={{
                                        backgroundColor: "#fff", fontSize: 30, marginLeft: 12, color: "#000", marginTop: -1,
                                    }}
                                >{selectedCity}</Text>
                                <Icon name="arrow-right" style={{ fontSize: 36, color: "#000", marginLeft: 116, }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", }}>
                            <TouchableOpacity onPress={showStartDatePicker}>
                                <View style={{
                                    width: width * 0.45, height: height * 0.06, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Text
                                        style={{
                                            backgroundColor: "#fff", fontSize: 12, marginLeft: 6, color: "#000",
                                        }}
                                    >{startDate.datetime}</Text>
                                    <DateTimePickerModal
                                        isVisible={isStartDatePickerVisible}
                                        mode="datetime"
                                        onConfirm={handleStartDateConfirm}
                                        onCancel={hideStartDatePicker}
                                    />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={showEndDatePicker}>
                                <View style={{
                                    width: width * 0.45, height: height * 0.06, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                                }}>
                                    <Text
                                        style={{
                                            backgroundColor: "#fff", fontSize: 12, marginLeft: 6, color: "#000",
                                        }}
                                    >{endDate.datetime}</Text>
                                    <DateTimePickerModal
                                        isVisible={isEndDatePickerVisible}
                                        mode="datetime"
                                        onConfirm={handleEndDateConfirm}
                                        onCancel={hideEndDatePicker}
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 12, }}>
                        <AppButton onPress={handleCitySearch} btnWidth={0.84} buttonText={'Search'} bgColor='#2980b9' borderRadius={24} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height * 0.60,
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
});
