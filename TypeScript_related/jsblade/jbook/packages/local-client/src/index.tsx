// @flow 
import * as React from 'react';
import {App} from "./App";
import ReactDOM from 'react-dom'
import 'bulmaswatch/superhero/bulmaswatch.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
type Props = {
    
};
export const Index = (props: Props) => {
    return (
        <div>
            <App/>
        </div>
    );
};

ReactDOM.render(<Index/>, document.getElementById('root'))

