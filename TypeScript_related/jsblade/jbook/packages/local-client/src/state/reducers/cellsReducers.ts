import {ActionTypes} from "../action-types";
import produce from "immer";
import {Action} from "../actions";
import {Cell} from "../cell";

interface CellState {
    loading: boolean,
    error: string | null,
    order: string[],
    data: {
        [key: string]: Cell
    }
}


const initialState: CellState = {
    data: {},
    error: null,
    loading: false,
    order: []

}

//immer可以不用return state
//由於produce有可能是null，reducer需要型態宣告?No, 把initialState放在裡面即可!
const reducer = produce((state: CellState = initialState, action: Action): CellState => {
    let cell: Cell, index
    switch (action.type) {
        case ActionTypes.SaveCellsError:
            state.error = action.payload
            return state

        case ActionTypes.FetchCells:
            state.loading = true
            state.error = null
            return state
        case ActionTypes.FetchCellsComplete:
            state.order = action.payload.map(cell => cell.id)
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell
                return acc
            }, {} as CellState['data'])


            return state

        case ActionTypes.FetchCellsError:
            state.loading = false
            state.error = action.payload
            return state


        case ActionTypes.updateCell:
            const {id, content} = action.payload
            state.data[id].content = content
            return state

        case ActionTypes.moveCell:
            const {direction} = action.payload
            const Index = state.order.findIndex(id => id === action.payload.id)
            let targetIndex: number;
            switch (direction) {
                case "down":
                    targetIndex = Index + 1
                    break
                case "up":
                    targetIndex = Index - 1
                    break
                default:
                    return state
            }

            if (targetIndex < 0 || targetIndex >= state.order.length) {
                return state
            }

            let temp = state.order[Index]
            state.order[Index] = state.order[targetIndex]
            state.order[targetIndex] = temp

            return state
        case ActionTypes.insertCellBefore:

            cell = {
                content: "", id: randomID(), type: action.payload.type
            }


            state.data[cell.id] = cell

            index = state.order.findIndex(id => id === action.payload.id)

            if (index < 0) {
                state.order.push(cell.id)
            } else {
                state.order.splice(index, 0, cell.id)
            }
            return state

        case ActionTypes.deleteCell:
            delete state.data[action.payload]
            state.order = state.order.filter(id => id !== action.payload)
            // console.log('-----------------------delete')
            // console.log(state.order)
            // console.log(state.data)
            return state
        case ActionTypes.insertCellAfter:
            cell = {
                content: "", id: randomID(), type: action.payload.type
            }
            state.data[cell.id] = cell
            index = state.order.findIndex(id => id === action.payload.id)
            // state.order.splice(index + 1, 0, cell.id)
            if (index < 0) {
                state.order.unshift(cell.id)
            } else {
                state.order.splice(index + 1, 0, cell.id)
            }
            return state
        default:
            return state
    }
}, initialState)

const randomID = () => {
    return Math.random().toString(36).substr(2, 5)
}

export default reducer


//state 形式:
// {
//     loading:false,
//     error:null,
//     data:{
//         'dsads':{id:'dsads',type: 'code', content: 'const a=1' },
//         'ddd':{id:'dsads',type: 'code', content: 'const a=1' },
//         'sss':{id:'dsads',type: 'code', content: 'const a=1' },
// }
// }