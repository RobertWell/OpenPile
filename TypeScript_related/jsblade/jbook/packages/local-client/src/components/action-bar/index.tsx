// @flow 
import * as React from 'react';
import {useActions} from "../../hooks/use-actions";
import './index.scss'

interface ActionBarInterface {
    id: string
}

export const ActionBar: React.FC<ActionBarInterface> = ({id}: ActionBarInterface) => {
    const {moveCell, deleteCell} = useActions()

    return (
        <div className={'action-bar'}>
            <button
                className={'is-primary is-small button'}
                onClick={() => moveCell(id, 'up')}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button
                className={'is-primary is-small button'}
                onClick={() => moveCell(id, 'down')}>
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button
                className={'is-primary is-small button'}
                onClick={() => deleteCell(id)}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>

        </div>
    );
};