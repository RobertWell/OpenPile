import {useContext} from "react";
import {Context as TrackContext} from "../context/TrackContext";
import {Context as LocationContext} from "../context/locationContext";
import {Context as AuthContext} from "../context/AuthContext";
import {navigate} from "../RootNavigation";

export default () => {
    const {createTrack} = useContext(TrackContext);
    const {state: {name, locations}, reset} = useContext(LocationContext);
    const {state: {token}} = useContext(AuthContext);

    const saveTrack = () => {
        createTrack(name, locations);
        reset();
        navigate('TrackList')
    };

    return [saveTrack];
}


