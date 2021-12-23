// @flow
import * as React from 'react';
import {ResizableBox, ResizableBoxProps} from "react-resizable";
import './resizable.scss'
import {useEffect, useState} from "react";

type Props = {
    direction: 'horizontal' | 'vertical'
};
export const Resizable: React.FC<Props> = ({direction, children}) => {
    const [innerHeight, setInnerHeight] = useState(window.innerHeight)
    const [innerWidth, setInnerWidth] = useState(window.innerWidth)
    const [width, setWidth] = useState(window.innerWidth * 0.75)

    let resizableProps: ResizableBoxProps;
    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            height: Infinity,
            width: width,
            maxConstraints: [innerWidth * 0.75, Infinity],
            minConstraints: [innerWidth * 0.2, Infinity],
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width)
            }

        }
    } else {
        resizableProps = {
            className: 'resize-vertical',
            height: 300,
            width: Infinity,
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
            resizeHandles: ['s']
        }
    }
    useEffect(() => {
        let timer: any

        const listener = (e: any) => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerHeight(window.innerHeight)
                setInnerWidth(window.innerWidth)
                if (window.innerWidth * 0.75 < width) {
                    setWidth(window.innerWidth * 0.75)
                }
            }, 100)
        }

        window.addEventListener('resize', listener)

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [width])

    return (
        <ResizableBox {...resizableProps}>
            {children}
        </ResizableBox>
    );
};