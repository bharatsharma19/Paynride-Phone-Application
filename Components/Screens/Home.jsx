import { React } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Text
} from 'react-native';

const { width, height } = Dimensions.get('window')

const Home = () => {
    return (
        <View style={styles.container}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <Text>
                    Home Page
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 24,
        height: height * 0.32,
        width: width * 0.84,
        borderRadius: 16,
        marginTop: '32%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});

export default Home;
