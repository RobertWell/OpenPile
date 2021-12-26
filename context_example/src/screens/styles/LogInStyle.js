import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    SafeArea:{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 25 : 0
    },
    container: {
        // borderColor: 'red',
        // borderWidth: 10
        // backgroundColor:'grey',
        borderRadius: 5,
        flex: 1,
        justifyContent: 'center',
        // marginTop: 10

    },
    title: {
        fontSize: 25
    },
    button: {},
    errorMsg: {
        color: 'red',
        fontSize: 16,
        alignSelf: 'center',
    },
    link:{
        color:'blue',
        alignSelf: 'center',
    }
});


export default styles;