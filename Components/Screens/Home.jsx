import { React } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Search from '../UiComponents/Home/Search';

const { width, height } = Dimensions.get('window')

const HomePage = () => {
    return (
        <View style={styles.container}>
            <View>
                <Search />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height * 1,
        width: width * 1,
    },
});

export default HomePage;
