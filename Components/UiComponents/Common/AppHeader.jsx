import React from 'react';
import {
    Image,
    Dimensions,
    View,
} from 'react-native';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'
import { DrawerActions } from '@react-navigation/native'
const { width, height } = Dimensions.get('window')

export default function AppHeader() {

    var navigation = useNavigation()

    return (
        <View>
            <View style={{ alignItems: 'center', backgroundColor: '#fff', display: 'flex', width: width, height: height * 0.08, justifyContent: 'space-between', flexDirection: 'row', padding: 5, backgroundColor: "#ecf0f1", }}>
                <MCI name="menu" size={24} onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ color: "#000", marginLeft: 8, }} />
                <Image style={{ resizeMode: 'contain', width: 72, height: 120 }}
                    source={require('../../Assets/classic.png')} />
                <MCI name="account" size={24} style={{ color: "#000", marginRight: 8, }} />
            </View>
        </View>
    )
}
