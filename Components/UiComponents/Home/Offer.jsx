import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const { width } = Dimensions.get('window')

export default function Offer() {
    return (
        <View style={{ width: width * 0.96 }}>
            <Text style={{ color: "#000", fontSize: 24, fontWeight: 500, margin: 4, padding: 4, letterSpacing: 1.1, }}>
                Offer
            </Text>
        </View>
    )
}
