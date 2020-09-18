import { useState, useEffect } from 'react';
import { Accuracy, requestPermissionsAsync, watchPositionAsync } from 'expo-location';

const useLocationHook = (shouldTrack, sendLocationCallback) => {
    const [error, setError] = useState(null);

    useEffect(() => {
        let subscriber;
        const startWatching = async () => {
            try {
                const { granted } = await requestPermissionsAsync();
                subscriber = await watchPositionAsync({
                    accuracy: Accuracy.BestForNavigation,
                    timeInterval: 1000,
                    distanceInterval: 10
                }, (location) => {
                    sendLocationCallback(location);
                });

                if (!granted) {
                    throw new Error('Location permission not granted');
                }
            } catch ({ message }) {
                setError(message);
            }
        };


        if (shouldTrack) {
            startWatching();
        } else {
            if (subscriber) {
                subscriber.remove();
            }               
            subscriber = null;
        }

        return () => {
            if (subscriber) {
                subscriber.remove();
            }
        };

    }, [shouldTrack, sendLocationCallback]);

    return [error]
};
export default useLocationHook;