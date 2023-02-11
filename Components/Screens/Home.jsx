import { React } from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    SafeAreaView,
    ScrollView
} from 'react-native';
import Faq from '../UiComponents/Home/Faq';
import Featured from '../UiComponents/Home/Featured';
import Investors from '../UiComponents/Home/Investors';
import Journey from '../UiComponents/Home/Journey';
import Offer from '../UiComponents/Home/Offer';
import Search from '../UiComponents/Home/Search';

const { width, height } = Dimensions.get('window')

const HomePage = ({ navigation }) => {
    return (
        <>
            <ScrollView>
                <SafeAreaView style={{ flex: 1, backgroundColor: '#f2f2f2', }}>
                    <View style={styles.container}>
                        <View>
                            <Search navigation={navigation} />
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
                </SafeAreaView>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        height: height,
        width: width * 1,
    },
});

export default HomePage;
