// @flow

import * as React from 'react';
import Editor from "@monaco-editor/react";
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import {useRef} from "react";
import './code-editor.scss'
import '../syntax.scss'
import codeShift from 'jscodeshift'
import Highlighter  from 'monaco-jsx-highlighter'




interface CodeEditorProps {
    defaultValue: string
    onChange(value: string): void
}




export const CodeEditor: React.FC<CodeEditorProps> = ({onChange, defaultValue}) => {
    const editorRef = useRef<any>()

    const onMount = (editor: any) => {
        editorRef.current = editor
        editor.onDidChangeModelContent(() => {
            const text = editor.getValue()
            onChange(text)

        })
        editor.getModel()?.updateOptions({tabSize: 2})

        const highlighter = new Highlighter(
            //@ts-ignore
            window.monaco,
            codeShift,
            editor
        )
        highlighter.highLightOnDidChangeModelContent(
            () => {
            },
            () => {
            },
            undefined,
            () => {
            },
        )

    }

    const onFormatClick = () => {
        // get current value
        const unformatted = editorRef.current.getModel().getValue()

        // format the value
        const formatted = prettier.format(unformatted, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '')


        // set the format value back in the editor

        editorRef.current.setValue(formatted)
    }


    return (
        <div className={'editor-wrapper'}>
            <button onClick={onFormatClick} className={'button button-format is-primary is-small'}>Format</button>
            <Editor

                onMount={onMount}

                defaultValue={defaultValue}
                height={'100%'}
                language={'javascript'}
                theme={'vs-dark'}
                options={
                    {
                        wordWrap: 'on',
                        minimap: {enabled: false},
                        showUnused: false,
                        folding: false,
                        lineNumbersMinChars: 3,
                        fontSize: 16,
                        scrollBeyondLastLine: false,
                        automaticLayout: true
                    }
                }
            />
        </div>


    );
}