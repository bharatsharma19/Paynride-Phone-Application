import { React } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
} from 'react-native';
import Faq from '../UiComponents/Home/Faq';
import Featured from '../UiComponents/Home/Featured';
import Investors from '../UiComponents/Home/Investors';
import Journey from '../UiComponents/Home/Journey';
import Offer from '../UiComponents/Home/Offer';
import Search from '../UiComponents/Home/Search';

const { width, height } = Dimensions.get('window')

const HomePage = () => {
    return (
        <View style={styles.container}>
            <View>
                <Search />
            </View>
            <View style={{ marginTop: 4, }}>
                <Featured />
            </View>
            <View style={{ marginTop: 4, }}>
                <Offer />
            </View>
            <View style={{ marginTop: 4, }}>
                <Journey />
            </View>
            <View style={{ marginTop: 4, }}>
                <Investors />
            </View>
            <View style={{ marginTop: 4, }}>
                <Faq />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width * 1,
    },
});

export default HomePage;
