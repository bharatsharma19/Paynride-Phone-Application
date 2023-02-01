import { React, useState } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TextInput } from 'react-native'
import Icon from "react-native-vector-icons/MaterialCommunityIcons"

const { width, height } = Dimensions.get('window')

export default function Search() {

    const [selectedCity, setSelectedCity] = useState('Gwalior')

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
                    <View style={{
                        width: width * 0.92, backgroundColor: '#fff', borderRadius: 32, borderWidth: 0.5, borderColor: '#3498db', padding: 8, marginTop: 18, display: 'flex', flexDirection: 'row', alignItems: 'center',
                    }}>
                        <Icon name="location-enter" style={{ fontSize: 36, color: "#000", }} />
                        <TextInput
                            style={{
                                backgroundColor: "#fff", fontSize: 30, marginLeft: 12, color: "#000", marginTop: -1,
                            }}
                            value={selectedCity} multiline={true}
                        />
                        <Icon name="arrow-right" style={{ fontSize: 36, color: "#000", marginLeft: 142, }} />
                    </View>
                    <View style={{ marginTop: 18, }}>
                        <Text style={{ fontSize: 20, fontWeight: 500, color: "#fff", letterSpacing: 1.2, marginTop: 4, }}>
                            Want to book in different City?
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        height: height * 0.54,
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
