import {ActionTypes} from "../action-types";
import {CellType, Cell} from "../cell";

export type Direction = 'up' | 'down'

export interface MoveCellAction {
    type: ActionTypes.moveCell,
    payload: {
        id: string,
        direction: Direction
    }
}

export interface DeleteCellAction {
    type: ActionTypes.deleteCell,
    payload: string
}

export interface InsertCellAction {
    type: ActionTypes.insertCellBefore,
    payload: {
        id: string | null,
        type: CellType
    }
}

export interface InsertCellAfterAction {
    type: ActionTypes.insertCellAfter,
    payload: {
        id: string | null,
        type: CellType
    }
}

export interface UpdateCellAction {
    type: ActionTypes.updateCell,
    payload: {
        id: string,
        content: string
    }
}

export interface BundleStartAction {
    type: ActionTypes.Bundle_Start,
    payload: {
        cellId: string
    }
}


export interface BundleCompleteAction {
    type: ActionTypes.Bundle_Complete,
    payload: {
        cellId: string,
        bundle: {
            code: string,
            err: string
        }
    }
}


export interface FetchCellsAction {
    type: ActionTypes.FetchCells,

}

export interface FetchCellsCompleteAction {
    type: ActionTypes.FetchCellsComplete,
    payload: Cell[]
}

export interface FetchCellsErrorAction {
    type: ActionTypes.FetchCellsError,
    payload: string
}

export interface SaveCellsErrorAction {
    type: ActionTypes.SaveCellsError,
    payload: string
}

export interface InitializeAction {
    type: ActionTypes.Initialize,
}


export type Action = MoveCellAction |
    DeleteCellAction |
    InsertCellAction |
    UpdateCellAction |
    InsertCellAfterAction |
    BundleStartAction |
    BundleCompleteAction |
    FetchCellsAction |
    FetchCellsCompleteAction |
    FetchCellsErrorAction |
    SaveCellsErrorAction |
    InitializeAction

