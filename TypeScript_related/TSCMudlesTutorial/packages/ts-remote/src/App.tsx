import * as React from "react";
import getList from "./pokemonList";
import {PokemonListView} from "./Components/PokemonListView";
import {History} from "history";
import "./index.css";

interface AppInterface {
    history: History
}


export const App: React.FC<AppInterface> = ({history}) => {
    return (
        <div>
            <h1>Ts remote</h1>
            <PokemonListView List={getList("Bulbasaur")}/>
        </div>
    )
};


