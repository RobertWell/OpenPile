import {ActionTypes} from "../action-types";
import {
    Action,
    DeleteCellAction,
    Direction,
    InsertCellAction,
    InsertCellAfterAction,
    MoveCellAction,
    UpdateCellAction
} from "../actions";
import {Cell, CellType} from "../cell";
import {Dispatch} from "redux";
import {bundle, initialize as _initialize} from "../../bundler";
import axios from "axios";
import {RootState} from "../reducers";


export const deleteCell = (id: string): DeleteCellAction => {
    return {
        type: ActionTypes.deleteCell,
        payload: id
    }
}
export const insertCellBefore = (id: string | null, type: CellType): InsertCellAction => {
    return {
        type: ActionTypes.insertCellBefore,
        payload: {id, type}
    }
}

export const insertCellAfter = (id: string | null, type: CellType): InsertCellAfterAction => {
    return {
        type: ActionTypes.insertCellAfter,
        payload: {id, type}
    }
}

export const moveCell = (id: string, direction: Direction): MoveCellAction => {
    return {
        type: ActionTypes.moveCell,
        payload: {id, direction}
    }
}
export const updateCell = (id: string, content: string): UpdateCellAction => {
    return {
        type: ActionTypes.updateCell,
        payload: {id, content}
    }
}

export const initialize = () => {
    return async (dispatch: Dispatch<Action>) => {
        await _initialize()
        dispatch({
            type: ActionTypes.Initialize
        })
    }
}

export const createBundle = (cellId: string, input: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.Bundle_Start,
            payload: {cellId}
        })


        const result = await bundle(input)

        dispatch({
            type: ActionTypes.Bundle_Complete,
            payload: {
                cellId,
                bundle: {
                    code: result.code,
                    err: result.error
                }
            }
        })

    }
}


export const fetchCells = () => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({type: ActionTypes.FetchCells})

        try {
            const {data}: { data: Cell[] } = await axios.get('/cells')
            dispatch({
                type: ActionTypes.FetchCellsComplete,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: ActionTypes.FetchCellsError,
                payload: e.message
            })
        }

    }
}

export const saveCells = () => {
    return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
        const {cells: {data, order}} = getState()
        const cells = order.map(id => data[id])
        try {
            await axios.post('/cells', {cells})
        } catch (e) {
            dispatch({
                type: ActionTypes.SaveCellsError,
                payload: e.message
            })
        }
    }
}