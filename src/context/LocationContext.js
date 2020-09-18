import createDataContext from './createDataContext';

const initalState = {
    recording: false,
    locations: [],
    currentLocation: null,
    locationTitle: ''
};

const ADD_CURRENT_LOCATION = (state, actionPayload) => {
    return {
        ...state,
        currentLocation: actionPayload
    };
};
const RECORD_LOCATION = (state, actionPayload) => {
    return {
        ...state,
        locations: [...state.locations, actionPayload]
    };
};
const START_RECORDING = (state) => {
    return {
        ...state,
        recording: true
    };
};
const STOP_RECORDING = (state) => {
    return {
        ...state,
        recording: false
    };
};

const SET_LOCATION_TITLE = (state, actionPayload) => {
    return {
        ...state,
        locationTitle: actionPayload
    };
};

const RESET = (state) => {
    return {
        ...state,
        locationTitle: '',
        locations: [],
        recording: false
    }
};

const locationReducer = (state, { type, payload }) => {
    switch (type) {
        case 'ADD_CURRENT_LOCATION': return ADD_CURRENT_LOCATION(state, payload);
        case 'RECORD_LOCATION': return RECORD_LOCATION(state, payload);
        case 'SET_LOCATION_TITLE': return SET_LOCATION_TITLE(state, payload);
        case 'START_RECORDING': return START_RECORDING(state);
        case 'STOP_RECORDING': return STOP_RECORDING(state);
        case 'RESET': return RESET(state);
        default: return state;
    }
};

//actions
const startRecording = dispatch => () => {
    
    dispatch({ type: 'START_RECORDING' });
};

const stopRecording = dispatch => () => {
    
    dispatch({ type: 'STOP_RECORDING' });
};

const setLocationTitle = dispatch => (title) => {
    
    dispatch({ type: 'SET_LOCATION_TITLE', payload: title });
};

const addLocation = dispatch => (location, recording) => {

    dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
    if (recording) {
        dispatch({ type: 'RECORD_LOCATION', payload: location });
    }
};

const reset = dispatch => () => {
    dispatch({ type: 'RESET' });
};

export const { Context, Provider } = createDataContext(locationReducer, {
    startRecording,
    stopRecording,
    addLocation,
    setLocationTitle,
    reset
}, initalState);