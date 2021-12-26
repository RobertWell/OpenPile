import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
import request from "../api/request";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from "../RootNavigation";

const signup = (state, dispatch) => {
    return async ({email, password}, callback = null) => {
        try {

            const resp = await tracker.post(request.SignUp(), {email, password});
            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({type: 'signup', payload: resp.data.token});
            navigate('TrackList');
        } catch (e) {
            const msg = e.response?.data;
            if (msg && msg.startsWith('User Validation failed: MongoError: E11000 duplicate key error collection:')) return dispatch({
                type: 'error',
                payload: "Email already exists!"
            }); else if (msg) return dispatch({
                type: 'error',
                payload: msg
            });

            return dispatch({type: 'error', payload: "Something wrong with sign up"});
        }
    };
};

const signin = (state, dispatch) => {
    return async ({email, password}) => {
        //    Make Api request to sign in with that email and password
        try {
            const resp = await tracker.post(request.SignIn(), {email, password});
            await AsyncStorage.setItem('token', resp.data.token);
            dispatch({type: 'signin', payload: resp.data.token});
            navigate('TrackList');
        } catch (e) {
            const msg = e.response?.data;
            if (msg && msg.startsWith('User Validation failed: MongoError: E11000 duplicate key error collection:')) return dispatch({
                type: 'error',
                payload: "Email already exists!"
            }); else if (msg) return dispatch({
                type: 'error',
                payload: msg
            });

            return dispatch({type: 'error', payload: "Something wrong with sign up"});
        }
        // dispatch({type: 'signin', payload: {email, password}});

    };
};
const signout = (state, dispatch) => {
    return async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type: 'signout'});
        navigate('Signin');
    };
};

const clearErrorMsg = (state, dispatch) => {
    return () => {
        // console.log('===========clearErrorMsg');
        dispatch({type: 'clearError'});
    };
};

const error = (state, dispatch) => {
    return (text) => {
        // console.log('===========error');
        dispatch({type: 'error', payload: text});
    };
};

const tryLocalSignin = (state, dispatch) => async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
        dispatch({type: 'signin', payload: token});
        navigate('TrackList');
    } else {
        navigate('Signup');
    }
};


const authReducer = (state, action) => {

    switch (action.type) {
        case 'signin':
            return {...state, token: action.payload, errorMsg: ''};
        case 'signup':
            return {...state, token: action.payload, errorMsg: ''};
        case 'signout':
            return {...state, token: null};
        case 'error':
            return {...state, errorMsg: action.payload};
        case 'clearError':
            return {...state, errorMsg: ''};
        default:
            return state;
    }
};


export const {Provider, Context} = createDataContext(authReducer, {
    tryLocalSignin,
    error,
    clearErrorMsg,
    signup,
    signin,
    signout
}, {
    token: null,
    errorMsg: '',

});