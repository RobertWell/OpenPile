import "../declaration/tsremote-mf-decl.d"
import {mount} from "tsremote-mf/PokemonListApp"

import * as React from 'react';
import {useEffect, useRef} from "react";

type Props = {};
export const Remotes = (props: Props) => {
    const ref = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (ref.current) {
            mount(ref.current, {})
        }
    }, [])

    return (
        <div ref={ref}/>
    );
};