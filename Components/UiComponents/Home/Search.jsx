import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

export default function Search() {
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
                    <View></View>
                    <View></View>
                    <View></View>
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
