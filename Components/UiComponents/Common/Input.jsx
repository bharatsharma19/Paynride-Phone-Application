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

export default function Input({ keyboardType, placeholder, error, iconName, setValue, defaultValue, ...props }) {
    return (
        <View style={{ padding: 4, width: width * 0.8, marginTop: 4, marginBottom: 4 }}>
            <View style={styles.textContainer}>
                <Icon name={iconName} style={{ fontSize: 22, color: "#000", marginRight: 4, }} />
                <TextInput
                    style={{ fontSize: 16, color: "#000" }}
                    {...props}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    placeholderTextColor="#000"
                    value={defaultValue ? defaultValue : ''}
                    editable={true}
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
        marginBottom: 6,
    },
});
