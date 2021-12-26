import createDataContext from "./createDataContext";
import tracker from "../api/tracker";
import request from "../api/request";

const trackReducer = (state, action) => {
    switch (action.type) {
        case 'fetch_tracks':
            return action.payload
        default:
            return state;
    }

};


const fetchTracks = (state, dispatch) => {
    return async () => {
        const response = await tracker.get(request.getTracks())
        dispatch({type:'fetch_tracks', payload:response.data})
    };
};


const createTrack = (state, dispatch) => {
    return async (name, locations) => {
        console.log('create');
        await tracker.post(request.postTracks(), {name,  locations});
    };
};


export const {Provider, Context} = createDataContext(trackReducer,
    {fetchTracks, createTrack},
    []
);