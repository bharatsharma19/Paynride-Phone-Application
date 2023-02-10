import { FlatList, Image, SafeAreaView, StyleSheet, Text, View, Dimensions } from 'react-native'
import { React, useState, useEffect } from 'react'
import { postData, ServerURL } from '../Services/FetchNodeServices'
import AppButton from '../UiComponents/Common/Button'

const { width, height } = Dimensions.get('window')

const Bookings = () => {
    const [availableCars, setAvailableCars] = useState([])

    const fetchAvailableCars = async () => {
        var body = { availabilityCity: 1 }

        const result = await postData("user/display_all_vehicles", body)

        setAvailableCars(result.data)
    }
    useEffect(function () {
        fetchAvailableCars()
    }, [])

    const RenderItem = ({ item }) => {
        return (
            <>
                <View style={{ height: 178, width: width * 0.96, backgroundColor: "#fff", marginTop: 8, borderRadius: 14, padding: 12, display: 'flex', flexDirection: 'row', marginBottom: 16, }}>
                    <View style={{ flex: 0.54, marginRight: width * 0.112, }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: '500', color: "#95a5a6", letterSpacing: 1.02, }}>
                                {item.companyname}
                            </Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 24, color: "#000", letterSpacing: 1.04, fontWeight: '700', }}>
                                {item.modelname}
                            </Text>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 6, }}>
                            <View style={{ display: "flex", flexDirection: 'row', marginRight: 2, }}>
                                <Image style={{ resizeMode: 'contain', marginTop: 2.5, marginLeft: 2, marginRight: 4, }}
                                    source={require('../Assets/petrol.png')} />
                                <Text style={{ fontWeight: 500, color: "#000", }}>
                                    {item.fueltype}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: 'row', marginRight: 2, }}>
                                <Image style={{ resizeMode: 'contain', marginTop: 3, marginLeft: 2, marginRight: 4, }}
                                    source={require('../Assets/automatic.png')} />
                                <Text style={{ fontWeight: 500, color: "#000", }}>
                                    {item.transmission}
                                </Text>
                            </View>
                            <View style={{ display: "flex", flexDirection: 'row', marginRight: 2, }}>
                                <Image style={{ resizeMode: 'contain', marginTop: 3, marginLeft: 2, marginRight: 4, }}
                                    source={require('../Assets/seat.png')} />
                                <Text style={{ fontWeight: 500, color: "#000", }}>
                                    {item.capacity} Seats
                                </Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 6, }}>
                            <View>
                                <Text style={{ color: "#000", fontSize: 24, fontWeight: 500, }}>
                                    {'\u20B9'} {item.rentperhour}
                                </Text>
                            </View>
                            <View>
                                <Text style={{ color: "#000", fontSize: 16, fontWeight: 500, }}>
                                    Price Exclude Fuel Cost
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flex: 0.46, display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', marginTop: -36, }}>
                        <View>
                            <Image style={{ resizeMode: 'contain', width: 164, height: 112, }}
                                source={{
                                    uri: `${ServerURL}/images/${item.vehicleicon}`,
                                }} />
                        </View>
                        <View style={{ alignItems: 'center', }}>
                            {item.vehiclebookingstatus === 'Not Booked' ? <>
                                <AppButton buttonText={"Proceed"} borderRadius={24} btnWidth={'0.32'} margintop={0} marginleft={0} marginright={0} pd={0} />
                            </> : <>
                                <Text style={{ color: "red", fontFamily: "Poppins", fontSize: 24, fontWeight: 800, marginTop: 12, }}>
                                    Sold Out!
                                </Text>
                            </>}
                        </View>
                    </View>
                </View >
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={availableCars}
                renderItem={({ item }) => <RenderItem item={item} />}
                keyExtractor={item => item.vehicleid}
            />
        </SafeAreaView>
    )
}

export default Bookings

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
    },
})
