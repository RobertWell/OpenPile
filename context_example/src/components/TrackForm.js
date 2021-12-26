import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, Input, Button} from 'react-native-elements';
import {Context as LocationContext} from "../context/locationContext";
import Spacer from "./Spacer";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = ({}) => {
    // const [name, setName] = useState('');
    const {
        state: {name, recording, locations},
        addLocation,
        startRecoding,
        stopRecoding,
        changeName
    } = useContext(LocationContext);

    // console.log(locations.length);

    const [saveTrack] = useSaveTrack();

    return (
        <View>
            <Spacer>
                <Input placeholder={'Enter Name'} value={name} onChangeText={changeName}/>
            </Spacer>

            {recording ?
                <Spacer>
                    <Button title={'Stop Recording'} onPress={stopRecoding}/>
                </Spacer> :
                <Spacer>
                    <Button title={'Start Recording'} onPress={startRecoding}/>
                </Spacer>
            }
            {!recording && locations.length ? (
                <Spacer>
                    <Button title={'Save Recording'} onPress={saveTrack}/>
                </Spacer>

            ) : null}


            {/*<Text>recording: {JSON.stringify(recording)} ,name: {name}</Text>*/}
            {/*<Text>{locations.length}</Text>*/}
        </View>
    );
};

export default TrackForm;