// @flow 
import React, {Fragment, useEffect} from 'react';
import {useTypeSelector} from "../../hooks/use-type-selector";
import {CellListItem} from '../cell-list-item'
import {AddCell} from "../add-cell";
import './index.scss'
import {useActions} from "../../hooks/use-actions";

type Props = {};
export const CellList: React.FC<Props> = (props: Props) => {
    const cells = useTypeSelector(({cells: {data, order}}) => {
        return order.map(id => data[id]
        )
    })
    const {fetchCells, saveCells} = useActions()

    useEffect(()=>{
        fetchCells()
    }, [])

    // useEffect(()=>{
    //     saveCells()
    // }, [JSON.stringify(cells)])

    const renderCells = cells.map(cell =>
        <Fragment key={cell.id}>
            <CellListItem cell={cell}/>
            <AddCell previousCellId={cell.id} forceVisible={cells.length === 0}/>
        </Fragment>
    )

    renderCells.unshift(
        <AddCell previousCellId={null} forceVisible={cells.length === 0}  key={'aaaaaa'}/>
    )
    return (
        <div className={'cell-list'}>
            {/*<AddCell previousCellId={null} forceVisible={cells.length === 0}/>*/}
            {renderCells}
            {/*<div className={cells.length === 0 ? 'force-visible' : ''}>*/}
            {/*    <AddCell nextCellId={null} forceVisible={cells.length===0}/>*/}
            {/*</div>*/}

        </div>
    );
};