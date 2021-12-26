import React, {useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Button, FlatList, TouchableOpacity} from 'react-native';
import {Context as TrackContext} from "../context/TrackContext";
import {ListItem} from "react-native-elements";


const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 25
    }
});


const TrackListScreen = ({navigation}) => {
    const {state, fetchTracks} = useContext(TrackContext);
    useEffect(() => {
        const unsubscriber = navigation.addListener('focus', fetchTracks);

        return unsubscriber;
    }, []);
    // console.log(state);
    return (
        <View style={styles.container}>
            {/*<Button title={'Go to Track Detail'} onPress={() => navigation.push('TrackDetail')}/>*/}

            {
                state.map(({_id, name}, i) => (
                    <TouchableOpacity key={_id} onPress={() => navigation.navigate('TrackDetail', {_id})}>
                        <ListItem>
                            <ListItem.Content>
                                <ListItem.Title> {name}</ListItem.Title>
                            </ListItem.Content>
                            <ListItem.Chevron/>
                        </ListItem>
                    </TouchableOpacity>


                ))
            }
            {/*<FlatList*/}
            {/*    data={state}*/}
            {/*    keyExtractor={(item) => item._id}*/}
            {/*    renderItem={({ item }) => {*/}
            {/*        return (*/}
            {/*            <TouchableOpacity>*/}
            {/*                <Text>{item.name}</Text>*/}
            {/*                <ListItem>*/}
            {/*                    */}
            {/*                /!*    <ListItem.Content>*!/*/}
            {/*                /!*        <ListItem.Title>{item.name}</ListItem.Title>*!/*/}
            {/*                /!*    </ListItem.Content>*!/*/}
            {/*                /!*    <ListItem.Chevron />*!/*/}
            {/*                </ListItem>*/}
            {/*            </TouchableOpacity>*/}
            {/*        );*/}
            {/*    }}*/}
            {/*/>*/}


        </View>
    );
};

export default TrackListScreen;