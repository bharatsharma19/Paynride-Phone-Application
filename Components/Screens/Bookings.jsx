import { FlatList, Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { React, useState, useEffect } from 'react'
import { postData, ServerURL } from '../Services/FetchNodeServices'
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
            <>
                <View>

                </View>
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
        marginTop: 0,
        backgroundColor: '#f2f2f2'
    },
})
