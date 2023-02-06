// rnfes

import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getStoreData } from '../../Storage/AsyncStorage'

const { width, height } = Dimensions.get('window')

const UserProfile = () => {

    const [userDetails, setUserDetails] = useState({})

    const getDetails = async () => {
        var user = await getStoreData('UserData');
        setUserDetails(user[0])
    }
    useEffect(function () {
        getDetails()
    }, [])

    return (
        <View style={styles.mainContainer}>
            <View style={styles.subContainer}>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            Name
                        </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.textStyle}>
                            {userDetails.fullname}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            Mobile
                        </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.textStyle}>
                            +91{userDetails.mobileno}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            Aadhar
                        </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.textStyle}>
                            {userDetails.aadharno}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            License
                        </Text>
                    </View>
                    <View style={styles.detailsText}>
                        <Text style={styles.textStyle}>
                            {userDetails.licenseno}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            Email
                        </Text>
                    </View>
                    <View style={{
                        width: "82%",
                        height: "34%",
                        backgroundColor: "#fff",
                        color: "#000",
                        borderRadius: 12,
                        borderColor: "#3498db",
                        borderWidth: 0.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                    }}>
                        <Text style={styles.textStyle}>
                            {userDetails.emailid}
                        </Text>
                    </View>
                </View>
                <View style={styles.detailsBox}>
                    <View>
                        <Text style={styles.headingTextStyle}>
                            Total Bookings
                        </Text>
                    </View>
                    <View style={{
                        width: "48%",
                        height: "34%",
                        backgroundColor: "#fff",
                        color: "#000",
                        borderRadius: 12,
                        borderColor: "#3498db",
                        borderWidth: 0.5,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 0,
                    }}>
                        <Text style={styles.textStyle}>
                            {userDetails.totalbookings}
                        </Text>
                    </View>
                </View>
            </View>
        </View >
    )
}

export default UserProfile

const styles = StyleSheet.create({
    mainContainer: {
        width: width * 1,
        height: height * 0.92,
        marginTop: 16,
    },

    subContainer: {
        marginTop: 4,
        display: "flex",
        justifyContent: 'center',
    },

    detailsBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: -24,
        padding: 0,
    },

    detailsText: {
        width: "72%",
        height: "34%",
        backgroundColor: "#fff",
        color: "#000",
        borderRadius: 12,
        borderColor: "#3498db",
        borderWidth: 0.5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },

    headingTextStyle: {
        fontSize: 20,
        fontWeight: 700,
        marginTop: 4,
        color: "#000",
    },

    textStyle: {
        fontSize: 18,
        fontWeight: 500,
        color: "#000",
    }
})
