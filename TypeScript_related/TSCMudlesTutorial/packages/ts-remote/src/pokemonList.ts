import {Pokemon, PokemonListFunction} from "./types";

const pokemon: Pokemon[] = [
    {
        name: "Bulbasaur",
        type: "Fire"
    }
]

const getList: PokemonListFunction = (nameFilter) => pokemon.filter(({name}) => name.includes(nameFilter))

export default getList