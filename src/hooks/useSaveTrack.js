import { useContext } from 'react';
import { Context as LocationContext } from '../context/LocationContext';
import { Context as TrackContext } from '../context/TrackContext';
import { useNavigation } from '@react-navigation/native';

const useSaveTrack = () => {
    const navigation = useNavigation();
    const { createTrack } = useContext(TrackContext);
    const { state: { locations, locationTitle }, reset } = useContext(LocationContext);

    const saveTrack = async () => {
        await createTrack(locationTitle, locations);
        reset();
        navigation.jumpTo('Tracks');
    };

    return [saveTrack];

};
export default useSaveTrack;