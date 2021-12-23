// @flow 
import * as React from 'react';
import {Cell} from "../../state";
import {CodeCell} from "../code-cell/code-cell";
import {TextEditor} from "../text-editor";
import {ActionBar} from "../action-bar";

import './index.scss'

type Props = {
    cell: Cell
};


export const CellListItem: React.FC<Props> = ({cell}: Props) => {
    let Child: JSX.Element
    if (cell.type === 'code') {
        Child =
            <>
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id}/>
                </div>
                <CodeCell cell={cell}/>

            </>
    } else {
        Child =
            <>
                <TextEditor cell={cell}/>
                <ActionBar id={cell.id}/>
            </>

    }

    return (
        <div className={'cell-list-item'}>
            {Child}
        </div>
    );
};