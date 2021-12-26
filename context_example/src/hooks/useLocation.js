import {useEffect, useState} from "react";
import {
    Accuracy,
    requestForegroundPermissionsAsync,
    watchPositionAsync
} from "expo-location";


export default (shouldTrack, recording, callback) => {

    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatch = async () => {
            let {status} = await requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            subscriber = await watchPositionAsync({
                accuracy: Accuracy.BestForNavigation,
                timeInterval: 1000,
                distanceInterval: 10
            }, callback);


        };


        if (shouldTrack) startWatch();
        else {
            if (subscriber) {
                subscriber.remove();
                subscriber = null;
            }
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
                subscriber = null;
            }
        };

    }, [shouldTrack, recording, callback]);


    return [errorMsg];
}