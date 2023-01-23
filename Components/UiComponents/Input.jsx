import { React } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

const Input = ({ labelTxt, placeholder, setValue, ...props }) => {

    return (
        <View>
            <Text style={styles.title}>{labelTxt}</Text>
            <View>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        onChangeText={(txt) => setValue(txt)}
                        {...props}
                    />
                </SafeAreaView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        marginLeft: 13,
        color: "#000",
        fontSize: 18,
        fontWeight: 600,
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});

export default Input;
