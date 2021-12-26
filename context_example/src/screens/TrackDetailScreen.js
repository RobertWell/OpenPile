import React, {useContext} from 'react';
import {StyleSheet,  View} from 'react-native';
import {Text} from 'react-native-elements'
import {Context as TrackContext} from "../context/TrackContext";
import MapView, {Polyline} from "react-native-maps";

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 48
    },
    map: {
        height: 300
    }
});


const TrackDetailScreen = ({route}) => {
    const _id = route.params._id;
    const {state} = useContext(TrackContext);
    const track = state.find(t => t._id === _id);
    const initialCoords =track.locations[0].coords

    return (
        <View style={styles.container}>
            <Text h2>{track.name}</Text>
            {/*<Text>{JSON.stringify(track.locations[0].coords)}</Text>*/}
            {track.locations ? <MapView
                style={styles.map}
                initialRegion={{
                    ...initialCoords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <Polyline coordinates={track.locations.map(loc => loc.coords)} lineDashPattern={[1]}/>
            </MapView> : null}
        </View>
    );
};


export default TrackDetailScreen;