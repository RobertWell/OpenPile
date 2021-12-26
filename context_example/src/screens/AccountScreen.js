import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Button} from "react-native-elements";
import Spacer from "../components/Spacer";
import {Context as AuthContext} from "../context/AuthContext";
import {SafeAreaView} from "react-native-safe-area-context";

const styles = StyleSheet.create({
    container: {

    },
    title: {
        fontSize: 48
    }
});

const AccountScreen = () => {
    const {signout} = useContext(AuthContext);
    return (
        <SafeAreaView style={styles.container} >
            <Text style={styles.title}>AccountScreen</Text>
            <Button title={'Sign Out'} onPress={signout}/>
        </SafeAreaView>
    );
};

export default AccountScreen;