export type Pokemon = {
    name: string,
    type: string
}

export type PokemonListFunction = (nameFilter: string) => Pokemon[]