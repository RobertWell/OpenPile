import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';


const HomeScreen = ({navigation}) => {
    return (
        <View >
            <Text >SignUpScreen</Text>
            <Button title={'Go to Signin'} onPress={() => navigation.push('Signin')}/>
            <Button title={'Go to Sign up'} onPress={() => navigation.push('Signup')}/>
        </View>
    );
};

export default HomeScreen;