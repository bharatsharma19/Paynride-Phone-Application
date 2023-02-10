import { Dimensions, TouchableOpacity, View, Text } from "react-native"
const { width } = Dimensions.get('window')

export default function AppButton({ buttonText, borderRadius, btnWidth, bgColor, margintop, marginleft, marginright, pd, ...props }) {
    return (
        <TouchableOpacity {...props}>
            <View style={{
                width: width * (btnWidth ? btnWidth : 1),
                backgroundColor: bgColor ? bgColor : '#3498db',
                borderRadius: borderRadius ? borderRadius : 10,
                borderWidth: 0.5,
                borderColor: bgColor,
                padding: pd ? pd : 10,
                marginTop: margintop ? margintop : 10,
                display: 'flex',
                alignItems: 'center',
                marginLeft: marginleft ? marginleft : 12,
                marginRight: marginright ? marginright : "auto",
            }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                    {buttonText}
                </Text>
            </View>
        </TouchableOpacity>

    )
}
