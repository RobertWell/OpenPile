// @flow
import * as React from 'react';
import {Pokemon} from "../types";

type Props = {
    List: Pokemon[]
};


export const PokemonListView: React.FC<Props> = ({List}) => {
    return (
        <table>
            <tbody>
            {List.map(({name, type}) => (
                <tr key={name}>
                    <td>{name}</td>
                    <td>{type}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};