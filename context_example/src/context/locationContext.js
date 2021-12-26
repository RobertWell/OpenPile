import createDataContext from "./createDataContext";


const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return {...state, currentLocation: action.payload};
        case 'add_location':
            // console.log('add_location');
            return {...state, locations: [...state.locations, action.payload]};
        case 'stop_recording':
            return {...state, recording: false};
        case 'start_recording':
            return {...state, recording: true};
        case 'change_name':
            return {...state, name: action.payload};
        case 'reset':
            return {...state, name: '', recording: false, locations: []};
        default:
            return state;
    }
};

const changeName = (state, dispatch) => {
    return (name) => {
        dispatch({type: 'change_name', payload: name});
    };
};


const startRecoding = (state, dispatch) => {
    return () => {
        dispatch({type: 'start_recording'});
    };
};

const stopRecoding = (state, dispatch) => {
    return () => {
        dispatch({type: 'stop_recording'});
    };
};

const addLocation = (state, dispatch) => {
    return (location, recording) => {

        dispatch({type: 'add_current_location', payload: location});
        if (recording) dispatch({type: 'add_location', payload: location});
    };
};

const reset = (state, dispatch) => () => {
    dispatch({type: 'reset'});
};


export const {Provider, Context} = createDataContext(locationReducer, {
    startRecoding,
    stopRecoding,
    addLocation,
    changeName,
    reset

}, {
    recording: false,
    locations: [],
    currentLocation: null,
    name: ''
});