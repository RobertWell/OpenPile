import * as React from 'react';

export const navigationRef  = React.createRef();

export function navigate(name, params) {
    // console.log('==========================',navigationRef);
    setTimeout(()=>{navigationRef .current?.navigate(name, params)});
}