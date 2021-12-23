import {useTypeSelector} from "./use-type-selector";

export const useCumulativeCode = (callId: string):string => {
    return useTypeSelector(state => {
            const {data, order} = state.cells
            const orderCells = order.map(id => data[id])
            const showFunc =
                `
import _React from 'react';
import _ReactDOM from 'react-dom';
var show = value=>{
    if(typeof value==='object'){
        const root =  document.getElementById('root')
        if(value.$$typeof && value.props){
            _ReactDOM.render(value,root)
        }else root.innerHTML=JSON.stringify(value)
    }

    else root.innerHTML=value
}
                `
            const showFuncNoop = `var show = ()=>{}`
            const cumulativeCode = []
            for (let c of orderCells) {
                if (c.type === 'code') {
                    if (c.id === callId) {
                        cumulativeCode.push(showFunc)
                    } else cumulativeCode.push(showFuncNoop)
                    cumulativeCode.push(c.content)
                }
                if (c.id === callId) break
            }

            return cumulativeCode
        }
    ).join('\n')


}