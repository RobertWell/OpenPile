import {App} from "./App";
import * as ReactDOM from "react-dom";
import {RouteComponentProps} from 'react-router-dom';
import * as React from "react";
import {createMemoryHistory, createBrowserHistory, History} from 'history';

export interface MountPayloadInterface {
    onNavigate?: string,
    defaultHistory?: History
}

export interface MountInterface {
    (el: HTMLElement,
     payload: MountPayloadInterface)
}

export const mount: MountInterface = (el, {onNavigate, defaultHistory}) => {

    const history = defaultHistory || createMemoryHistory();
    if (onNavigate) {
        history.listen(onNavigate);
    }
    ReactDOM.render(<App history={history}/>, el);

    return {
        onParentNavigate({pathname: nextPathname}) {
            const {pathname} = history.location;
            if (pathname !== nextPathname) {
                history.push(nextPathname);
            }
        }
    };
};

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.getElementById('app');
    if (devRoot) mount(devRoot, {defaultHistory: createBrowserHistory()});
}


