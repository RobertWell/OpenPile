// @flow
import * as React from 'react';
import {useEffect} from "react";
import {CodeEditor} from "../code-editor";
import {Preview} from "../preview";
import {Resizable} from "../resizable";
import {Cell} from "../../state";
import {useActions} from "../../hooks/use-actions";
import {useTypeSelector} from "../../hooks/use-type-selector";
import {useCumulativeCode} from "../../hooks/use-cumulative-code";
import './index.scss'


interface CodeCellProps {
    cell: Cell
}

export const CodeCell: React.FC<CodeCellProps> = ({cell}: CodeCellProps) => {

    // const [input, setInput] = useState('')
    // const [err, setErr] = useState('')
    // const [code, setCode] = useState('')
    const {updateCell, createBundle, initialize} = useActions()
    const bundle = useTypeSelector((state) => state.bundles.data[cell.id])
    const initialized = useTypeSelector((state) => state.bundles.initialized)
    const cumulativeCode = useCumulativeCode(cell.id)

    useEffect(() => {
        if (!bundle) {
            initialize()
            return
        }
    }, [])

    useEffect(() => {
        if (!initialized) {
            return
        }

        const timer = setTimeout(async () => {
            createBundle(cell.id, cumulativeCode)
        }, 750)

        return () => {
            clearTimeout(timer)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cumulativeCode, cell.id, createBundle, initialized])


    // const onClick = async (input: string) => {
    //     const output = await bundle(input)
    //     setCode(output)
    // }

    return (
        <Resizable direction={'vertical'}>
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <Resizable direction={'horizontal'}>
                    <CodeEditor
                        defaultValue={cell.content}
                        onChange={(value) => updateCell(cell.id, value)}
                    />
                    {/*<div>*/}
                    {/*    <button onClick={() => onClick(input)}>Submit</button>*/}
                    {/*</div>*/}

                </Resizable>
                {
                    !bundle || bundle.loading ?
                        (
                            <div className={'progress-wrapper'}>
                                <div className={'progress-cover'}>
                                    <progress className="progress is-small is-primary" max={100}>
                                        Loading
                                    </progress>
                                </div>
                            </div>

                        )
                        : <Preview code={bundle.code} err={bundle.err}/>
                }


            </div>
        </Resizable>

    );
};
