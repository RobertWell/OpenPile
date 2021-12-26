import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {Text} from 'react-native-elements';
import MapView, {Polyline, Circle} from 'react-native-maps';
import {Context as LocationContext} from "../context/locationContext";

const Map = () => {
    const {state: {currentLocation, locations}} = useContext(LocationContext);


    if (!currentLocation) return (
        <ActivityIndicator size={"large"} style={{marginTop: 200}}/>
    );

    return (
        <View>
            <MapView
                style={styles.map}
                initialRegion={{

                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}

                region={{
                    ...currentLocation.coords,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
                // region={null}
            >
                <Circle
                    center={currentLocation.coords}
                    radius={15}
                    strokeColor={'rgba(158, 158, 255, 1.0)'}
                    fillColor={'rgba(158, 158, 255, 0.3)'}
                />


                <Polyline coordinates={locations.map(loc => loc.coords)} lineDashPattern={[1]}/>
            </MapView>

        </View>


    );
};

const styles = StyleSheet.create({
    map: {
        height: 300
    }
});

export default Map;
