import React from 'react';
import ReactDOM from 'react-dom';
const show = value=>{
    if(typeof value==='object'){
        const root =  document.getElementById('root')
        if(value.$$typeof && value.props){
            ReactDOM.render(value,root)
        }else root.innerHTML=JSON.stringify(value)
    }

    else root.innerHTML=value
}