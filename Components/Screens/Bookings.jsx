import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { React, useState, useEffect } from 'react'
import { postData, ServerURL } from '../../Services/FetchNodeServices'
import AppButton from '../UiComponents/Common/Button'

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
            <View style={{ display: 'flex', flexDirection: 'column', }}>
                <View style={{ flexDirection: "row", width: '100%' }}>
                    <View style={{ alignItems: 'center', marginTop: 20, flexDirection: 'column', width: '50%', }}>
                        <Image source={{ uri: `${ServerURL}/images/${item.vehicleicon}` }} style={{
                            resizeMode: 'contain',
                            height: 110,
                            width: 200,
                        }} />

                        <Text style={{ fontFamily: "poppins", fontSize: 15, fontWeight: 'bold' }}>{item.companyname}</Text>
                        <Text style={{ fontFamily: "poppins", fontSize: 20, fontWeight: "900" }}>{item.modelname}</Text>
                    </View>
                    <View style={{ width: '50%', height: 100, marginTop: 40, flexDirection: "column", justifyContent: 'space-around' }}>
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-around', }}>

                            <Text style={{ fontFamily: "poppins", fontSize: 15, fontWeight: 'bold' }}>Diesel</Text>
                            <Text style={{ fontFamily: "poppins", fontSize: 15, fontWeight: 'bold' }}>Manual</Text>
                            <Text style={{ fontFamily: "poppins", fontSize: 15, fontWeight: 'bold' }}>5 Seats</Text>
                        </View>
                        <View style={{ width: '100%', height: 50, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 10 }}>

                            <Text style={{ fontFamily: "poppins", fontSize: 25, fontWeight: 'bold' }}> &#8377; 2777</Text>

                        </View>

                    </View>

                </View>
                <View style={{ marginTop: 2, marginLeft: 40 }}>
                    <AppButton btnWidth={0.8} buttonText={'Book'} bgColor="#27ae60" />
                </View>
            </View>
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
        marginTop: 0,
        backgroundColor: '#f2f2f2'
    },
})
