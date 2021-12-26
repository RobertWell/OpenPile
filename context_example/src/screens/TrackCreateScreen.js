import '../_mockLocation';
import React, {useContext, useEffect, useState, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import Map from "../components/Map";
import {SafeAreaView} from "react-native-safe-area-context";
import {Context as LocationContext} from "../context/locationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";

const styles = StyleSheet.create({
    container: {
        // margin:5
    },
    title: {
        fontSize: 25
    }
});


const TrackCreateScreen = ({navigation}) => {
    const [focus, setFocus] = useState(true);
    const {state:{recording}, addLocation,startRecoding,stopRecoding} = useContext(LocationContext);
    const callBack =useCallback((location)=>{
        addLocation(location, recording)
    }, [recording])

    const [errorMsg] = useLocation(focus,recording, callBack);


    useEffect(() => {
        const unsubscribe1 = navigation.addListener('focus', () => {
            // startRecoding()
            setFocus(true);
        });
        // const unsubscribe2 = navigation.addListener('blur', () => {
        //     // stopRecoding()
        //     setFocus(false);
        // });


        return () => {
            unsubscribe1();
            // unsubscribe2();
            setFocus(false);
        };

    }, []);
    return (
        <SafeAreaView>
            <Text h3>TrackCreateScreen</Text>
            <Map/>
            <TrackForm/>
            {errorMsg ? <Text>{errorMsg}</Text> : null}
        </SafeAreaView>
    );
};

export default TrackCreateScreen;