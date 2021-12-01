import React, {lazy, Suspense, useState, useEffect} from 'react';
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {createBrowserHistory} from "history";




const HeatmapLazy = lazy(() => import('./Components/HeatmapApp'));


const history = createBrowserHistory();

export default () => {

    return (
        <Router history={history}>
            <h1>Hello Container: dashboard</h1>
            <Suspense fallback={<h1>Loading...</h1>}>
                
                <HeatmapLazy/>
                
                
            </Suspense>
        </Router>
    );
};
