import createDataContext from './createDataContext';
import { instance as axios } from '../axios/axios_tracker';

const initalState = {
    tracks: []
};

const FETCH_TRACKS = (state, actionPayload) => {
    return {
        ...state,
        tracks: actionPayload
    }
};

const trackReducer = (state, { type, payload }) => {
    switch (type) {
        case 'FETCH_TRACKS': return FETCH_TRACKS(state, payload)
        default: return state;
    };
};

const fetchTracks = dispatch => async () => {
    try {
        const { data } = await axios.get('tracks');
        dispatch({ type: 'FETCH_TRACKS', payload: data });
    } catch (e) {
        console.log(e);
    }
    
};

const createTrack = dispatch => async (locationTitle, locations) => {
    const { data } = await axios.post('/tracks', { name: locationTitle, locations });
};

export const { Context, Provider } = createDataContext(trackReducer, {
    fetchTracks,
    createTrack
}, initalState);