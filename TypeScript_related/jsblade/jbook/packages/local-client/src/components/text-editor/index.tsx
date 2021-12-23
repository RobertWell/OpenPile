// @flow 
import * as React from 'react';
import MDEditor from '@uiw/react-md-editor'
import {useState, useEffect, useRef} from "react";
import './index.scss'
import {Cell} from "../../state";
import {useActions} from "../../hooks/use-actions";


type Props = {
    cell: Cell
};
export const TextEditor: React.FC<Props> = ({cell}: Props) => {

    const [editing, setEditing] = useState<boolean>(false)
    const {updateCell} =useActions()
    const ref = useRef<HTMLDivElement | null>(null)
    // const [value, setValue] = useState<string>('# Header');


    useEffect(() => {
        const listener = (event: MouseEvent) => {
            if (event.target && ref.current?.contains(event.target as Node)) {
                return
            }
            setEditing(false)
        }
        document.addEventListener('click', listener, {capture: true})
        return () => {
            document.removeEventListener('click', listener, {capture: true})
        }
    }, [])
    return (
        <div>
            {editing ? <div className={'text-editor'} ref={ref}>
                    <MDEditor value={cell.content} onChange={text => updateCell(cell.id,text || '')}/>
                </div> :
                <div onClick={() => setEditing(true)} className={'text-editor'}>
                    <div className={'card-content'}>
                        <MDEditor.Markdown source={cell.content||'Click to edit'}/>
                    </div>
                </div>}

        </div>
    );
};