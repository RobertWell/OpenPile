import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistMiddleware} from "../middleware/persis-middleware";

const middleware = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(thunk,persistMiddleware)) : applyMiddleware(thunk,persistMiddleware);

export const store = createStore(reducers, middleware)



//
// store.dispatch({
//     type:ActionTypes.insertCellAfter,
//     payload:{
//         id:null,
//         type:'code',
//     }
// })
//
// store.dispatch({
//     type:ActionTypes.insertCellAfter,
//     payload:{
//         id:null,
//         type:'text',
//     }
// })
//


// store.dispatch({
//     type:ActionTypes.insertCellBefore,
//     payload:{
//         id:null,
//         type:'code',
//     }
// })
//
// store.dispatch({
//     type:ActionTypes.insertCellBefore,
//     payload:{
//         id:null,
//         type:'text',
//     }
// })


//
// const state = store.getState()
//
// const id=state.cells?.order[1]
//
// if(id)store.dispatch({
//     type:ActionTypes.deleteCell,
//     payload:id
// })
// console.log(id)
// //
// console.log(state.cells)