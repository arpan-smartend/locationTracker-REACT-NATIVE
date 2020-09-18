import createDataContext from './createDataContext';
import { instance as axios } from '../axios/axios_tracker';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    token: null,
    error: null
};

//reducer functions
const SET_ERROR = (state, { payload }) => {
    return {
        ...state,
        error: payload
    };
};

const CLEAR_ERROR = (state) => {
    return {
        ...state,
        error: null
    };
};

const SIGN_IN = (state, { payload }) => {
    return {
        ...state,
        token: payload,
        error: null
    };
};

const SIGN_OUT = (state) => {
    return {
        ...state,
        ...initialState
    };
};

// reducer
const authReducer = (state, action) => {
    switch (action.type) {
        case 'SET_ERROR': return SET_ERROR(state, action);
        case 'SIGN_IN': return SIGN_IN(state, action);
        case 'SIGN_OUT': return SIGN_OUT(state);
        case 'CLEAR_ERROR': return CLEAR_ERROR(state);
        default: return state;
    }
};

//actions

const autoLogin = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({ type: 'SIGN_IN', payload: token });
        return token;
    }
};

const signUp = (dispatch) => async ({ email, password }) => {
    try {
        const { data: { token } } = await axios.post('/signUp', {
            email,
            password
        });
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'SIGN_IN', payload: token });
    } catch ({ response: { data } }) {
        dispatch({ type: 'SET_ERROR', payload: data });
    }
};

const signIn = (dispatch) => async ({ email, password }) => {
    try {
        const { data: { token } } = await axios.post('/login', {
            email,
            password
        });
        await AsyncStorage.setItem('token', token);
        dispatch({ type: 'SIGN_IN', payload: token });
    } catch ({ response: { data } }) {
        dispatch({ type: 'SET_ERROR', payload: data });
    }
};
const signOut = (dispatch) => async () => {

    try {
        const { data } = await axios.get('/logout');
        if (data) {
            await AsyncStorage.removeItem('token');
            dispatch({ type: 'SIGN_OUT' });
        } else {
            throw new Error();
        }

    } catch (e) {
        await AsyncStorage.removeItem('token');
        console.log(e);
        dispatch({ type: 'SET_ERROR', payload: 'Error Occurred while logging out' });
    }

};

const clearError = (dispatch) => () => {
    dispatch({ type: 'CLEAR_ERROR' });
};

export const { Context, Provider } = createDataContext(authReducer, {
    autoLogin,
    signUp,
    signIn,
    signOut,
    clearError
}, initialState);