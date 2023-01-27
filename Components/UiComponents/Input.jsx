import React from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    View,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
const { width } = Dimensions.get('window')

export default function Input({ labelTxt, error, iconName, setValue, ...props }) {
    return (
        <View style={{ padding: 4, width: width * 0.8, marginTop: 4, marginBottom: 4 }}>
            <Text style={styles.title}>{labelTxt}</Text>
            <View style={styles.textContainer}>
                <Icon name={iconName} style={{ fontSize: 22 }} />
                <TextInput
                    style={{ fontSize: 16 }}
                    {...props}
                />
            </View>
            {error ? <Text style={{ fontSize: 12, fontWeight: 700, color: 'red' }}>{error}</Text> : <></>}
        </View>
    )

}

const styles = StyleSheet.create({
    textContainer: {
        width: width * 0.82,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#3498db',
        padding: 10,
        marginTop: 12,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    title: {
        marginTop: 16,
        paddingVertical: 8,
        color: '#20232a',
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        marginBottom: 4,
    },
});
