import {ActionTypes} from "../action-types";
import produce from "immer";
import {Action} from "../actions";


interface BundleState {
    initialized: boolean,
    data: {
        [key: string]: {
            loading: boolean,
            code: string,
            err: string,

        } | undefined
    }
}

const initialState: BundleState = {
    initialized: false,
    data: {}
}

const reducer = produce((state: BundleState = initialState, action: Action): BundleState => {

    switch (action.type) {
        case ActionTypes.Initialize:
            state.initialized = true
            return state

        case ActionTypes.Bundle_Complete:
            state.data[action.payload.cellId] = {
                loading: false,
                code: action.payload.bundle.code,
                err: action.payload.bundle.err
            }
            return state

        case ActionTypes.Bundle_Start:
            state.data[action.payload.cellId] = {
                loading: true,
                code: '',
                err: ''
            }
            return state
        default:
            return state
    }


}, initialState)

export default reducer