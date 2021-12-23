import React from 'react';
// import {CodeCell} from "./components/code-cell";
// import {TextEditor} from "./components/text-editor";
import {Provider} from "react-redux";
import {store} from "./state";
import {CellList} from "./components/cell-list";

type Props = {};
export const App = (props: Props) => {

    return (
        <div>
            <Provider store={store}>
                <CellList/>
            </Provider>

            {/*<hr/>*/}
            {/*<CodeCell/>*/}

        </div>
    );
};


