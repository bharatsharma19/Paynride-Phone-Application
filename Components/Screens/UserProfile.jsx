// rnfes

import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('window')

const UserProfile = () => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}></View>
            <Text>Profile</Text>
        </View>
    )
}

export default UserProfile

const styles = StyleSheet.create({
    mainContainer: {
        width: width * 1,
        height: height * 1,
    },

    subContainer: {
        flex: 1,
        justifyContent: 'center',
    }
})
