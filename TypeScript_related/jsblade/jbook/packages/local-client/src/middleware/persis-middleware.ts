import {Dispatch} from "redux";
import {Action} from "../state/actions";
import {ActionTypes} from "../state/action-types";
import {saveCells} from "../state/action-creators";
import {RootState} from "../state";

export const persistMiddleware = ({dispatch, getState}: { dispatch: Dispatch<Action>, getState: () => RootState }) => {
    let timer: any

    return (next: (action: Action) => void) => {
        return (action: Action) => {
            next(action)

            if ([ActionTypes.moveCell,
                ActionTypes.updateCell,
                ActionTypes.insertCellAfter,
                ActionTypes.deleteCell].includes(action.type)) {
                if (timer) {
                    clearTimeout(timer)
                }
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState)
                }, 250)

            }
        }
    }
}