import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Spacer from "./Spacer";
import { useNavigation } from '@react-navigation/native';


const styles = StyleSheet.create({
    link:{
        color:'blue',
        alignSelf: 'center',
    }
})

const NavLink = ({ text, routeName}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>navigation.navigate(routeName)}>
            <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
    );
};

export default NavLink;